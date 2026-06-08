import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useMemo } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { PieChart } from 'react-native-gifted-charts';

import { ChartSkeleton } from '@/components/common/chart-skeleton';
import { EmptyState } from '@/components/common/empty-state';
import { Money } from '@/components/common/money';
import { SectionTitle } from '@/components/common/section-title';
import { Fonts, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import type { CategorySpend } from '@/types';

const MAX_SLICES = 5;
const OTHER_ID = -1;

export type SpendingDonutProps = {
  data: CategorySpend[];
  isLoading: boolean;
  currency?: string;
};

type Slice = {
  id: number;
  label: string;
  value: number;
  color: string;
  icon: string;
};

type PieItem = {
  value: number;
  color: string;
  sliceId: number;
};

function buildSlices(data: CategorySpend[]): Slice[] {
  if (data.length === 0) return [];
  if (data.length <= MAX_SLICES) {
    return data.map((d) => ({
      id: d.category_id,
      label: d.category_name,
      value: d.total,
      color: d.category_color,
      icon: d.category_icon,
    }));
  }
  const top = data.slice(0, MAX_SLICES - 1).map((d) => ({
    id: d.category_id,
    label: d.category_name,
    value: d.total,
    color: d.category_color,
    icon: d.category_icon,
  }));
  const otherTotal = data.slice(MAX_SLICES - 1).reduce((sum, d) => sum + d.total, 0);
  top.push({
    id: OTHER_ID,
    label: 'Other',
    value: otherTotal,
    color: '#AEB6BF',
    icon: 'ellipsis-horizontal-outline',
  });
  return top;
}

export function SpendingDonut({
  data,
  isLoading,
  currency = 'INR',
}: SpendingDonutProps): React.JSX.Element {
  const colors = useTheme();
  const router = useRouter();

  const slices = useMemo(() => buildSlices(data), [data]);
  const total = useMemo(() => slices.reduce((s, x) => s + x.value, 0), [slices]);

  const pieData = useMemo<PieItem[]>(
    () => slices.map((s) => ({ value: s.value, color: s.color, sliceId: s.id })),
    [slices],
  );

  const handlePress = (sliceId: number): void => {
    if (sliceId === OTHER_ID) return;
    router.push({ pathname: '/transactions', params: { category_id: String(sliceId) } });
  };

  return (
    <View style={styles.container}>
      <SectionTitle>Spending</SectionTitle>
      {isLoading ? (
        <View style={styles.skeleton}>
          <ChartSkeleton height={180} />
        </View>
      ) : slices.length === 0 ? (
        <View style={styles.empty}>
          <EmptyState
            icon="pie-chart-outline"
            title="No spending"
            subtitle="Add an expense to see the breakdown"
          />
        </View>
      ) : (
        <>
          <View style={styles.chartWrap}>
            <PieChart
              data={pieData}
              donut
              innerRadius={70}
              radius={110}
              innerCircleColor={colors.background}
              onPress={(item: PieItem) => handlePress(item.sliceId)}
              centerLabelComponent={() => (
                <View style={styles.center}>
                  <Text style={[styles.totalLabel, { color: colors.textSecondary }]}>Total</Text>
                  <Money value={total} currency={currency} tone="default" size={16} weight="700" />
                </View>
              )}
            />
          </View>

          <View style={styles.legend}>
            {slices.map((s) => {
              const pct = total > 0 ? Math.round((s.value / total) * 100) : 0;
              const drillable = s.id !== OTHER_ID;
              return (
                <TouchableOpacity
                  key={`${s.id}-${s.label}`}
                  onPress={() => handlePress(s.id)}
                  disabled={!drillable}
                  activeOpacity={0.7}
                  accessibilityRole="button"
                  accessibilityLabel={`${s.label} ${pct} percent`}
                  accessibilityState={{ disabled: !drillable }}
                  style={styles.legendRow}
                >
                  <View style={[styles.swatch, { backgroundColor: s.color }]} />
                  <Ionicons
                    name={s.icon as keyof typeof Ionicons.glyphMap}
                    size={14}
                    color={colors.textSecondary}
                  />
                  <Text style={[styles.legendLabel, { color: colors.text }]} numberOfLines={1}>
                    {s.label}
                  </Text>
                  <Text style={[styles.legendPct, { color: colors.textSecondary }]}>{pct}%</Text>
                  <Money value={s.value} currency={currency} tone="muted" size={13} />
                </TouchableOpacity>
              );
            })}
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.three,
  },
  skeleton: {
    marginTop: Spacing.two,
  },
  empty: {
    height: 180,
    justifyContent: 'center',
  },
  chartWrap: {
    marginTop: Spacing.two,
    alignItems: 'center',
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
  },
  totalLabel: {
    fontSize: 11,
    fontWeight: '600',
    fontFamily: Fonts.semibold,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  legend: {
    marginTop: Spacing.two,
    gap: Spacing.one,
  },
  legendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.one,
    gap: Spacing.two,
  },
  swatch: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  legendLabel: {
    flex: 1,
    fontSize: 13,
    fontWeight: '500',
    fontFamily: Fonts.medium,
  },
  legendPct: {
    fontSize: 12,
    fontWeight: '600',
    fontFamily: Fonts.semibold,
    minWidth: 36,
    textAlign: 'right',
  },
});
