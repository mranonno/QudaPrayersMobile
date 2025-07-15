import React from "react";
import { SafeAreaView, ScrollView, StyleSheet } from "react-native";
import { useThemeContext } from "../theme/ThemeProvider";
import PrayersRegionTime from "../components/PrayersRegionTime";
import RemainingQadaPrayers from "../components/RemainingQadaPrayers";
import HomeScreenHeader from "../components/HomeScreenHeader";
import LearnQadaPrayers from "../components/LearnQadaPrayers";

const HomeScreen = () => {
  const { colors } = useThemeContext();
  const styles = getStyles(colors);
  return (
    <SafeAreaView style={styles.container}>
      <HomeScreenHeader />
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <PrayersRegionTime
          countryCode="BD"
          countryFlagUri="https://flagcdn.com/w320/bd.png"
        />
        <LearnQadaPrayers />
        <RemainingQadaPrayers />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const getStyles = (colors: Colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    scrollContainer: {
      paddingHorizontal: 16,
      paddingBottom: 32,
    },
  });
