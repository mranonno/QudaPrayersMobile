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

interface PrayerTime {
  name: PrayerName;
  time: string;
  isActive?: boolean;
}

const prayerTimes: PrayerTime[] = [
  { name: "Fajr", time: "06:32 Pm" },
  { name: "Dhuhr", time: "11:27 Pm" },
  { name: "Asr", time: "01:55 Pm", isActive: true }, // dynamically set later
  { name: "Maghrib", time: "02:10 Pm" },
  { name: "Isha", time: "07:59 Pm" },
];

const PrayerTimesCard = () => {
  const { colors } = useThemeContext();
  const styles = getStyles(colors);

  const renderItem: ListRenderItem<PrayerTime> = ({ item }) => (
    <View style={styles.item}>
      <View style={[styles.dynamicBar, item.isActive && styles.activeBar]} />
      <Image
        source={prayerIcons[item.name]}
        style={[styles.icon, item.isActive && styles.activeIcon]}
        resizeMode="contain"
      />
      <Text style={[styles.name, item.isActive && styles.activeText]}>
        {item.name}
      </Text>
      <Text style={styles.time}>{item.time}</Text>
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
const getStyles = (colors: Colors) =>
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
      marginBottom: 12,
      color: colors.text,
    },
    row: {
      flexDirection: "row",
      alignItems: "center",
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
    name: {
      fontSize: 14,
      color: colors.mutedText,
    },
    activeText: {
      color: colors.primary,
      fontWeight: "500",
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
