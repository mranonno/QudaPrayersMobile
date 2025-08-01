import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useThemeContext } from "../theme/ThemeProvider";
import { Ionicons } from "@expo/vector-icons";
import { useGlobalContext } from "../context/GlobalContext";
import { getNextPrayer, NextPrayer } from "../utils/prayerUtils";

type Props = {
  countryCode: string;
  countryFlagUri: string;
};

const PrayersRegionTime: React.FC<Props> = ({
  countryCode,
  countryFlagUri,
}) => {
  const { colors } = useThemeContext();
  const styles = getStyles(colors);
  const { prayersData, fetchTomorrowPrayerTimes } = useGlobalContext();
  const [nextPrayer, setNextPrayer] = useState<NextPrayer | null>(null);

  useEffect(() => {
    if (!prayersData) return;

    const updateNextPrayer = async () => {
      const np = await getNextPrayer(prayersData, fetchTomorrowPrayerTimes);
      console.log("Next prayer (possibly tomorrow):", np);
      setNextPrayer(np);
    };

    updateNextPrayer();
    const interval = setInterval(updateNextPrayer, 60 * 1000);

    return () => clearInterval(interval);
  }, [prayersData]);

  if (!nextPrayer) return null;

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={[styles.title, { color: colors.text }]}>Next Prayers</Text>
        <TouchableOpacity style={styles.countryBox}>
          <Image source={{ uri: countryFlagUri }} style={styles.flag} />
          <Text style={[styles.countryText, { color: colors.text }]}>
            {countryCode}
          </Text>
          <Ionicons name="chevron-down" size={16} color={colors.text} />
        </TouchableOpacity>
      </View>

      <View style={styles.separator} />

      <View style={styles.prayerRow}>
        <View style={styles.left}>
          <Image source={nextPrayer.icon} style={styles.icon} />
          <Text style={[styles.prayerName, { color: colors.text }]}>
            {nextPrayer.name}
          </Text>
        </View>
        <View style={styles.right}>
          <Text style={[styles.prayerTime, { color: colors.text }]}>
            {nextPrayer.time}
          </Text>
          <Text style={[styles.remainingTime, { color: colors.mutedText }]}>
            {nextPrayer.timeRemaining}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default PrayersRegionTime;

const getStyles = (colors: Colors) =>
  StyleSheet.create({
    container: {
      padding: 20,
      borderRadius: 12,
      marginTop: 16,
      backgroundColor: colors.card,
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 20,
    },
    headerRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    title: {
      fontSize: 16,
      fontWeight: "600",
    },
    countryBox: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      borderRadius: 12,
      paddingHorizontal: 10,
      paddingVertical: 8,
      borderWidth: 1,
      borderColor: colors.border,
    },
    flag: {
      width: 18,
      height: 12,
      borderRadius: 2,
      marginRight: 4,
    },
    countryText: {
      fontSize: 14,
      fontWeight: "500",
    },
    separator: {
      height: 1,
      backgroundColor: colors.border,
      marginVertical: 12,
    },
    prayerRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    left: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
    },
    icon: {
      width: 24,
      height: 24,
    },
    prayerName: {
      fontSize: 18,
      fontWeight: "600",
    },
    right: {
      alignItems: "flex-end",
    },
    prayerTime: {
      fontSize: 18,
      fontWeight: "600",
    },
    remainingTime: {
      fontSize: 13,
      marginTop: 2,
    },
  });
