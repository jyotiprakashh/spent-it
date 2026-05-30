import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type ChartEmptyStateProps = {
  message?: string;
  icon?: keyof typeof Ionicons.glyphMap;
  height?: number;
};

export function ChartEmptyState({
  message = 'No data for this month',
  icon = 'analytics-outline',
  height = 180,
}: ChartEmptyStateProps): React.JSX.Element {
  const colors = useTheme();
  return (
    <View style={[styles.wrap, { height }]}>
      <Ionicons name={icon} size={28} color={colors.textSecondary} />
      <Text style={[styles.text, { color: colors.textSecondary }]}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.one,
  },
  text: {
    fontSize: 13,
    fontWeight: '500',
  },
});
