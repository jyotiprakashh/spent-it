import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ChartCard } from '@/components/analytics/chart-card';
import { DailyTrendChart } from '@/components/analytics/daily-trend-chart';
import { MonthlyBarChart } from '@/components/analytics/monthly-bar-chart';
import { YtdAreaChart } from '@/components/analytics/ytd-area-chart';
import { MonthSelector } from '@/components/dashboard/month-selector';
import { SpendingDonut } from '@/components/dashboard/spending-donut';
import { BottomTabInset, Spacing } from '@/constants/theme';
import { useAnalytics } from '@/hooks/use-analytics';
import { useTheme } from '@/hooks/use-theme';
import { currentYearMonth } from '@/utils/date';

export default function AnalyticsScreen(): React.JSX.Element {
  const colors = useTheme();
  const insets = useSafeAreaInsets();

  const [yearMonth, setYearMonth] = useState<string>(currentYearMonth());
  const accountId: number | null = null;

  const data = useAnalytics({ yearMonth, accountId });
  const bottomInset = BottomTabInset + insets.bottom;

  const dailyEmpty = data.daily.every((d) => d.total === 0);
  const monthlyEmpty = data.monthly.every((m) => m.income === 0 && m.expense === 0);
  const ytdEmpty = data.ytd.every((y) => y.cum_income === 0 && y.cum_expense === 0);

  return (
    <View style={[styles.root, { backgroundColor: colors.background }]}>
      <View style={[styles.headerSticky, { paddingTop: insets.top + Spacing.one }]}>
        <MonthSelector value={yearMonth} onChange={setYearMonth} />
      </View>

      <ScrollView
        contentContainerStyle={[styles.scroll, { paddingBottom: bottomInset + Spacing.six }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.section}>
          <ChartCard
            title="Daily Spend"
            isLoading={data.isLoading}
            isEmpty={!data.isLoading && dailyEmpty}
            height={180}
          >
            <DailyTrendChart data={data.daily} />
          </ChartCard>
        </View>

        <View style={styles.section}>
          <ChartCard
            title="6-Month Income vs Expense"
            isLoading={data.isLoading}
            isEmpty={!data.isLoading && monthlyEmpty}
            height={200}
          >
            <MonthlyBarChart data={data.monthly} />
          </ChartCard>
        </View>

        <View style={styles.section}>
          <ChartCard
            title="Year to Date"
            isLoading={data.isLoading}
            isEmpty={!data.isLoading && ytdEmpty}
            height={200}
          >
            <YtdAreaChart data={data.ytd} />
          </ChartCard>
        </View>

        <View style={styles.section}>
          <SpendingDonut data={data.byCategory} isLoading={data.isLoading} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  headerSticky: {
    paddingBottom: Spacing.one,
  },
  scroll: {
    gap: Spacing.three,
  },
  section: {
    paddingHorizontal: Spacing.three,
  },
});
