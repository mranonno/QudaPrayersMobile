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
      {/* Fixed header */}
      <HomeScreenHeader />

      {/* Scrollable content */}
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <PrayersRegionTime
          countryCode="BD"
          countryFlagUri="https://flagcdn.com/w320/bd.png"
        />
        <LearnQadaPrayers
          videoUrl="https://www.youtube.com/watch?v=example"
          bookUrl="https://example.com/qada-prayers-textbook"
        />
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
      backgroundColor: colors.background,
      paddingTop: top,
    },
    scrollContainer: {
      paddingHorizontal: 16,
      paddingBottom: 32,
    },
  });
