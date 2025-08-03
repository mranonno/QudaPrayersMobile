import React from "react";
import {
  Text,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
  StyleSheet,
  StyleProp,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useThemeContext } from "../../../theme/ThemeProvider";

interface Props {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  colors?: [string, string];
  start?: { x: number; y: number };
  end?: { x: number; y: number };
}

const GlobalGradientOutlineButton: React.FC<Props> = ({
  title,
  onPress,
  disabled = false,
  style,
  textStyle,
  colors: customColors,
  start = { x: 0, y: 0 },
  end = { x: 1, y: 0 },
}) => {
  const { colors: themeColors } = useThemeContext();
  const styles = getStyles(themeColors);
  const gradientColors = customColors || ["#00C864", "#2D9299"];

  return (
    <LinearGradient
      colors={gradientColors}
      start={start}
      end={end}
      style={[styles.gradientBorder, style, disabled && styles.disabled]}
    >
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={onPress}
        disabled={disabled}
        style={styles.innerButton}
        accessible
        accessibilityRole="button"
        accessibilityLabel={title}
      >
        <Text style={[styles.text, textStyle]}>{title}</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const getStyles = (colors: Colors) =>
  StyleSheet.create({
    gradientBorder: {
      flex: 1,
      padding: 1,
      borderRadius: 10,
    },
    innerButton: {
      backgroundColor: colors.card,
      paddingVertical: 13,
      paddingHorizontal: 12,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 9,
      width: "100%",
    },
    text: {
      color: "#20A18A",
      fontSize: 16,
      fontWeight: "600",
    },
    disabled: {
      opacity: 0.6,
    },
  });

export default GlobalGradientOutlineButton;
