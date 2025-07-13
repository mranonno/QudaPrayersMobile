import { useEffect, useRef } from "react";
import {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolateColor,
} from "react-native-reanimated";

export const useAnimatedBackground = (
  targetColor: string,
  duration: number = 300
) => {
  const progress = useSharedValue(0);
  const fromColor = useSharedValue(targetColor);
  const previousColor = useRef(targetColor);

  useEffect(() => {
    fromColor.value = previousColor.current;
    progress.value = 0;
    progress.value = withTiming(1, { duration });
    previousColor.current = targetColor;
  }, [targetColor]);

  const animatedStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 1],
      [fromColor.value, targetColor]
    );
    return { backgroundColor };
  });

  return { animatedStyle };
};
