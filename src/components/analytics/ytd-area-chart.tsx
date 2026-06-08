import { useMemo, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LineChart } from 'react-native-gifted-charts';

import { Fonts, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import type { YtdPoint } from '@/types';
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

export type YtdAreaChartProps = {
  data: YtdPoint[];
};

type ChartPoint = { value: number; label?: string };

export function YtdAreaChart({ data }: YtdAreaChartProps): React.JSX.Element {
  const colors = useTheme();
  const [chartWidth, setChartWidth] = useState(0);

  const incomePoints = useMemo<ChartPoint[]>(
    () =>
      data.map((d) => ({
        value: d.cum_income,
        label: SHORT_MONTHS[(d.month - 1) % 12] ?? '',
      })),
    [data],
  );

  const expensePoints = useMemo<ChartPoint[]>(
    () => data.map((d) => ({ value: d.cum_expense })),
    [data],
  );

  return (
    <View style={styles.wrap} onLayout={(e) => setChartWidth(e.nativeEvent.layout.width)}>
      {chartWidth > 0 && (
        <LineChart
          areaChart
          data={incomePoints}
          data2={expensePoints}
          color1={colors.income}
          color2={colors.expense}
          startFillColor1={`${colors.income}55`}
          endFillColor1={`${colors.income}00`}
          startFillColor2={`${colors.expense}55`}
          endFillColor2={`${colors.expense}00`}
          startOpacity1={0.4}
          endOpacity1={0.1}
          startOpacity2={0.4}
          endOpacity2={0.1}
          hideDataPoints1
          hideDataPoints2
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

      <Text style={[styles.xLabel, { color: colors.textSecondary }]}>
        Month · Cumulative amount →
      </Text>

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
  xLabel: {
    fontSize: 10,
    fontFamily: Fonts.regular,
    textAlign: 'center',
    marginTop: 2,
    marginBottom: 2,
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
