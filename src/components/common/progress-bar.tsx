import { StyleSheet, View } from 'react-native';

import { useTheme } from '@/hooks/use-theme';

export type ProgressBarProps = {
  value: number;
  color?: string;
  height?: number;
};

export function ProgressBar({ value, color, height = 6 }: ProgressBarProps): React.JSX.Element {
  const colors = useTheme();
  const clamped = Math.max(0, Math.min(value, 1));
  return (
    <View
      style={[
        styles.track,
        { backgroundColor: colors.backgroundElement, height, borderRadius: height / 2 },
      ]}
    >
      <View
        style={[
          styles.fill,
          {
            width: `${clamped * 100}%`,
            backgroundColor: color ?? colors.primary,
            borderRadius: height / 2,
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    width: '100%',
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
  },
});
