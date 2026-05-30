import { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Area, CartesianChart } from 'victory-native';

import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import type { YtdPoint } from '@/types';

export type YtdAreaChartProps = {
  data: YtdPoint[];
};

type Point = {
  month: number;
  cum_income: number;
  cum_expense: number;
};

export function YtdAreaChart({ data }: YtdAreaChartProps): React.JSX.Element {
  const colors = useTheme();

  const points = useMemo<Point[]>(
    () =>
      data.map((d) => ({
        month: d.month,
        cum_income: d.cum_income,
        cum_expense: d.cum_expense,
      })),
    [data],
  );

  return (
    <View style={styles.wrap}>
      <View style={styles.chart}>
        <CartesianChart
          data={points}
          xKey="month"
          yKeys={['cum_income', 'cum_expense']}
          domainPadding={{ top: 10, bottom: 6 }}
        >
          {({ points: p, chartBounds }) => (
            <>
              <Area points={p.cum_income} y0={chartBounds.bottom} color={`${colors.income}55`} />
              <Area points={p.cum_expense} y0={chartBounds.bottom} color={`${colors.expense}55`} />
            </>
          )}
        </CartesianChart>
      </View>

      <View style={styles.legend}>
        <View style={styles.legendRow}>
          <View style={[styles.swatch, { backgroundColor: colors.income }]} />
          <Text style={[styles.legendLabel, { color: colors.text }]}>Income</Text>
        </View>
        <View style={styles.legendRow}>
          <View style={[styles.swatch, { backgroundColor: colors.expense }]} />
          <Text style={[styles.legendLabel, { color: colors.text }]}>Expense</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1 },
  chart: { flex: 1 },
  legend: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: Spacing.four,
    paddingTop: Spacing.two,
  },
  legendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.one,
  },
  swatch: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  legendLabel: {
    fontSize: 12,
    fontWeight: '600',
  },
});
