import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useThemeContext } from "../theme/ThemeProvider";
import HomeScreenHeader from "../components/HomeScreenHeader";

const LearnVideoScreen = () => {
  const { colors } = useThemeContext();
  const styles = getStyles(colors);
  return (
    <SafeAreaView style={styles.container}>
      <HomeScreenHeader />
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
