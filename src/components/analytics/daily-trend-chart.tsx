import { useMemo, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LineChart } from 'react-native-gifted-charts';

import { Fonts } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import type { DailyTrendPoint } from '@/types';
import { formatCompact } from '@/utils/format';

export type DailyTrendChartProps = {
  data: DailyTrendPoint[];
};

type ChartPoint = { value: number; label: string };

export function DailyTrendChart({ data }: DailyTrendChartProps): React.JSX.Element {
  const colors = useTheme();
  const [chartWidth, setChartWidth] = useState(0);

  const chartData = useMemo<ChartPoint[]>(
    () =>
      data.map((d, i) => ({
        value: d.total,
        label: i % 6 === 0 ? String(parseInt(d.date.slice(8, 10), 10)) : '',
      })),
    [data],
  );

  return (
    <View style={styles.wrap} onLayout={(e) => setChartWidth(e.nativeEvent.layout.width)}>
      {chartWidth > 0 && (
        <LineChart
          areaChart
          curved
          data={chartData}
          width={chartWidth - 60}
          height={150}
          color={colors.expense}
          startFillColor={`${colors.expense}55`}
          endFillColor={`${colors.expense}00`}
          startOpacity={0.4}
          endOpacity={0.05}
          noOfSections={4}
          hideDataPoints
          xAxisThickness={0}
          yAxisThickness={0}
          rulesColor={colors.border}
          rulesThickness={0.5}
          yAxisTextStyle={{ color: colors.textSecondary, fontSize: 10 }}
          xAxisLabelTextStyle={{ color: colors.textSecondary, fontSize: 10 }}
          formatYLabel={(v: string) => formatCompact(Number(v))}
          pointerConfig={{
            activatePointersOnLongPress: false,
            autoAdjustPointerLabelPosition: true,
            pointerColor: colors.expense,
            pointerStripColor: colors.border,
            pointerStripWidth: 1,
            pointerLabelComponent: (items: { value: number }[]) => (
              <View style={styles.tooltip}>
                <Text style={styles.tooltipText}>{formatCompact(items[0]?.value ?? 0)}</Text>
              </View>
            ),
          }}
        />
      )}
      <Text style={[styles.xLabel, { color: colors.textSecondary }]}>Day of month</Text>
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
  tooltip: {
    backgroundColor: 'rgba(0,0,0,0.75)',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    minWidth: 56,
    alignItems: 'center',
  },
  tooltipText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontFamily: Fonts.semibold,
    fontWeight: '600',
  },
});
