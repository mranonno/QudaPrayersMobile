import React from "react";
import { StyleSheet, View } from "react-native";
import { useThemeContext } from "../theme/ThemeProvider";
import PrayersRegionTime from "../components/PrayersRegionTime";
import RemainingQadaPrayers from "../components/RemainingQadaPrayers";
import LearnQadaPrayers from "../components/LearnQudaPrayers";

const HomeScreen = () => {
  const { colors } = useThemeContext();
  const styles = getStyles(colors);
  const prayerIcons = {
    Fajr: require("../../assets/icons/fajr.png"),
    Dhuhr: require("../../assets/icons/dhuhr.png"),
    Asr: require("../../assets/icons/asr.png"),
    Maghrib: require("../../assets/icons/maghrib.png"),
    Isha: require("../../assets/icons/isha.png"),
  };
  return (
    <View style={styles.container}>
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
          // etc...
        ]}
        onAddPrayer={() => {
          console.log("Add Qada Prayer clicked");
        }}
      />
    </View>
  );
};

export default HomeScreen;

const getStyles = (colors: colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 16,
      backgroundColor: colors.background,
    },
  });
