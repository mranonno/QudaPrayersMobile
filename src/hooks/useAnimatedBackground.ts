import { useEffect } from "react";
import {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
export const useAnimatedBackground = (
  targetColor: string,
  duration: number = 300
) => {
  const bgColor = useSharedValue(targetColor);

  useEffect(() => {
    bgColor.value = withTiming(targetColor, { duration });
  }, [targetColor]);

  const animatedStyle = useAnimatedStyle(() => ({
    backgroundColor: bgColor.value,
  }));

  return { animatedStyle };
};
