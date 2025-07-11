import React from "react";
import { StyleSheet, View } from "react-native";
import { useThemeContext } from "../theme/ThemeProvider";
import PrayersRegionTime from "../components/PrayersRegionTime";
import LearnQudaPrayers from "../components/LearnQudaPrayers";

const HomeScreen = () => {
  const { colors } = useThemeContext();
  const styles = getStyles(colors);
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
      <LearnQudaPrayers
        videoUrl="https://www.youtube.com/watch?v=example"
        bookUrl="https://example.com/qada-prayers-textbook"
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
