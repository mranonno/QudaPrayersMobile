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
            <Pressable style={styles.cancelBtn} onPress={onClose}>
              <Text style={styles.cancelText}>Cancel</Text>
            </Pressable>
            <Pressable
              style={[
                styles.addBtn,
                !(selectedDate && selectedPrayers.length > 0) &&
                  styles.disabledBtn,
              ]}
              onPress={handleAdd}
              disabled={!(selectedDate && selectedPrayers.length > 0)}
            >
              <Text style={styles.addText}>Add Now</Text>
            </Pressable>
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

const getStyles = (colors: Colors) =>
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
      marginTop: 24,
      justifyContent: "space-between",
    },
    cancelBtn: {
      flex: 1,
      padding: 12,
      borderRadius: 10,
      borderColor: colors.primary,
      borderWidth: 1,
      marginRight: 8,
      alignItems: "center",
    },
    cancelText: {
      color: colors.primary,
      fontWeight: "500",
    },
    addBtn: {
      flex: 1,
      padding: 12,
      backgroundColor: colors.primary,
      borderRadius: 10,
      alignItems: "center",
      marginLeft: 8,
    },
    disabledBtn: {
      backgroundColor: colors.primaryDisabled,
    },
    addText: {
      color: colors.pureWhite,
      fontWeight: "600",
    },
  });

export default QadaPrayerAddModal;
