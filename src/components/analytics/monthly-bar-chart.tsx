import { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Bar, CartesianChart } from 'victory-native';

import { Money } from '@/components/common/money';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import type { MonthlyComparisonPoint } from '@/types';

const SHORT_MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

export type MonthlyBarChartProps = {
  data: MonthlyComparisonPoint[];
  currency?: string;
};

type Point = {
  idx: number;
  income: number;
  expense: number;
  label: string;
};

function shortLabel(ym: string): string {
  const m = parseInt(ym.slice(5, 7), 10);
  return SHORT_MONTHS[m - 1] ?? '';
}

export function MonthlyBarChart({
  data,
  currency = 'INR',
}: MonthlyBarChartProps): React.JSX.Element {
  const colors = useTheme();

  const points = useMemo<Point[]>(
    () =>
      data.map((d, i) => ({
        idx: i,
        income: d.income,
        expense: d.expense,
        label: shortLabel(d.year_month),
      })),
    [data],
  );

  const totalIncome = useMemo(() => data.reduce((s, d) => s + d.income, 0), [data]);
  const totalExpense = useMemo(() => data.reduce((s, d) => s + d.expense, 0), [data]);

  return (
    <View style={styles.wrap}>
      <View style={styles.chart}>
        <CartesianChart
          data={points}
          xKey="idx"
          yKeys={['income', 'expense']}
          domainPadding={{ left: 24, right: 24, top: 12, bottom: 8 }}
        >
          {({ points: p, chartBounds }) => (
            <>
              <Bar
                points={p.income}
                chartBounds={chartBounds}
                color={colors.income}
                roundedCorners={{ topLeft: 4, topRight: 4 }}
                barWidth={10}
              />
              <Bar
                points={p.expense}
                chartBounds={chartBounds}
                color={colors.expense}
                roundedCorners={{ topLeft: 4, topRight: 4 }}
                barWidth={10}
              />
            </>
          )}
        </CartesianChart>
      </View>

      <View style={styles.xAxis}>
        {points.map((p) => (
          <Text key={p.idx} style={[styles.tick, { color: colors.textSecondary }]}>
            {p.label}
          </Text>
        ))}
      </View>

      <View style={styles.legend}>
        <View style={styles.legendRow}>
          <View style={[styles.swatch, { backgroundColor: colors.income }]} />
          <Text style={[styles.legendLabel, { color: colors.text }]}>Income</Text>
          <Money value={totalIncome} currency={currency} tone="income" size={12} />
        </View>
        <View style={styles.legendRow}>
          <View style={[styles.swatch, { backgroundColor: colors.expense }]} />
          <Text style={[styles.legendLabel, { color: colors.text }]}>Expense</Text>
          <Money value={totalExpense} currency={currency} tone="expense" size={12} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1 },
  chart: { flex: 1 },
  xAxis: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.three,
    marginTop: 2,
  },
  tick: {
    fontSize: 10,
    fontWeight: '500',
  },
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
