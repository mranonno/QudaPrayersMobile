import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { useThemeContext } from "../theme/ThemeProvider";
import { Ionicons } from "@expo/vector-icons";
import QadaPrayerAddModal from "./QadaPrayerAddModal";
import { useGlobalContext } from "../context/GlobalContext";

type PrayerItem = {
  id: string;
  name: string;
  date: string;
  icon: any;
  status: "Done" | "Pending";
};

const RemainingQadaPrayers = () => {
  const { colors } = useThemeContext();
  const styles = getStyles(colors);
  const { prayers, removePrayer } = useGlobalContext();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const openModal = () => setIsModalVisible(true);

  console.log("🕌 Updated Prayers:", JSON.stringify(prayers, null, 2));

  const renderItem = ({ item }: { item: PrayerItem }) => (
    <View style={styles.row}>
      <View style={styles.left}>
        <Image source={item.icon} style={styles.icon} />
        <Text style={styles.name}>{item.name}</Text>
      </View>
      <Text style={styles.date}>{item.date}</Text>
      <View style={styles.pendingStatus}>
        <Text style={styles.pendingText}>{item.status}</Text>
        <Ionicons name="time-outline" size={16} color={colors.pendingText} />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {prayers.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.alhamdulillahText}>Alhamdulillah</Text>
          <Text style={styles.emptyText}>You don't have any Qada Prayers</Text>
          <Image
            source={require("../../assets/icons/emptyPlaceholder.png")}
            style={styles.emptyImage}
            resizeMode="contain"
          />
          <Text style={styles.suggestText}>
            Go to the mosque and pray your next prayer to avoid Qada Prayers.
          </Text>
        </View>
      ) : (
        <View>
          <Text style={styles.title}>Remaining Qada Prayers</Text>
          <View style={styles.separator} />
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
        </View>
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

const getStyles = (colors: Colors) =>
  StyleSheet.create({
    container: {
      marginTop: 16,
      borderRadius: 12,
      padding: 20,
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
      color: colors.text,
    },
    date: {
      fontSize: 13,
      textAlign: "center",
      color: colors.mutedText,
      marginRight: 50,
    },
    status: {
      flexDirection: "row",
      alignItems: "center",
      gap: 4,
      backgroundColor: colors.primaryOpacity,
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderRadius: 20,
    },
    doneText: {
      fontSize: 12,
      fontWeight: "600",
      color: colors.primary,
    },
    pendingStatus: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 4,
      backgroundColor: colors.pendingBackground,
      paddingHorizontal: 10,
      paddingVertical: 6,
      borderRadius: 50,
    },
    pendingText: {
      fontSize: 12,
      fontWeight: "600",
      color: colors.pendingText,
    },
    emptyContainer: {
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 20,
    },
    emptyImage: {
      width: 320,
      height: 215,
      marginVertical: 16,
      borderRadius: 12,
    },
    alhamdulillahText: {
      textAlign: "center",
      fontSize: 20,
      fontWeight: "600",
      color: colors.primary,
    },
    emptyText: {
      textAlign: "center",
      color: colors.text,
      fontWeight: "500",
    },
    suggestText: {
      textAlign: "center",
      marginHorizontal: 24,
      fontSize: 14,
      color: colors.mutedText,
    },
    addButton: {
      marginTop: 16,
      backgroundColor: colors.primary,
      paddingVertical: 12,
      borderRadius: 10,
      alignItems: "center",
    },
    addButtonText: {
      color: colors.pureWhite,
      fontWeight: "600",
    },
  });
