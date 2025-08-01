import React, { useEffect, useState, useCallback } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { useThemeContext } from "../theme/ThemeProvider";
import type { DrawerParamList } from "../navigation/DrawerNavigator";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { checkForOTAUpdate } from "../utils/checkForUpdates";

type NavigationProp = NativeStackNavigationProp<DrawerParamList>;

const CheckUpdateScreen = () => {
  const { colors } = useThemeContext();
  const navigation = useNavigation<NavigationProp>();
  const [loading, setLoading] = useState(true);
  const [statusMessage, setStatusMessage] = useState<string>("");

  const showToast = useCallback(
    (
      type: "success" | "error" | "info",
      title: string,
      message?: string,
      duration = 2000
    ) => {
      Toast.show({
        type,
        text1: title,
        text2: message,
        visibilityTime: duration,
      });
    },
    []
  );

  const handleUpdateCheck = useCallback(async () => {
    const { status, error } = await checkForOTAUpdate();

    switch (status) {
      case "updated":
        setStatusMessage("Update downloaded. Restarting app...");
        showToast("success", "Update Downloaded", "Restarting app...");
        break;

      case "uptodate":
        setStatusMessage("You're already up-to-date!");
        showToast("success", "You're up-to-date!");
        setTimeout(() => navigation.goBack(), 1500);
        break;

      case "failed":
        setStatusMessage("Update check failed: " + error);
        showToast("error", "Update check failed", error);
        setTimeout(() => navigation.goBack(), 2000);
        break;
    }

    setLoading(false);
  }, [navigation, showToast]);

  useEffect(() => {
    handleUpdateCheck();
  }, [handleUpdateCheck]);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {loading ? (
        <>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={[styles.message, { color: colors.text }]}>
            Checking for updates...
          </Text>
        </>
      ) : (
        <Text style={[styles.message, { color: colors.text }]}>
          {statusMessage}
        </Text>
      )}
    </View>
  );
};

export default CheckUpdateScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  message: {
    marginTop: 10,
    fontSize: 16,
    textAlign: "center",
    paddingHorizontal: 20,
  },
});
