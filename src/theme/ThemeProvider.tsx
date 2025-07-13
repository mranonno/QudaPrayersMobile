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
import { fonts } from "../components/constant/fonts";

type ThemeType = "light" | "dark" | "system";

interface ThemeContextProps {
  theme: ThemeType;
  colors: typeof lightColors;
  setTheme: (theme: ThemeType) => void;
  fonts: typeof fonts;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const systemScheme = useColorScheme(); // "light" | "dark" | null
  const [theme, setThemeState] = useState<ThemeType>("system");

  useEffect(() => {
    const loadTheme = async () => {
      const stored = await AsyncStorage.getItem("@theme");
      if (stored === "light" || stored === "dark" || stored === "system") {
        setThemeState(stored);
      }
    };
    loadTheme();
  }, []);

  const setTheme = async (newTheme: ThemeType) => {
    setThemeState(newTheme);
    await AsyncStorage.setItem("@theme", newTheme);
  };

  // Final resolved theme: system-based unless user sets light/dark
  const resolvedTheme =
    theme === "system" ? (systemScheme === "dark" ? "dark" : "light") : theme;

  const colors = useMemo(
    () => (resolvedTheme === "light" ? lightColors : darkColors),
    [resolvedTheme]
  );

  const value = useMemo(
    () => ({
      theme,
      colors,
      setTheme,
      fonts,
    }),
    [theme, colors]
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
