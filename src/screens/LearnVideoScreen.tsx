import { SafeAreaView, ScrollView, StatusBar, StyleSheet } from "react-native";
import React from "react";
import { useThemeContext } from "../theme/ThemeProvider";

const LearnVideoScreen = () => {
  const { colors, theme } = useThemeContext();
  const styles = getStyles(colors);
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={theme === "dark" ? "light-content" : "dark-content"}
      />
      <ScrollView></ScrollView>
    </SafeAreaView>
  );
};

export default LearnVideoScreen;

const getStyles = (colors: Colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
  });
