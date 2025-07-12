import React, { useState } from "react";
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

type PrayerType = "Fajr" | "Dhuhr" | "Asr" | "Maghrib" | "Isha";

interface Props {
  visible: boolean;
  onClose: () => void;
  onAdd: (date: string, prayer: PrayerType) => void;
}

const PRAYERS: { key: PrayerType; label: string }[] = [
  { key: "Fajr", label: "Fajr – Dawn Prayer" },
  { key: "Dhuhr", label: "Dhuhr – Noon Prayer" },
  { key: "Asr", label: "Asr – Afternoon Prayer" },
  { key: "Maghrib", label: "Maghrib – Sunset Prayer" },
  { key: "Isha", label: "Isha – Night Prayer" },
];

const QadaPrayerAddModal: React.FC<Props> = ({ visible, onClose, onAdd }) => {
  const [selectedPrayer, setSelectedPrayer] = useState<PrayerType | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const { colors } = useThemeContext();
  const styles = getStyles(colors);

  const handleDateConfirm = (date: Date) => {
    setSelectedDate(date);
    setDatePickerVisible(false);
  };

  const handleAdd = () => {
    if (selectedDate && selectedPrayer) {
      onAdd(moment(selectedDate).format("YYYY-MM-DD"), selectedPrayer);
      onClose();
      setSelectedPrayer(null);
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
                selectedPrayer === prayer.key && styles.selectedPrayerButton,
              ]}
              onPress={() => setSelectedPrayer(prayer.key)}
            >
              <Text
                style={[
                  styles.prayerText,
                  selectedPrayer === prayer.key && styles.selectedPrayerText,
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
                !(selectedDate && selectedPrayer) && styles.disabledBtn,
              ]}
              onPress={handleAdd}
              disabled={!(selectedDate && selectedPrayer)}
            >
              <Text style={styles.addText}>Add Now</Text>
            </Pressable>
          </View>

          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleDateConfirm}
            onCancel={() => setDatePickerVisible(false)}
          />
        </View>
      </View>
    </Modal>
  );
};

const getStyles = (colors: colors) =>
  StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: "#00000088",
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
      padding: 12,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 10,
      marginVertical: 4,
    },
    selectedPrayerButton: {
      backgroundColor: "#e9f8ef",
      borderColor: colors.primary,
    },
    prayerText: {
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
      backgroundColor: colors.primaryOpacity,
    },
    addText: {
      color: colors.pureWhite,
      fontWeight: "600",
    },
  });

export default QadaPrayerAddModal;
