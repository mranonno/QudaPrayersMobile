import React, { useMemo, useState } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  Pressable,
  StyleSheet,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import { useThemeContext } from "../theme/ThemeProvider";
import { Ionicons } from "@expo/vector-icons";
import Feather from "@expo/vector-icons/Feather";
import { useGlobalContext } from "../context/GlobalContext";
import { LinearGradient } from "expo-linear-gradient";

type PrayerType = "Fajr" | "Dhuhr" | "Asr" | "Maghrib" | "Isha";

interface Props {
  visible: boolean;
  onClose: () => void;
  onAdd: (date: string, prayers: PrayerType[]) => void;
}

const PRAYERS: { key: PrayerType; label: string }[] = [
  { key: "Fajr", label: "Fajr – Dawn Prayer" },
  { key: "Dhuhr", label: "Dhuhr – Noon Prayer" },
  { key: "Asr", label: "Asr – Afternoon Prayer" },
  { key: "Maghrib", label: "Maghrib – Sunset Prayer" },
  { key: "Isha", label: "Isha – Night Prayer" },
];

const prayerIcons = {
  Fajr: require("../../assets/icons/fajr.png"),
  Dhuhr: require("../../assets/icons/dhuhr.png"),
  Asr: require("../../assets/icons/asr.png"),
  Maghrib: require("../../assets/icons/maghrib.png"),
  Isha: require("../../assets/icons/isha.png"),
};

const QadaPrayerAddModal: React.FC<Props> = ({ visible, onClose, onAdd }) => {
  const [selectedPrayers, setSelectedPrayers] = useState<PrayerType[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const { colors, theme } = useThemeContext();
  const styles = useMemo(() => getStyles(colors), [colors]);
  const { addPrayer } = useGlobalContext();

  const isDisabled = !(selectedDate && selectedPrayers.length > 0);

  const handleDateConfirm = (date: Date) => {
    setSelectedDate(date);
    setDatePickerVisible(false);
  };

  const togglePrayer = (prayer: PrayerType) => {
    setSelectedPrayers((prev) => {
      if (prev.includes(prayer)) {
        return prev.filter((p) => p !== prayer);
      } else {
        return [...prev, prayer];
      }
    });
  };

  const handleAdd = () => {
    if (selectedDate && selectedPrayers.length > 0) {
      const dateStr = moment(selectedDate).format("DD-MMM-YYYY");

      selectedPrayers.forEach((prayer) => {
        addPrayer({
          id: `${prayer}-${dateStr}-${Date.now()}`,
          name: prayer,
          date: dateStr,
          icon: prayerIcons[prayer],
          status: "Pending",
        });
      });
      onAdd(dateStr, selectedPrayers);
      onClose();
      setSelectedPrayers([]);
      setSelectedDate(null);
    }
  };

  const handleCancel = () => {
    setSelectedDate(null);
    setSelectedPrayers([]);
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>Add Qada Prayer</Text>

          <TouchableOpacity
            style={styles.datePicker}
            onPress={() => setDatePickerVisible(true)}
          >
            <Text style={styles.dateText}>
              {selectedDate
                ? moment(selectedDate).format("DD MMM YYYY")
                : "Select Date"}
            </Text>
            <Ionicons name="chevron-down" size={16} color={colors.text} />
          </TouchableOpacity>

          {PRAYERS.map((prayer) => (
            <TouchableOpacity
              activeOpacity={0.5}
              key={prayer.key}
              style={[
                styles.prayerButton,
                selectedPrayers.includes(prayer.key) &&
                  styles.selectedPrayerButton,
              ]}
              onPress={() => togglePrayer(prayer.key)}
            >
              <Feather
                name={
                  selectedPrayers.includes(prayer.key)
                    ? "check-circle"
                    : "circle"
                }
                size={18}
                color={
                  selectedPrayers.includes(prayer.key)
                    ? colors.primary
                    : colors.text
                }
              />
              <Text
                style={[
                  styles.prayerText,
                  selectedPrayers.includes(prayer.key) &&
                    styles.selectedPrayerText,
                ]}
              >
                {prayer.label}
              </Text>
            </TouchableOpacity>
          ))}

          <View style={styles.buttonRow}>
            <LinearGradient
              colors={["#00C864", "#2D9299"]}
              style={styles.cancelButtonContainer}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={handleCancel}
                style={styles.cancelBtn}
              >
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
            </LinearGradient>
            <TouchableOpacity
              activeOpacity={0.6}
              style={{ flex: 0.55 }}
              onPress={handleAdd}
              disabled={isDisabled}
            >
              <LinearGradient
                colors={["#00C864", "#2D9299"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={[styles.addBtn, isDisabled && { opacity: 0.6 }]}
              >
                <Text style={styles.addText}>Add Now</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>

          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleDateConfirm}
            onCancel={() => setDatePickerVisible(false)}
            themeVariant={theme === "dark" ? "dark" : "light"}
          />
        </View>
      </View>
    </Modal>
  );
};

const getStyles = (colors: any) =>
  StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: colors.modalOverlay,
      justifyContent: "center",
      alignItems: "center",
    },
    container: {
      width: "90%",
      backgroundColor: colors.card,
      borderRadius: 16,
      padding: 20,
      elevation: 10,
    },
    title: {
      color: colors.text,
      fontSize: 18,
      fontWeight: "600",
      textAlign: "center",
      marginBottom: 16,
    },
    datePicker: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 10,
      padding: 12,
      marginBottom: 16,
    },
    dateText: {
      color: colors.text,
      fontSize: 14,
    },
    prayerButton: {
      flexDirection: "row",
      alignItems: "center",
      padding: 12,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 10,
      marginVertical: 4,
    },
    selectedPrayerButton: {
      backgroundColor: colors.primaryOpacity,
      borderColor: colors.primary,
    },
    prayerText: {
      marginLeft: 12,
      color: colors.text,
      fontSize: 14,
    },
    selectedPrayerText: {
      color: colors.primary,
      fontWeight: "bold",
    },
    buttonRow: {
      flexDirection: "row",
      gap: 5,
      alignItems: "center",
      justifyContent: "space-between",
      marginTop: 24,
    },
    cancelButtonContainer: {
      flex: 0.42,
      padding: 1,
      borderRadius: 10,
      alignItems: "center",
      justifyContent: "center",
    },
    cancelBtn: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.card,
      width: "100%",
      borderRadius: 9,
    },
    cancelText: {
      color: "#20A18A",
      fontWeight: "500",
    },
    addBtn: {
      padding: 14,
      borderRadius: 10,
      alignItems: "center",
    },
    addText: {
      color: colors.pureWhite,
      fontWeight: "600",
    },
  });

export default QadaPrayerAddModal;
