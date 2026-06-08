import { StyleSheet, Text, View } from 'react-native';

import { Card } from '@/components/common/card';
import { ProgressBar } from '@/components/common/progress-bar';
import { SectionTitle } from '@/components/common/section-title';
import { Fonts, Spacing } from '@/constants/theme';
import { useBudgetsForMonth } from '@/hooks/use-budgets';
import { useTheme } from '@/hooks/use-theme';
import { formatCurrency } from '@/utils/format';

export type BudgetOverviewProps = {
  yearMonth: string;
  expense: number;
  currency: string;
};

export function BudgetOverview({
  yearMonth,
  expense,
  currency,
}: BudgetOverviewProps): React.JSX.Element | null {
  const colors = useTheme();
  const [yearStr, monthStr] = yearMonth.split('-');
  const year = parseInt(yearStr ?? '2025', 10);
  const month = parseInt(monthStr ?? '1', 10);

  const { data: budgets } = useBudgetsForMonth(year, month);

  const overall = budgets?.find((b) => b.category_id === null);
  if (!overall) return null;

  const ratio = overall.amount > 0 ? expense / overall.amount : 0;
  const overBudget = ratio > 1;
  const barColor = overBudget ? colors.expense : ratio > 0.8 ? colors.warning : colors.primary;

  return (
    <View style={styles.wrapper}>
      <Card>
        <SectionTitle>Monthly Budget</SectionTitle>
        <View style={styles.row}>
          <Text style={[styles.amount, { color: overBudget ? colors.expense : colors.text }]}>
            {formatCurrency(expense, currency)}
          </Text>
          <Text style={[styles.of, { color: colors.textSecondary }]}>
            {' of '}
            {formatCurrency(overall.amount, currency)}
          </Text>
        </View>
        <View style={styles.barWrap}>
          <ProgressBar value={Math.min(ratio, 1)} color={barColor} height={8} />
        </View>
        <Text
          style={[styles.remaining, { color: overBudget ? colors.expense : colors.textSecondary }]}
        >
          {overBudget
            ? `${formatCurrency(expense - overall.amount, currency)} over budget`
            : `${formatCurrency(overall.amount - expense, currency)} remaining`}
        </Text>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: Spacing.three,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginTop: Spacing.two,
  },
  amount: {
    fontSize: 20,
    fontWeight: '700',
    fontFamily: Fonts.bold,
  },
  of: {
    fontSize: 14,
    fontFamily: Fonts.regular,
  },
  barWrap: {
    marginTop: Spacing.two,
  },
  remaining: {
    fontSize: 12,
    fontFamily: Fonts.regular,
    marginTop: Spacing.one,
  },
});
