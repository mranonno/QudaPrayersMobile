import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  StyleProp,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useThemeContext } from "../../../theme/ThemeProvider";

interface Props {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  colors?: [string, string];
  start?: { x: number; y: number };
  end?: { x: number; y: number };
  textColor?: string;
}

const GlobalGradientButton: React.FC<Props> = ({
  title,
  onPress,
  disabled = false,
  loading = false,
  style,
  textStyle,
  colors: customColors,
  start = { x: 0, y: 0 },
  end = { x: 1, y: 0 },
  textColor = "#ffffff",
}) => {
  const { colors: themeColors } = useThemeContext();
  const styles = getStyles(themeColors);
  const gradientColors: [string, string] = customColors || [
    "#00C864",
    "#2D9299",
  ];

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
      style={[styles.buttonContainer, style]}
      accessible
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      accessibilityLabel={title}
    >
      <LinearGradient
        colors={gradientColors}
        start={start}
        end={end}
        style={[styles.button, disabled && styles.disabledButton]}
      >
        {loading ? (
          <ActivityIndicator color={textColor} size="small" />
        ) : (
          <Text style={[styles.text, textStyle, { color: textColor }]}>
            {title}
          </Text>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
};

const getStyles = (colors: Colors) =>
  StyleSheet.create({
    buttonContainer: {
      // Controlled by parent
    },
    button: {
      padding: 14,
      borderRadius: 10,
      alignItems: "center",
      justifyContent: "center",
      minWidth: 120,
    },
    disabledButton: {
      opacity: 0.5,
    },
    text: {
      fontWeight: "600",
      fontSize: 16,
    },
  });

export default GlobalGradientButton;
