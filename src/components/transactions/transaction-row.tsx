import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Money } from '@/components/common/money';
import { Fonts, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import type { TransactionWithCategory } from '@/types';

export type TransactionRowProps = {
  tx: TransactionWithCategory;
  onPress: (id: number) => void;
};

export function TransactionRow({ tx, onPress }: TransactionRowProps): React.JSX.Element {
  const colors = useTheme();
  const iconName = tx.category_icon as keyof typeof Ionicons.glyphMap;
  const isIncome = tx.type === 'income';
  const signedAmount = isIncome ? tx.amount : -tx.amount;
  const subtitle = tx.note !== null && tx.note.trim() !== '' ? tx.note : tx.account_name;

  return (
    <TouchableOpacity
      activeOpacity={0.65}
      onPress={() => onPress(tx.id)}
      accessibilityRole="button"
      accessibilityLabel={`${tx.category_name}, ${tx.amount}`}
      style={[styles.row, { backgroundColor: colors.background }]}
    >
      <View style={[styles.icon, { backgroundColor: `${tx.category_color}22` }]}>
        <Ionicons name={iconName} size={20} color={tx.category_color} />
      </View>
      <View style={styles.center}>
        <Text style={[styles.title, { color: colors.text }]} numberOfLines={1}>
          {tx.category_name}
        </Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]} numberOfLines={1}>
          {subtitle}
        </Text>
      </View>
      <Money
        value={signedAmount}
        currency={tx.currency}
        tone={isIncome ? 'income' : 'expense'}
        size={15}
        signed
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
    gap: Spacing.three,
    height: 60,
  },
  icon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  center: {
    flex: 1,
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
    fontFamily: Fonts.semibold,
  },
  subtitle: {
    fontSize: 13,
    fontFamily: Fonts.regular,
    marginTop: 1,
  },
});
