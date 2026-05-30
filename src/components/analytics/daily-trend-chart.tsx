import { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { CartesianChart, Line } from 'victory-native';

import { useTheme } from '@/hooks/use-theme';
import type { DailyTrendPoint } from '@/types';

export type DailyTrendChartProps = {
  data: DailyTrendPoint[];
};

type Point = { day: number; total: number };

export function DailyTrendChart({ data }: DailyTrendChartProps): React.JSX.Element {
  const colors = useTheme();
  const points = useMemo<Point[]>(
    () =>
      data.map((d) => ({
        day: parseInt(d.date.slice(8, 10), 10),
        total: d.total,
      })),
    [data],
  );

  return (
    <View style={styles.wrap}>
      <CartesianChart
        data={points}
        xKey="day"
        yKeys={['total']}
        domainPadding={{ top: 12, bottom: 8 }}
      >
        {({ points: p }) => (
          <Line points={p.total} color={colors.expense} strokeWidth={2.5} curveType="natural" />
        )}
      </CartesianChart>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1 },
});
