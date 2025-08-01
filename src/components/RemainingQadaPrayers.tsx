// src/components/RemainingQadaPrayers.tsx
import React, { useRef, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useThemeContext } from "../theme/ThemeProvider";
import { Ionicons } from "@expo/vector-icons";
import QadaPrayerAddModal from "./QadaPrayerAddModal";
import QadaConfirmModal, { QadaConfirmModalRef } from "./QadaConfirmModal";
import { useGlobalContext } from "../context/GlobalContext";
import moment from "moment";
import Animated, { LinearTransition } from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";

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
  const { prayers, setPrayers } = useGlobalContext();

  const pendingPrayers = prayers
    .filter((p) => p.status === "Pending")
    .sort(
      (a, b) =>
        moment(a.date, "DD-MMM-YYYY").toDate().getTime() -
        moment(b.date, "DD-MMM-YYYY").toDate().getTime()
    );

  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [selectedPrayer, setSelectedPrayer] = useState<PrayerItem | null>(null);

  const confirmModalRef = useRef<QadaConfirmModalRef>(null);

  const openAddModal = () => setIsAddModalVisible(true);
  const closeAddModal = () => setIsAddModalVisible(false);

  const openConfirmModal = (prayer: PrayerItem) => {
    setSelectedPrayer(prayer);
    confirmModalRef.current?.present();
  };

  const handleConfirmDone = () => {
    if (!selectedPrayer) return;

    setPrayers((prev) =>
      prev.map((p) =>
        p.id === selectedPrayer.id ? { ...p, status: "Done" } : p
      )
    );

    setSelectedPrayer(null);
  };

  const renderItem = ({ item }: { item: PrayerItem }) => (
    <View style={styles.row}>
      <View style={styles.left}>
        <Image source={item.icon} style={styles.icon} />
        <Text style={styles.name}>{item.name}</Text>
      </View>
      <Text style={styles.date}>{item.date}</Text>
      <TouchableOpacity
        style={styles.pendingStatus}
        onPress={() => openConfirmModal(item)}
      >
        <Text style={styles.pendingText}>
          {item.status === "Pending" ? "Mark as Done" : "Done"}
        </Text>
        {/* <Ionicons name="time-outline" size={16} color={colors.pendingText} /> */}
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {pendingPrayers.length === 0 ? (
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
          <Animated.FlatList
            data={pendingPrayers}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            itemLayoutAnimation={LinearTransition}
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

      <TouchableOpacity onPress={openAddModal}>
        <LinearGradient
          colors={["#00C864", "#2D9299"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.addButton}
        >
          <Text style={styles.addButtonText}>Add Qada Prayer</Text>
        </LinearGradient>
      </TouchableOpacity>

      <QadaPrayerAddModal
        visible={isAddModalVisible}
        onClose={closeAddModal}
        onAdd={(date, prayer) => {
          console.log("Added Qada:", date, prayer);
        }}
      />

      <QadaConfirmModal
        ref={confirmModalRef}
        onClose={() => setSelectedPrayer(null)}
        onConfirm={handleConfirmDone}
        prayerName={selectedPrayer?.name || ""}
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
    pendingStatus: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 4,
      backgroundColor: colors.markAsDoneBackground,
      paddingHorizontal: 10,
      paddingVertical: 6,
      borderRadius: 8,
    },
    pendingText: {
      fontSize: 12,
      fontWeight: "600",
      color: colors.markAsDone,
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
      paddingVertical: 14,
      borderRadius: 10,
      alignItems: "center",
      paddingHorizontal: 24,
      justifyContent: "center",
    },
    addButtonText: {
      color: colors.pureWhite,
      fontWeight: "600",
    },
  });
