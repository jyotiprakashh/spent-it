import { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

import { useTheme } from '@/hooks/use-theme';

export type ChartSkeletonProps = {
  height?: number;
};

export function ChartSkeleton({ height = 180 }: ChartSkeletonProps): React.JSX.Element {
  const colors = useTheme();
  const opacity = useSharedValue(0.4);

  useEffect(() => {
    opacity.value = withRepeat(withTiming(0.8, { duration: 700 }), -1, true);
  }, [opacity]);

  const animatedStyle = useAnimatedStyle(() => ({ opacity: opacity.value }));

  return (
    <Animated.View
      style={[styles.box, { backgroundColor: colors.backgroundSelected, height }, animatedStyle]}
      accessibilityLabel="Loading chart"
    />
  );
}

const styles = StyleSheet.create({
  box: {
    width: '100%',
    borderRadius: 10,
  },
});
