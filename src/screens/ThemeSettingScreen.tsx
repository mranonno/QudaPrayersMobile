import React from "react";
import { Text, StyleSheet, TouchableOpacity, View } from "react-native";
import { useThemeContext } from "../theme/ThemeProvider";

const ThemeSettingScreen = () => {
  const { theme, toggleTheme, colors } = useThemeContext();
  const styles = getStyles(colors);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: colors.primary }]}
        onPress={toggleTheme}
      >
        <Text style={[styles.text, { color: colors.pureWhite }]}>
          Switch to {theme === "light" ? "Dark" : "Light"} Mode
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ThemeSettingScreen;

const getStyles = (colors: colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: colors.background,
    },
    button: {
      padding: 12,
      borderRadius: 8,
    },
    text: {
      fontWeight: "bold",
    },
  });
