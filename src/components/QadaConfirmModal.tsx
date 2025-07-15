import React, {
  useCallback,
  useMemo,
  useRef,
  useImperativeHandle,
  forwardRef,
} from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { useThemeContext } from "../theme/ThemeProvider";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface Props {
  onClose: () => void;
  onConfirm: () => void;
  prayerName: string;
}

export type QadaConfirmModalRef = {
  present: () => void;
  dismiss: () => void;
};

const QadaConfirmModal = forwardRef<QadaConfirmModalRef, Props>(
  ({ onClose, onConfirm, prayerName }, ref) => {
    const { colors } = useThemeContext();
    const { bottom } = useSafeAreaInsets();
    const styles = useMemo(() => getStyles(colors, bottom), [colors, bottom]);
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);

    const handlePresent = useCallback(() => {
      bottomSheetModalRef.current?.present();
    }, []);

    const handleDismiss = useCallback(() => {
      bottomSheetModalRef.current?.dismiss();
      onClose();
    }, [onClose]);

    useImperativeHandle(ref, () => ({
      present: handlePresent,
      dismiss: () => bottomSheetModalRef.current?.dismiss(),
    }));

    return (
      <BottomSheetModal
        ref={bottomSheetModalRef}
        enablePanDownToClose
        onDismiss={onClose}
        handleIndicatorStyle={styles.handleBar}
        handleStyle={{ backgroundColor: colors.card }}
        style={{ zIndex: 10 }}
        backgroundStyle={{ backgroundColor: colors.card }}
        backdropComponent={({ animatedIndex, animatedPosition }) => (
          <BottomSheetBackdrop
            disappearsOnIndex={-1}
            appearsOnIndex={0}
            animatedIndex={animatedIndex}
            animatedPosition={animatedPosition}
            pressBehavior="close"
          />
        )}
      >
        <BottomSheetView style={styles.container}>
          <Text style={styles.title}>Confirm Prayer Status</Text>
          <Text style={styles.message}>
            Mark the prayer <Text style={styles.prayerName}>{prayerName}</Text>{" "}
            as done?
          </Text>

          <View style={styles.buttonRow}>
            <Pressable style={styles.cancelBtn} onPress={handleDismiss}>
              <Text style={styles.cancelText}>Cancel</Text>
            </Pressable>

            <Pressable
              style={styles.confirmBtn}
              onPress={() => {
                onConfirm();
                bottomSheetModalRef.current?.dismiss();
              }}
            >
              <Text style={styles.confirmText}>Confirm</Text>
            </Pressable>
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    );
  }
);

export default QadaConfirmModal;

const getStyles = (colors: any, bottom: number) =>
  StyleSheet.create({
    container: {
      padding: 24,
      paddingBottom: bottom,
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
      marginBottom: 20,
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
    handleBar: { backgroundColor: colors.primary, width: 50 },
  });
