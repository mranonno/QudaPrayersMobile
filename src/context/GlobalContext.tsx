import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useMemo,
} from "react";
import { AppState } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import moment from "moment";

// Types
export type PrayerItem = {
  id: string;
  name: string;
  date: string;
  icon: any;
  status: "Done" | "Pending";
};

type GlobalContextType = {
  prayers: PrayerItem[];
  setPrayers: React.Dispatch<React.SetStateAction<PrayerItem[]>>;
  addPrayer: (prayer: PrayerItem) => void;
  removePrayer: (id: string) => void;
  updatePrayerStatus: (id: string, status: "Done" | "Pending") => void;
  loading: boolean;
  prayersData: Record<string, string> | null;
  todayPrayersData: Record<string, string> | null;
  fetchTodayPrayerTimes: () => Promise<void>;
  fetchTomorrowPrayerTimes: () => Promise<Record<string, string> | null>;
};

// Constants
const STORAGE_KEY = "qada_prayers";
const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

// Provider
export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [prayers, setPrayers] = useState<PrayerItem[]>([]);
  const [prayersData, setPrayersData] = useState<Record<string, string> | null>(
    null
  );
  const [todayPrayersData, setTodayPrayersData] = useState<Record<
    string,
    string
  > | null>(null);
  const [loading, setLoading] = useState(true);

  // Load prayers from AsyncStorage
  useEffect(() => {
    const loadPrayers = async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored) {
          setPrayers(JSON.parse(stored));
        }
      } catch (error) {
        console.error("🔴 Failed to load prayers:", error);
      }
    };
    loadPrayers();
  }, []);

  // Save prayers to AsyncStorage when changed
  useEffect(() => {
    const savePrayers = async () => {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(prayers));
      } catch (error) {
        console.error("🔴 Failed to save prayers:", error);
      }
    };
    savePrayers();
  }, [prayers]);

  // Fetch today's prayer times
  const fetchTodayPrayerTimes = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        "https://api.aladhan.com/v1/timingsByAddress",
        {
          params: {
            address: "Dhaka,Bangladesh",
            method: 8,
            tune: "2,3,4,5,2,3,4,5,-3",
          },
        }
      );
      const timings = res.data?.data?.timings;
      setPrayersData(timings || null);
      setTodayPrayersData(timings || null);
    } catch (error) {
      console.error("❌ Failed to fetch today's prayer times:", error);
    } finally {
      setLoading(false);
    }
  };

  // Automatically fetch on mount & when app resumes
  useEffect(() => {
    fetchTodayPrayerTimes(); // Initial fetch

    const handleAppStateChange = (state: string) => {
      if (state === "active") {
        fetchTodayPrayerTimes();
      }
    };

    const subscription = AppState.addEventListener(
      "change",
      handleAppStateChange
    );

    return () => subscription.remove();
  }, []);

  // Fetch tomorrow's prayer times
  const fetchTomorrowPrayerTimes = async () => {
    try {
      const res = await axios.get(
        "https://api.aladhan.com/v1/timingsByAddress",
        {
          params: {
            address: "Dhaka,Bangladesh",
            method: 8,
            tune: "2,3,4,5,2,3,4,5,-3",
            date: moment().add(1, "day").format("DD-MM-YYYY"),
          },
        }
      );
      return res.data?.data?.timings || null;
    } catch (error) {
      console.error("❌ Failed to fetch tomorrow's prayer times:", error);
      return null;
    }
  };

  // Handlers
  const addPrayer = (prayer: PrayerItem) => {
    setPrayers((prev) => [...prev, prayer]);
  };

  const removePrayer = (id: string) => {
    setPrayers((prev) => prev.filter((p) => p.id !== id));
  };

  const updatePrayerStatus = (id: string, status: "Done" | "Pending") => {
    setPrayers((prev) => prev.map((p) => (p.id === id ? { ...p, status } : p)));
  };

  // Memoized context value
  const contextValue = useMemo(
    () => ({
      prayers,
      setPrayers,
      addPrayer,
      removePrayer,
      updatePrayerStatus,
      loading,
      prayersData,
      todayPrayersData,
      fetchTodayPrayerTimes,
      fetchTomorrowPrayerTimes,
    }),
    [prayers, loading, prayersData, todayPrayersData]
  );

  return (
    <GlobalContext.Provider value={contextValue}>
      {children}
    </GlobalContext.Provider>
  );
};

// Hook
export const useGlobalContext = (): GlobalContextType => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }
  return context;
};
