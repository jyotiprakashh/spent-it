import { StyleSheet, Text, type TextStyle } from 'react-native';

import { useTheme } from '@/hooks/use-theme';
import { formatCurrency } from '@/utils/format';

export type MoneyProps = {
  value: number;
  currency?: string;
  tone?: 'default' | 'income' | 'expense' | 'muted';
  size?: number;
  weight?: TextStyle['fontWeight'];
  signed?: boolean;
};

export function Money({
  value,
  currency = 'INR',
  tone = 'default',
  size = 16,
  weight = '600',
  signed = false,
}: MoneyProps): React.JSX.Element {
  const colors = useTheme();
  const color =
    tone === 'income'
      ? colors.income
      : tone === 'expense'
        ? colors.expense
        : tone === 'muted'
          ? colors.textSecondary
          : colors.text;

  const prefix = signed && value > 0 ? '+' : '';
  return (
    <Text
      style={[styles.text, { color, fontSize: size, fontWeight: weight }]}
      numberOfLines={1}
      accessibilityLabel={`${prefix}${formatCurrency(value, currency)}`}
    >
      {prefix}
      {formatCurrency(value, currency)}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    letterSpacing: -0.2,
  },
});
