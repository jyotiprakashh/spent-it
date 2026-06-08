import { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { TabScreen } from '@/components/common/tab-screen';
import { BudgetSection } from '@/components/analytics/budget-section';
import { ChartCard } from '@/components/analytics/chart-card';
import { MonthlyBarChart } from '@/components/analytics/monthly-bar-chart';
import { YtdAreaChart } from '@/components/analytics/ytd-area-chart';
import { MonthSelector } from '@/components/dashboard/month-selector';
import { SpendingDonut } from '@/components/dashboard/spending-donut';
import { BottomTabInset, Fonts, Spacing } from '@/constants/theme';
import { useAnalytics } from '@/hooks/use-analytics';
import { useCurrency } from '@/hooks/use-settings';
import { useTheme } from '@/hooks/use-theme';
import { currentYearMonth } from '@/utils/date';
import { formatCurrency } from '@/utils/format';

type SummaryChipProps = {
  label: string;
  value: string;
  color: string;
};

function SummaryChip({ label, value, color }: SummaryChipProps): React.JSX.Element {
  const colors = useTheme();
  return (
    <View style={chipStyles.wrap}>
      <Text style={[chipStyles.label, { color: colors.textSecondary }]}>{label}</Text>
      <Text style={[chipStyles.value, { color }]}>{value}</Text>
    </View>
  );
}

const chipStyles = StyleSheet.create({
  wrap: { flex: 1, alignItems: 'center', gap: 2 },
  label: { fontSize: 11, fontFamily: Fonts.regular },
  value: { fontSize: 15, fontWeight: '700', fontFamily: Fonts.bold },
});

export default function AnalyticsScreen(): React.JSX.Element {
  const colors = useTheme();
  const insets = useSafeAreaInsets();
  const currency = useCurrency();

  const [yearMonth, setYearMonth] = useState<string>(currentYearMonth());
  const accountId: number | null = null;

  const data = useAnalytics({ yearMonth, accountId });
  const bottomInset = BottomTabInset + insets.bottom;

  const income = data.summary?.income ?? 0;
  const expense = data.summary?.expense ?? 0;
  const savingsRate = useMemo(() => {
    if (income <= 0) return null;
    return Math.round(((income - expense) / income) * 100);
  }, [income, expense]);

  const monthlyEmpty = data.monthly.every((m) => m.income === 0 && m.expense === 0);
  const ytdEmpty = data.ytd.every((y) => y.cum_income === 0 && y.cum_expense === 0);

  return (
    <TabScreen>
      <View style={[styles.headerSticky, { paddingTop: insets.top + Spacing.one }]}>
        <MonthSelector value={yearMonth} onChange={setYearMonth} />
      </View>

      <ScrollView
        contentContainerStyle={[styles.scroll, { paddingBottom: bottomInset + Spacing.six }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Summary strip */}
        <View style={[styles.summaryRow, { borderBottomColor: colors.border }]}>
          <SummaryChip
            label="Income"
            value={formatCurrency(income, currency)}
            color={colors.income}
          />
          <View style={[styles.divider, { backgroundColor: colors.border }]} />
          <SummaryChip
            label="Expense"
            value={formatCurrency(expense, currency)}
            color={colors.expense}
          />
          <View style={[styles.divider, { backgroundColor: colors.border }]} />
          <SummaryChip
            label="Saved"
            value={savingsRate !== null ? `${savingsRate}%` : '—'}
            color={savingsRate !== null && savingsRate >= 0 ? colors.income : colors.expense}
          />
        </View>

        <View style={styles.section}>
          <ChartCard
            title="6-Month Income vs Expense"
            subtitle="Income · Expense by month"
            isLoading={data.isLoading}
            isEmpty={!data.isLoading && monthlyEmpty}
            height={220}
          >
            <MonthlyBarChart data={data.monthly} currency={currency} />
          </ChartCard>
        </View>

        <View style={styles.section}>
          <ChartCard
            title="Year to Date"
            subtitle="Cumulative income vs expense"
            isLoading={data.isLoading}
            isEmpty={!data.isLoading && ytdEmpty}
            height={220}
          >
            <YtdAreaChart data={data.ytd} />
          </ChartCard>
        </View>

        <View style={styles.section}>
          <SpendingDonut data={data.byCategory} isLoading={data.isLoading} />
        </View>

        <View style={styles.section}>
          <BudgetSection
            yearMonth={yearMonth}
            byCategory={data.byCategory}
            currency={currency}
            totalExpense={expense}
          />
        </View>
      </ScrollView>
    </TabScreen>
  );
}

const styles = StyleSheet.create({
  headerSticky: {
    paddingBottom: Spacing.one,
  },
  summaryRow: {
    flexDirection: 'row',
    paddingVertical: Spacing.two,
    paddingHorizontal: Spacing.three,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  divider: {
    width: StyleSheet.hairlineWidth,
    marginVertical: 4,
  },
  scroll: {
    gap: Spacing.three,
  },
  section: {
    paddingHorizontal: Spacing.three,
  },
});
