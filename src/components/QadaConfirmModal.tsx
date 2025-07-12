import React, { useMemo } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  Pressable,
  StyleSheet,
} from "react-native";
import { useThemeContext } from "../theme/ThemeProvider";

interface Props {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  prayerName: string;
}

const QadaConfirmModal: React.FC<Props> = ({
  visible,
  onClose,
  onConfirm,
  prayerName,
}) => {
  const { colors } = useThemeContext();
  const styles = useMemo(() => getStyles(colors), [colors]);

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>Confirm Prayer Status</Text>
          <Text style={styles.message}>
            Mark the prayer <Text style={styles.prayerName}>{prayerName}</Text>{" "}
            as done?
          </Text>

          <View style={styles.buttonRow}>
            <Pressable style={styles.cancelBtn} onPress={onClose}>
              <Text style={styles.cancelText}>Cancel</Text>
            </Pressable>
            <Pressable style={styles.confirmBtn} onPress={onConfirm}>
              <Text style={styles.confirmText}>Confirm</Text>
            </Pressable>
          </View>
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
      width: "85%",
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
    message: {
      color: colors.text,
      fontSize: 15,
      textAlign: "center",
      marginBottom: 24,
      lineHeight: 22,
    },
    prayerName: {
      fontWeight: "700",
      color: colors.primary,
    },
    buttonRow: {
      flexDirection: "row",
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
    confirmBtn: {
      flex: 1,
      padding: 12,
      backgroundColor: colors.primary,
      borderRadius: 10,
      alignItems: "center",
      marginLeft: 8,
    },
    confirmText: {
      color: colors.pureWhite,
      fontWeight: "600",
    },
  });

export default QadaConfirmModal;
