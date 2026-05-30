import { StyleSheet, Text, View } from 'react-native';

import { Card } from '@/components/common/card';
import { Money } from '@/components/common/money';
import { SectionTitle } from '@/components/common/section-title';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import type { MonthlySummary } from '@/types';

export type BalanceCardProps = {
  summary: MonthlySummary | undefined;
  currency?: string;
};

export function BalanceCard({ summary, currency = 'INR' }: BalanceCardProps): React.JSX.Element {
  const colors = useTheme();
  const income = summary?.income ?? 0;
  const expense = summary?.expense ?? 0;
  const net = summary?.net ?? 0;

  return (
    <Card>
      <SectionTitle>This Month</SectionTitle>
      <View style={styles.row}>
        <View style={styles.col}>
          <Text style={[styles.label, { color: colors.textSecondary }]}>Income</Text>
          <Money value={income} currency={currency} tone="income" size={17} />
        </View>
        <View style={styles.col}>
          <Text style={[styles.label, { color: colors.textSecondary }]}>Expense</Text>
          <Money value={expense} currency={currency} tone="expense" size={17} />
        </View>
        <View style={styles.col}>
          <Text style={[styles.label, { color: colors.textSecondary }]}>Net</Text>
          <Money
            value={net}
            currency={currency}
            tone={net < 0 ? 'expense' : 'income'}
            size={17}
            signed
          />
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginTop: Spacing.two,
    gap: Spacing.two,
  },
  col: {
    flex: 1,
    gap: 2,
  },
  label: {
    fontSize: 12,
    fontWeight: '500',
  },
});
