import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  ListRenderItem,
} from "react-native";
import { prayerIcons, PrayerName } from "./constant/prayerIcons";
import { useThemeContext } from "../theme/ThemeProvider";
import { useGlobalContext } from "../context/GlobalContext";

interface PrayerTime {
  name: PrayerName;
  time: string; // display time (12h format)
  rawTime: string; // original time for comparing (24h format)
  isActive?: boolean;
  isPast?: boolean;
}

// 🔁 Converts "18:35" => "6:35 PM"
const convertTo12HourFormat = (time24: string): string => {
  const [hourStr, minuteStr] = time24.split(":");
  const hour = parseInt(hourStr, 10);
  const minute = parseInt(minuteStr, 10);
  const date = new Date();
  date.setHours(hour, minute, 0, 0);
  return date.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};

const PrayerTimesCard = () => {
  const { colors } = useThemeContext();
  const { prayersData } = useGlobalContext();
  const styles = getStyles(colors);

  if (!prayersData) return null;

  const getTimeAsDate = (time: string) => {
    const now = new Date();
    const [hours, minutes] = time.split(":").map(Number);
    const date = new Date(now);
    date.setHours(hours, minutes, 0, 0);
    return date;
  };

  const prayerTimes: PrayerTime[] = [
    {
      name: "Fajr",
      rawTime: prayersData.Fajr,
      time: convertTo12HourFormat(prayersData.Fajr),
    },
    {
      name: "Dhuhr",
      rawTime: prayersData.Dhuhr,
      time: convertTo12HourFormat(prayersData.Dhuhr),
    },
    {
      name: "Asr",
      rawTime: prayersData.Asr,
      time: convertTo12HourFormat(prayersData.Asr),
    },
    {
      name: "Maghrib",
      rawTime: prayersData.Maghrib,
      time: convertTo12HourFormat(prayersData.Maghrib),
    },
    {
      name: "Isha",
      rawTime: prayersData.Isha,
      time: convertTo12HourFormat(prayersData.Isha),
    },
  ];

  const now = new Date();
  for (let i = 0; i < prayerTimes.length; i++) {
    const thisTime = getTimeAsDate(prayerTimes[i].rawTime);
    const nextTime = prayerTimes[i + 1]
      ? getTimeAsDate(prayerTimes[i + 1].rawTime)
      : new Date(now.setHours(23, 59, 59));

    if (now >= thisTime && now < nextTime) {
      prayerTimes[i].isActive = true;
    } else if (now > nextTime) {
      prayerTimes[i].isPast = true;
    }
  }

  const renderItem: ListRenderItem<PrayerTime> = ({ item }) => (
    <View style={styles.item}>
      <View style={[styles.dynamicBar, item.isActive && styles.activeBar]} />
      <Image
        source={prayerIcons[item.name]}
        style={[
          styles.icon,
          item.isActive
            ? styles.activeIcon
            : item.isPast
            ? styles.disabledIcon
            : null,
        ]}
        resizeMode="contain"
      />
      <Text
        style={[
          styles.name,
          item.isActive
            ? styles.activeText
            : item.isPast
            ? styles.disabledText
            : null,
        ]}
      >
        {item.name}
      </Text>
      <Text style={[styles.time, item.isPast && styles.disabledText]}>
        {item.time}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Today's Prayer</Text>
      <FlatList
        data={prayerTimes}
        renderItem={renderItem}
        keyExtractor={(item) => item.name}
        horizontal
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.row}
      />
    </View>
  );
};

export default PrayerTimesCard;

const getStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.card,
      padding: 20,
      marginTop: 16,
      borderRadius: 12,
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 20,
    },
    title: {
      fontSize: 16,
      fontWeight: "600",
      marginBottom: 20,
      color: colors.text,
    },
    row: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
    },
    item: {
      alignItems: "center",
      width: 60,
    },
    dynamicBar: {
      width: "100%",
      backgroundColor: colors.border,
      height: 1,
      marginBottom: 12,
    },
    activeBar: {
      backgroundColor: colors.primary,
      height: 5,
      marginBottom: 8,
      borderBottomLeftRadius: 12,
      borderBottomRightRadius: 12,
    },
    icon: {
      width: 32,
      height: 32,
      marginBottom: 4,
    },
    activeIcon: {
      tintColor: colors.primary,
    },
    disabledIcon: {
      tintColor: colors.border,
    },
    name: {
      fontSize: 14,
      color: colors.mutedText,
    },
    activeText: {
      color: colors.primary,
      fontWeight: "500",
    },
    disabledText: {
      color: colors.border,
    },
    time: {
      fontSize: 12,
      color: colors.mutedText,
    },
    separator: {
      width: 1,
      backgroundColor: colors.border,
      height: 50,
      alignSelf: "center",
    },
  });
