import React from "react";
import { SafeAreaView, StatusBar, StyleSheet } from "react-native";
import { useThemeContext } from "../theme/ThemeProvider";
import AppNavigator from "../navigation/AppNavigator";

const Main = () => {
  const { colors, theme } = useThemeContext();

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
