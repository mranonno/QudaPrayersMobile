import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useThemeContext } from "../theme/ThemeProvider";

const HomeScreen = () => {
  const { theme, toggleTheme, colors } = useThemeContext();
  const styles = getStyles(colors);
  return (
    <View style={styles.container}>
      <Text style={styles.text}>HomeScreen</Text>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: colors.primary }]}
        onPress={toggleTheme}
      >
        <Text style={styles.text}>
          Switch to {theme === "light" ? "Dark" : "Light"} Mode
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

const getStyles = (colors: colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: 16,
      backgroundColor: "transparent", // ঠিক আছে
    },
    text: {
      fontSize: 24,
      marginBottom: 24,
      color: colors.text,
    },
    button: {
      padding: 12,
      borderRadius: 8,
    },
  });
