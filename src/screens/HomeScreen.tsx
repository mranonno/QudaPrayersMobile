import React from "react";
import { SafeAreaView, ScrollView, StatusBar, StyleSheet } from "react-native";
import { useThemeContext } from "../theme/ThemeProvider";
import PrayersRegionTime from "../components/PrayersRegionTime";
import RemainingQadaPrayers from "../components/RemainingQadaPrayers";
import HomeScreenHeader from "../components/HomeScreenHeader";
import LearnQadaPrayers from "../components/LearnQadaPrayers";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const HomeScreen = () => {
  const { theme } = useThemeContext();
  const { top } = useSafeAreaInsets();
  const styles = getStyles(top);
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={theme === "dark" ? "light-content" : "dark-content"}
      />
      <HomeScreenHeader />
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

const getStyles = (top: number) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: top,
    },
    scrollContainer: {
      paddingHorizontal: 16,
      paddingBottom: 32,
    },
  });
