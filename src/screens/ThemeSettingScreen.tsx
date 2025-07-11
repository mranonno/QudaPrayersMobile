import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import { useThemeContext } from "../theme/ThemeProvider";
import Animated from "react-native-reanimated";
import { useAnimatedBackground } from "../hooks/useAnimatedBackground";

const ThemeSettingScreen = () => {
  const { theme, toggleTheme, colors } = useThemeContext();
  const styles = getStyles(colors);
  const { animatedStyle } = useAnimatedBackground(colors.background);

  return (
    <Animated.View style={[animatedStyle, styles.container]}>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: colors.primary }]}
        onPress={toggleTheme}
      >
        <Text style={styles.text}>
          Switch to {theme === "light" ? "Dark" : "Light"} Mode
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default ThemeSettingScreen;

const getStyles = (colors: colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    button: {
      padding: 12,
      borderRadius: 8,
    },
    text: {
      fontWeight: "bold",
      color: colors.pureWhite,
    },
  });
