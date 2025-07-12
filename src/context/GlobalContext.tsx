import React, { createContext, useContext, useState, ReactNode } from "react";

// 1️⃣ Define prayer item type
export type PrayerItem = {
  id: string;
  name: string;
  date: string;
  icon: any;
  status: "Done" | "Pending";
};

// 2️⃣ Define context value type
type GlobalContextType = {
  prayers: PrayerItem[];
  setPrayers: React.Dispatch<React.SetStateAction<PrayerItem[]>>;
  addPrayer: (prayer: PrayerItem) => void;
  removePrayer: (id: string) => void;
};

// 3️⃣ Create default context
const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

// 4️⃣ Provider component
export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [prayers, setPrayers] = useState<PrayerItem[]>([]);

  const addPrayer = (prayer: PrayerItem) => {
    setPrayers((prev) => [...prev, prayer]);
  };

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

// 5️⃣ Custom hook for consuming
export const useGlobalContext = (): GlobalContextType => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }
  return context;
};
