import { useEffect, useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import { Money } from '@/components/common/money';
import { SectionTitle } from '@/components/common/section-title';
import { Fonts, Spacing } from '@/constants/theme';
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

  const opacity = useSharedValue(1);
  const prevExpense = useRef(expense);

  useEffect(() => {
    if (prevExpense.current !== expense) {
      prevExpense.current = expense;
      opacity.value = 0.2;
      opacity.value = withTiming(1, { duration: 380 });
    }
  }, [expense]); // eslint-disable-line react-hooks/exhaustive-deps

  const animStyle = useAnimatedStyle(() => ({ opacity: opacity.value }));

  return (
    <View style={[styles.container, { borderTopColor: colors.border }]}>
      <SectionTitle>This Month</SectionTitle>
      <Animated.View style={[styles.row, animStyle]}>
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
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.three,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
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
    fontFamily: Fonts.medium,
  },
});
