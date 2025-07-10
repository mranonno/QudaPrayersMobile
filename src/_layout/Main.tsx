// src/layout/Main.tsx
import React from "react";
import { SafeAreaView, StatusBar } from "react-native";
import { useThemeContext } from "../theme/ThemeProvider";
import AppNavigator from "../navigation/AppNavigator";

const Main = () => {
  const { theme, colors } = useThemeContext();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={theme === "dark" ? "light-content" : "dark-content"}
      />
      <AppNavigator />
    </SafeAreaView>
  );
};

export default Main;
