import React from "react";
import { View, Text, Switch, StyleSheet } from "react-native";
import { useThemeContext } from "../theme/ThemeProvider";
import { useTheme } from "@react-navigation/native";

const ThemeSettingScreen = () => {
  const { theme, toggleTheme } = useThemeContext();
  const { colors } = useTheme();

  // Determine if dark mode is active
  const isDark = theme === "dark";

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.row}>
        <Text style={[styles.label, { color: colors.text }]}>Dark Mode</Text>
        <Switch
          value={isDark}
          onValueChange={toggleTheme}
          thumbColor={isDark ? colors.primary : "#f4f3f4"}
          trackColor={{ false: "#767577", true: colors.primary }}
          accessibilityLabel="Toggle dark mode"
          accessibilityRole="switch"
        />
      </View>
    </View>
  );
};

export default ThemeSettingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  label: {
    fontSize: 18,
    marginRight: 12,
  },
});
