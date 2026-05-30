import { StyleSheet, View } from 'react-native';

import { Card } from '@/components/common/card';
import { ChartSkeleton } from '@/components/common/chart-skeleton';
import { SectionTitle } from '@/components/common/section-title';
import { Spacing } from '@/constants/theme';

import { ChartEmptyState } from './chart-empty-state';

export type ChartCardProps = {
  title: string;
  isLoading: boolean;
  isEmpty: boolean;
  height?: number;
  emptyMessage?: string;
  children: React.ReactNode;
};

export function ChartCard({
  title,
  isLoading,
  isEmpty,
  height = 200,
  emptyMessage,
  children,
}: ChartCardProps): React.JSX.Element {
  return (
    <Card>
      <SectionTitle>{title}</SectionTitle>
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
  body: {
    marginTop: Spacing.two,
  },
});
