import { StyleSheet, Text, View } from 'react-native';

import { Card } from '@/components/common/card';
import { ChartSkeleton } from '@/components/common/chart-skeleton';
import { SectionTitle } from '@/components/common/section-title';
import { Fonts, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

import { ChartEmptyState } from './chart-empty-state';

export type ChartCardProps = {
  title: string;
  subtitle?: string;
  isLoading: boolean;
  isEmpty: boolean;
  height?: number;
  emptyMessage?: string;
  children: React.ReactNode;
};

export function ChartCard({
  title,
  subtitle,
  isLoading,
  isEmpty,
  height = 200,
  emptyMessage,
  children,
}: ChartCardProps): React.JSX.Element {
  const colors = useTheme();
  return (
    <Card>
      <SectionTitle>{title}</SectionTitle>
      {subtitle !== undefined && (
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>{subtitle}</Text>
      )}
      <View style={[styles.body, { height }]}>
        {isLoading ? (
          <ChartSkeleton height={height} />
        ) : isEmpty ? (
          <ChartEmptyState height={height} message={emptyMessage} />
        ) : (
          children
        )}
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  subtitle: {
    fontSize: 11,
    fontFamily: Fonts.regular,
    marginTop: 2,
  },
  body: {
    marginTop: Spacing.two,
  },
});
