import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Modal,
} from "react-native";
import { useThemeContext } from "../theme/ThemeProvider";
import { Ionicons } from "@expo/vector-icons";
import QadaPrayerAddModal from "./QadaPrayerAddModal";

// Define prayer item type
type PrayerItem = {
  id: string;
  name: string;
  date: string;
  icon: any;
  status: "Done" | "Pending";
};

// Sample icons (replace with actual assets)
const prayerIcons = {
  Fajr: require("../../assets/icons/fajr.png"),
  Dhuhr: require("../../assets/icons/dhuhr.png"),
  Asr: require("../../assets/icons/asr.png"),
  Maghrib: require("../../assets/icons/maghrib.png"),
  Isha: require("../../assets/icons/isha.png"),
};

type Props = {
  prayers: PrayerItem[];
  onAddPrayer: () => void;
};

const RemainingQadaPrayers: React.FC<Props> = ({ prayers, onAddPrayer }) => {
  const { colors } = useThemeContext();
  const styles = getStyles(colors);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const openModal = () => setIsModalVisible(true);
  const closeModal = () => setIsModalVisible(false);

  const renderItem = ({ item }: { item: PrayerItem }) => (
    <View style={styles.row}>
      <View style={styles.left}>
        <Image source={item.icon} style={styles.icon} />
        <Text style={[styles.name, { color: colors.text }]}>{item.name}</Text>
      </View>
      <Text style={[styles.date, { color: colors.mutedText }]}>
        {item.date}
      </Text>
      <View style={styles.status}>
        <Text style={styles.doneText}>Done</Text>
        <Ionicons name="checkmark-circle" size={18} color="#22C55E" />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Remaining Qada Prayers</Text>

      <View style={styles.separator} />

      {prayers.length === 0 ? (
        <Text style={[styles.emptyText, { color: colors.mutedText }]}>
          No Qada prayers available.
        </Text>
      ) : (
        <FlatList
          data={prayers}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          ItemSeparatorComponent={() => (
            <View
              style={{
                height: 1,
                backgroundColor: colors.border,
                marginVertical: 12,
              }}
            />
          )}
        />
      )}

      <TouchableOpacity style={styles.addButton} onPress={openModal}>
        <Text style={styles.addButtonText}>Add Qada Prayer</Text>
      </TouchableOpacity>
      <QadaPrayerAddModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onAdd={(date, prayer) => {
          console.log("Added Qada:", date, prayer);
        }}
      />
    </View>
  );
};

export default RemainingQadaPrayers;

const getStyles = (colors: colors) =>
  StyleSheet.create({
    container: {
      marginTop: 16,
      borderRadius: 16,
      padding: 16,
      backgroundColor: colors.card,
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 20,
    },
    title: {
      color: colors.text,
      fontSize: 16,
      fontWeight: "600",
      marginBottom: 20,
    },
    separator: {
      height: 1,
      backgroundColor: colors.border,
      marginBottom: 12,
    },
    row: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    left: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      flex: 1,
    },
    icon: {
      width: 20,
      height: 20,
    },
    name: {
      fontSize: 14,
      fontWeight: "600",
    },
    date: {
      fontSize: 13,
      flex: 1,
      textAlign: "center",
    },
    status: {
      flexDirection: "row",
      alignItems: "center",
      gap: 4,
      backgroundColor: "#D1FAE5",
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderRadius: 20,
    },
    doneText: {
      fontSize: 12,
      fontWeight: "600",
      color: colors.primary,
    },
    emptyText: {
      textAlign: "center",
      paddingVertical: 20,
      fontSize: 14,
      fontStyle: "italic",
    },
    addButton: {
      marginTop: 16,
      backgroundColor: colors.primary,
      paddingVertical: 12,
      borderRadius: 10,
      alignItems: "center",
    },
    addButtonText: {
      color: "#fff",
      fontWeight: "600",
    },
  });
