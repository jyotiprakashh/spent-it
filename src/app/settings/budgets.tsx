import { Stack, useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { BudgetRow } from '@/components/budgets/budget-row';
import { Card } from '@/components/common/card';
import { EmptyState } from '@/components/common/empty-state';
import { MonthSelector } from '@/components/dashboard/month-selector';
import { SectionTitle } from '@/components/common/section-title';
import { Spacing } from '@/constants/theme';
import { useBudgetsForMonth } from '@/hooks/use-budgets';
import { useCategories } from '@/hooks/use-categories';
import { useDb } from '@/db/context';
import { useCurrency } from '@/hooks/use-settings';
import { useTheme } from '@/hooks/use-theme';
import { useQuery } from '@tanstack/react-query';
import { TransactionRepository } from '@/db/repositories/transaction-repository';
import { qk } from '@/hooks/query-keys';
import { currentYearMonth } from '@/utils/date';

export default function BudgetsScreen(): React.JSX.Element {
  const colors = useTheme();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const currency = useCurrency();
  const [yearMonth, setYearMonth] = useState<string>(currentYearMonth());
  const year = parseInt(yearMonth.slice(0, 4), 10);
  const month = parseInt(yearMonth.slice(5, 7), 10);

  const budgetsQuery = useBudgetsForMonth(year, month);
  const categoriesQuery = useCategories();
  const db = useDb();
  const txRepo = useMemo(() => new TransactionRepository(db), [db]);
  const spendQuery = useQuery({
    queryKey: qk.dashboardByCategory(yearMonth, null),
    queryFn: () => txRepo.getSpendingByCategory(yearMonth),
  });
  const summaryQuery = useQuery({
    queryKey: qk.dashboardSummary(yearMonth, null),
    queryFn: () => txRepo.getMonthlySummary(yearMonth),
  });

  const budgets = budgetsQuery.data ?? [];
  const totalBudget = budgets.find((b) => b.category_id === null);
  const categoryBudgets = budgets.filter((b) => b.category_id !== null);
  const categories = categoriesQuery.data ?? [];

  const totalSpent = summaryQuery.data?.expense ?? 0;
  const spendByCategory = spendQuery.data ?? [];

  return (
    <View style={[styles.root, { backgroundColor: colors.background, paddingTop: insets.top }]}>
      <Stack.Screen options={{ title: 'Budgets', headerShown: true }} />
      <View style={styles.monthSticky}>
        <MonthSelector value={yearMonth} onChange={setYearMonth} />
      </View>
      <ScrollView contentContainerStyle={styles.scroll}>
        <SectionTitle>Total monthly</SectionTitle>
        <Card>
          {totalBudget !== undefined ? (
            <BudgetRow
              icon="pie-chart-outline"
              color={colors.primary}
              name="Total"
              spent={totalSpent}
              budget={totalBudget.amount}
              currency={currency}
              onPress={() =>
                router.push({
                  pathname: '/budget-edit',
                  params: { year: String(year), month: String(month) },
                })
              }
            />
          ) : (
            <EmptyState
              icon="add-circle-outline"
              title="No total budget"
              subtitle="Tap to set a monthly total"
            />
          )}
          {totalBudget === undefined && (
            <BudgetRow
              icon="add-circle-outline"
              color={colors.textSecondary}
              name="Set total monthly budget"
              spent={0}
              budget={0}
              currency={currency}
              onPress={() =>
                router.push({
                  pathname: '/budget-edit',
                  params: { year: String(year), month: String(month) },
                })
              }
            />
          )}
        </Card>

        <SectionTitle>Per category</SectionTitle>
        <Card>
          {categoryBudgets.map((b) => {
            const cat = categories.find((c) => c.id === b.category_id);
            if (cat === undefined) return null;
            const spent = spendByCategory.find((s) => s.category_id === cat.id)?.total ?? 0;
            return (
              <BudgetRow
                key={b.id}
                icon={cat.icon as 'pie-chart-outline'}
                color={cat.color}
                name={cat.name}
                spent={spent}
                budget={b.amount}
                currency={currency}
                onPress={() =>
                  router.push({
                    pathname: '/budget-edit',
                    params: {
                      category_id: String(cat.id),
                      year: String(year),
                      month: String(month),
                    },
                  })
                }
              />
            );
          })}
          {categoryBudgets.length === 0 && (
            <EmptyState
              icon="bookmark-outline"
              title="No category budgets"
              subtitle="Tap below to add one"
            />
          )}
          <BudgetRow
            icon="add-circle-outline"
            color={colors.textSecondary}
            name="Add category budget"
            spent={0}
            budget={0}
            currency={currency}
            onPress={() =>
              router.push({
                pathname: '/budget-edit',
                params: { year: String(year), month: String(month), new: '1' },
              })
            }
          />
        </Card>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  monthSticky: { paddingBottom: Spacing.one },
  scroll: { padding: Spacing.three, gap: Spacing.three },
});
