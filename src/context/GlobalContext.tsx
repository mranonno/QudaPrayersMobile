import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Define the PrayerItem type
export type PrayerItem = {
  id: string;
  name: string;
  date: string;
  icon: any;
  status: "Done" | "Pending";
};

// Define context value type
type GlobalContextType = {
  prayers: PrayerItem[];
  setPrayers: React.Dispatch<React.SetStateAction<PrayerItem[]>>;
  addPrayer: (prayer: PrayerItem) => void;
  removePrayer: (id: string) => void;
};

// Create the context
const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

const STORAGE_KEY = "qada_prayers";

// Provider component
export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [prayers, setPrayers] = useState<PrayerItem[]>([]);

  // Load prayers from AsyncStorage on mount
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

  // Save prayers to AsyncStorage whenever it changes
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

  // Add a new prayer
  const addPrayer = (prayer: PrayerItem) => {
    setPrayers((prev) => [...prev, prayer]);
  };

  // Remove prayer by ID
  const removePrayer = (id: string) => {
    setPrayers((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <GlobalContext.Provider
      value={{ prayers, setPrayers, addPrayer, removePrayer }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

// Custom hook
export const useGlobalContext = (): GlobalContextType => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }
  return context;
};
