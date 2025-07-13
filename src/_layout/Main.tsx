import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { useThemeContext } from "../theme/ThemeProvider";
import AppNavigator from "../navigation/AppNavigator";

const Main = () => {
  const { colors } = useThemeContext();

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
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
