import React from "react";
import { StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { Pressable } from "react-native";
import { useThemeContext } from "../../theme/ThemeProvider";

type Props = {
  icon: React.ReactNode;
  onPress: () => void;
  style?: any;
};

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const IconButton: React.FC<Props> = ({ icon, onPress, style }) => {
  const { colors } = useThemeContext();
  const bg = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    backgroundColor: bg.value
      ? withTiming(colors.card, { duration: 100 })
      : withTiming("transparent", { duration: 100 }),
  }));

  return (
    <AnimatedPressable
      onPressIn={() => (bg.value = 1)}
      onPressOut={() => (bg.value = 0)}
      onPress={onPress}
      style={[styles.iconButton, animatedStyle, style]}
    >
      {icon}
    </AnimatedPressable>
  );
};

export default IconButton;

const styles = StyleSheet.create({
  iconButton: {
    borderRadius: 50,
    padding: 8,
    alignItems: "center",
    justifyContent: "center",
  },
});
