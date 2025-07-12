import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeProvider } from "./src/theme/ThemeProvider";
import Main from "./src/_layout/Main";
import { GlobalProvider } from "./src/context/GlobalContext";

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <GlobalProvider>
          <Main />
        </GlobalProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
