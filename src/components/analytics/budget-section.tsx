import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

import { Card } from '@/components/common/card';
import { ProgressBar } from '@/components/common/progress-bar';
import { SectionTitle } from '@/components/common/section-title';
import { Fonts, Spacing } from '@/constants/theme';
import { useBudgetsForMonth } from '@/hooks/use-budgets';
import { useCategories } from '@/hooks/use-categories';
import { useTheme } from '@/hooks/use-theme';
import type { CategorySpend } from '@/types';
import { formatCurrency } from '@/utils/format';

export type BudgetSectionProps = {
  yearMonth: string;
  byCategory: CategorySpend[];
  currency?: string;
  totalExpense: number;
};

export function BudgetSection({
  yearMonth,
  byCategory,
  currency = 'INR',
  totalExpense,
}: BudgetSectionProps): React.JSX.Element | null {
  const colors = useTheme();
  const [yearStr, monthStr] = yearMonth.split('-');
  const year = parseInt(yearStr ?? '2025', 10);
  const month = parseInt(monthStr ?? '1', 10);

  const { data: budgets } = useBudgetsForMonth(year, month);
  const { data: categories } = useCategories();

  if (!budgets || budgets.length === 0) return null;

  const overall = budgets.find((b) => b.category_id === null);
  const categoryBudgets = budgets.filter((b) => b.category_id !== null);

  const getSpend = (categoryId: number): number =>
    byCategory.find((c) => c.category_id === categoryId)?.total ?? 0;

  const getCategoryInfo = (categoryId: number) => categories?.find((c) => c.id === categoryId);

  return (
    <Card>
      <SectionTitle>Budgets</SectionTitle>

      {overall !== undefined && (
        <View style={styles.row}>
          <View style={styles.rowHeader}>
            <Text style={[styles.rowTitle, { color: colors.text }]}>Overall</Text>
            <Text style={[styles.rowAmt, { color: colors.textSecondary }]}>
              {formatCurrency(totalExpense, currency)} / {formatCurrency(overall.amount, currency)}
            </Text>
          </View>
          <ProgressBar
            value={overall.amount > 0 ? totalExpense / overall.amount : 0}
            color={totalExpense > overall.amount ? colors.expense : colors.primary}
            height={6}
          />
        </View>
      )}

      {categoryBudgets.map((budget) => {
        if (budget.category_id === null) return null;
        const spent = getSpend(budget.category_id);
        const ratio = budget.amount > 0 ? spent / budget.amount : 0;
        const cat = getCategoryInfo(budget.category_id);
        const barColor = ratio > 1 ? colors.expense : ratio > 0.8 ? colors.warning : colors.primary;

        return (
          <View key={budget.id} style={styles.row}>
            <View style={styles.rowHeader}>
              <View style={styles.catLabel}>
                {cat !== undefined && (
                  <View style={[styles.catIcon, { backgroundColor: `${cat.color}22` }]}>
                    <Ionicons
                      name={cat.icon as keyof typeof Ionicons.glyphMap}
                      size={12}
                      color={cat.color}
                    />
                  </View>
                )}
                <Text style={[styles.rowTitle, { color: colors.text }]}>
                  {cat?.name ?? `Cat #${budget.category_id}`}
                </Text>
              </View>
              <Text style={[styles.rowAmt, { color: colors.textSecondary }]}>
                {formatCurrency(spent, currency)} / {formatCurrency(budget.amount, currency)}
              </Text>
            </View>
            <ProgressBar value={Math.min(ratio, 1)} color={barColor} height={5} />
          </View>
        );
      })}
    </Card>
  );
}

const styles = StyleSheet.create({
  row: {
    marginTop: Spacing.two,
    gap: Spacing.one,
  },
  rowHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  catLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.one,
  },
  catIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowTitle: {
    fontSize: 13,
    fontWeight: '500',
    fontFamily: Fonts.medium,
  },
  rowAmt: {
    fontSize: 11,
    fontFamily: Fonts.regular,
  },
});
