import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { useThemeContext } from "../theme/ThemeProvider";
import PrayersRegionTime from "../components/PrayersRegionTime";
import RemainingQadaPrayers from "../components/RemainingQadaPrayers";
import HomeScreenHeader from "../components/HomeScreenHeader";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import LearnQadaPrayers from "../components/LearnQadaPrayers";

const HomeScreen = () => {
  const { colors } = useThemeContext();
  const { top } = useSafeAreaInsets();
  const styles = getStyles(colors, top);
  const prayerIcons = {
    Fajr: require("../../assets/icons/fajr.png"),
    Dhuhr: require("../../assets/icons/dhuhr.png"),
    Asr: require("../../assets/icons/asr.png"),
    Maghrib: require("../../assets/icons/maghrib.png"),
    Isha: require("../../assets/icons/isha.png"),
  };
  return (
    <SafeAreaView style={styles.container}>
      <HomeScreenHeader />
      <PrayersRegionTime
        countryCode="BD"
        countryFlagUri="https://flagcdn.com/w320/bd.png"
        nextPrayer={{
          name: "Fajr",
          time: "04:49 PM",
          icon: require("../../assets/icons/fajr.png"),
          timeRemaining: "In 2 Hours, 47 Minutes",
        }}
      />
      <LearnQadaPrayers
        videoUrl="https://www.youtube.com/watch?v=example"
        bookUrl="https://example.com/qada-prayers-textbook"
      />
      <RemainingQadaPrayers
        prayers={[
          {
            id: "1",
            name: "Fajr",
            date: "15 May 2020",
            icon: prayerIcons.Fajr,
            status: "Done",
          },
          {
            id: "2",
            name: "Dhuhr",
            date: "15 May 2020",
            icon: prayerIcons.Dhuhr,
            status: "Done",
          },
          {
            id: "3",
            name: "Asr",
            date: "15 May 2020",
            icon: prayerIcons.Asr,
            status: "Done",
          },
        ]}
        onAddPrayer={() => {
          console.log("Add Qada Prayer clicked");
        }}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;

const getStyles = (colors: Colors, top: number) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 16,
      paddingTop: top,
      backgroundColor: colors.background,
    },
  });
