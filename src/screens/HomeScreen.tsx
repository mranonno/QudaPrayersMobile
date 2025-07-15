import React from "react";
import { SafeAreaView, ScrollView, StyleSheet } from "react-native";
import { useThemeContext } from "../theme/ThemeProvider";
import PrayersRegionTime from "../components/PrayersRegionTime";
import RemainingQadaPrayers from "../components/RemainingQadaPrayers";
import HomeScreenHeader from "../components/HomeScreenHeader";
import LearnQadaPrayers from "../components/LearnQadaPrayers";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const HomeScreen = () => {
  const { colors } = useThemeContext();
  const { top } = useSafeAreaInsets();
  const styles = getStyles(colors, top);
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

const getStyles = (colors: Colors, top: number) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: top,
      backgroundColor: colors.background,
    },
    scrollContainer: {
      paddingHorizontal: 16,
      paddingBottom: 32,
    },
  });
