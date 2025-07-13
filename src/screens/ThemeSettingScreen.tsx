import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useThemeContext } from "../theme/ThemeProvider";
import Animated from "react-native-reanimated";
import { useAnimatedBackground } from "../hooks/useAnimatedBackground";
import { Ionicons } from "@expo/vector-icons";

// Define exact theme keys used in context
type ThemeOption = {
  key: "light" | "dark" | "system";
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
};

const themeOptions: ThemeOption[] = [
  { key: "light", label: "Light Mode", icon: "sunny" },
  { key: "dark", label: "Dark Mode", icon: "moon" },
  { key: "system", label: "System Default", icon: "desktop" },
];

const ThemeSettingScreen = () => {
  const { theme, setTheme, colors } = useThemeContext();
  const styles = getStyles(colors);
  const { animatedStyle } = useAnimatedBackground(colors.background);

  const handleSelect = (selectedTheme: ThemeOption["key"]) => {
    setTheme(selectedTheme);
  };

  return (
    <Animated.View style={[animatedStyle, styles.container]}>
      <Text style={styles.title}>Select App Theme</Text>

      {themeOptions.map((option) => {
        const isSelected = theme === option.key;

        return (
          <TouchableOpacity
            key={option.key}
            style={[
              styles.optionContainer,
              { borderColor: isSelected ? colors.primary : colors.border },
            ]}
            onPress={() => handleSelect(option.key)}
          >
            <Ionicons
              name={option.icon}
              size={24}
              color={isSelected ? colors.primary : colors.text}
              style={styles.icon}
            />
            <Text
              style={[
                styles.label,
                { color: isSelected ? colors.primary : colors.text },
              ]}
            >
              {option.label}
            </Text>
            <Ionicons
              name={
                isSelected
                  ? "radio-button-on-outline"
                  : "radio-button-off-outline"
              }
              size={22}
              color={isSelected ? colors.primary : colors.text}
              style={{ marginLeft: "auto" }}
            />
          </TouchableOpacity>
        );
      })}
    </Animated.View>
  );
};

export default ThemeSettingScreen;

const getStyles = (colors: Colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 20,
      justifyContent: "center",
    },
    title: {
      fontSize: 22,
      fontWeight: "bold",
      color: colors.text,
      marginBottom: 30,
      alignSelf: "center",
    },
    optionContainer: {
      flexDirection: "row",
      alignItems: "center",
      borderWidth: 1.5,
      borderRadius: 10,
      paddingVertical: 14,
      paddingHorizontal: 16,
      marginBottom: 16,
    },
    label: {
      fontSize: 16,
      marginLeft: 12,
    },
    icon: {
      width: 24,
    },
  });
