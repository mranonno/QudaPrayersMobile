import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  ReactNode,
} from "react";
import { useColorScheme } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { darkColors } from "./darkColors";
import { lightColors } from "./lightColors";

type ThemeType = "light" | "dark";

interface ThemeContextProps {
  theme: ThemeType;
  colors: typeof lightColors;
  toggleTheme: () => void;
  isSystem: boolean;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const systemScheme = useColorScheme(); // "light" | "dark" | null
  const [theme, setTheme] = useState<ThemeType>("light");
  const [isSystem, setIsSystem] = useState(true); // If user overrides, set to false

  // Load user preference on mount
  useEffect(() => {
    const loadTheme = async () => {
      const stored = await AsyncStorage.getItem("@theme");
      if (stored === "light" || stored === "dark") {
        setTheme(stored);
        setIsSystem(false);
      }
    };
    loadTheme();
  }, []);

  // Sync with system theme if user didn’t override
  useEffect(() => {
    if (isSystem && systemScheme) {
      setTheme(systemScheme === "dark" ? "dark" : "light");
    }
  }, [systemScheme, isSystem]);

  // Toggle between light and dark manually
  const toggleTheme = async () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    setIsSystem(false);
    await AsyncStorage.setItem("@theme", newTheme);
  };

  const colors = theme === "light" ? lightColors : darkColors;

  const value = useMemo(
    () => ({ theme, colors, toggleTheme, isSystem }),
    [theme, colors, isSystem]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export const useThemeContext = (): ThemeContextProps => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useThemeContext must be used within a ThemeProvider");
  }
  return context;
};
