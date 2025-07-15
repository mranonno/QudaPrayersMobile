import React from "react";
import { StyleSheet, Pressable } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
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

  const animatedStyle = useAnimatedStyle(() => {
    const backgroundColor = bg.value === 1 ? colors.background : "transparent";
    return {
      backgroundColor,
    };
  });

  const handlePressIn = () => {
    bg.value = withTiming(1, { duration: 100 });
  };

  const handlePressOut = () => {
    bg.value = withTiming(0, { duration: 100 });
  };

  return (
    <AnimatedPressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
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
