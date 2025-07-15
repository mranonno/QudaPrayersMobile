import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useMemo,
} from "react";
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
  useEffect(() => {
    const fetchPrayerTimes = async () => {
      try {
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
      } catch (error) {
        console.error("❌ Failed to fetch prayer times:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPrayerTimes();
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

  // Memoized value
  const contextValue = useMemo(
    () => ({
      prayers,
      setPrayers,
      addPrayer,
      removePrayer,
      updatePrayerStatus,
      loading,
      prayersData,
      fetchTomorrowPrayerTimes,
    }),
    [prayers, loading, prayersData]
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
