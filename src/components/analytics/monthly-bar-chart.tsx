import { useMemo, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { BarChart } from 'react-native-gifted-charts';

import { Money } from '@/components/common/money';
import { Fonts, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import type { MonthlyComparisonPoint } from '@/types';
import { formatCompact } from '@/utils/format';

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

type BarItem = {
  value: number;
  frontColor: string;
  label?: string;
  labelTextStyle?: object;
  spacing?: number;
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
  const [chartWidth, setChartWidth] = useState(0);

  const barData = useMemo<BarItem[]>(() => {
    const result: BarItem[] = [];
    data.forEach((d, i) => {
      result.push({
        value: d.income,
        frontColor: colors.income,
        label: shortLabel(d.year_month),
        spacing: 2,
        labelTextStyle: { color: colors.textSecondary, fontSize: 9 },
      });
      result.push({
        value: d.expense,
        frontColor: colors.expense,
        spacing: i < data.length - 1 ? 16 : 0,
      });
    });
    return result;
  }, [data, colors]);

  const totalIncome = useMemo(() => data.reduce((s, d) => s + d.income, 0), [data]);
  const totalExpense = useMemo(() => data.reduce((s, d) => s + d.expense, 0), [data]);

  return (
    <View style={styles.wrap} onLayout={(e) => setChartWidth(e.nativeEvent.layout.width)}>
      {chartWidth > 0 && (
        <BarChart
          data={barData}
          barWidth={12}
          roundedTop
          noOfSections={4}
          width={chartWidth - 60}
          height={180}
          xAxisThickness={0}
          yAxisThickness={0}
          rulesColor={colors.border}
          rulesThickness={0.5}
          yAxisTextStyle={{ color: colors.textSecondary, fontSize: 10 }}
          xAxisLabelTextStyle={{ color: colors.textSecondary, fontSize: 10 }}
          formatYLabel={(v: string) => formatCompact(Number(v))}
        />
      )}

      <Text style={[styles.xLabel, { color: colors.textSecondary }]}>Month · Amount →</Text>

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
  xLabel: {
    fontSize: 10,
    fontFamily: Fonts.regular,
    textAlign: 'center',
    marginTop: 2,
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
    fontFamily: Fonts.semibold,
  },
});
