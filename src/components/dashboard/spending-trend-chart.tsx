import { useMemo, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LineChart } from 'react-native-gifted-charts';

import { Card } from '@/components/common/card';
import { ChartSkeleton } from '@/components/common/chart-skeleton';
import { SectionTitle } from '@/components/common/section-title';
import { Fonts, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import type { DailyTrendPoint } from '@/types';
import { formatCompact } from '@/utils/format';

export type SpendingTrendChartProps = {
  data: DailyTrendPoint[];
  isLoading: boolean;
};

type ChartPoint = { value: number; label: string };

export function SpendingTrendChart({
  data,
  isLoading,
}: SpendingTrendChartProps): React.JSX.Element {
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

  const isEmpty = !isLoading && data.length === 0;

  return (
    <View style={styles.wrapper}>
      <Card>
        <SectionTitle>Last 30 Days</SectionTitle>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>Tap to see amount</Text>
        <View
          style={styles.chartContainer}
          onLayout={(e) => setChartWidth(e.nativeEvent.layout.width)}
        >
          {isLoading ? (
            <ChartSkeleton height={160} />
          ) : isEmpty ? (
            <View style={styles.empty}>
              <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
                No spending data yet
              </Text>
            </View>
          ) : chartWidth > 0 ? (
            <LineChart
              areaChart
              curved
              data={chartData}
              width={chartWidth - 60}
              height={140}
              color={colors.primary}
              startFillColor={`${colors.primary}55`}
              endFillColor={`${colors.primary}00`}
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
                pointerColor: colors.primary,
                pointerStripColor: colors.border,
                pointerStripWidth: 1,
                pointerLabelComponent: (items: { value: number }[]) => (
                  <View style={styles.tooltip}>
                    <Text style={styles.tooltipText}>{formatCompact(items[0]?.value ?? 0)}</Text>
                  </View>
                ),
              }}
            />
          ) : null}
        </View>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: Spacing.three,
  },
  chartContainer: {
    marginTop: Spacing.two,
    minHeight: 160,
  },
  subtitle: {
    fontSize: 11,
    fontFamily: Fonts.regular,
    marginTop: 2,
  },
  empty: {
    height: 160,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 13,
    fontFamily: Fonts.regular,
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
