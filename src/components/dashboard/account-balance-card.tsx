import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Money } from '@/components/common/money';
import { Fonts, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import type { AccountWithBalance } from '@/types';

export type AccountBalanceCardProps = {
  account: AccountWithBalance | null; // null = "All accounts" card
  totalNetWorth?: number;
  selected: boolean;
  onPress: () => void;
};

export function AccountBalanceCard({
  account,
  totalNetWorth,
  selected,
  onPress,
}: AccountBalanceCardProps): React.JSX.Element {
  const colors = useTheme();
  const isAll = account === null;

  const name = isAll ? 'All' : account.name;
  const balance = isAll ? (totalNetWorth ?? 0) : account.current_balance;
  const currency = isAll ? 'INR' : account.currency;
  const icon: keyof typeof Ionicons.glyphMap = isAll
    ? 'apps-outline'
    : (account.icon as keyof typeof Ionicons.glyphMap);
  const accentColor = isAll ? colors.primary : account.color;

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.75}
      accessibilityRole="button"
      accessibilityLabel={isAll ? 'All accounts' : `Filter by ${account.name}`}
      accessibilityState={{ selected }}
      style={[
        styles.chip,
        { backgroundColor: colors.backgroundElement },
        selected && { borderColor: accentColor },
      ]}
    >
      <View style={[styles.iconCircle, { backgroundColor: `${accentColor}22` }]}>
        <Ionicons name={icon} size={14} color={accentColor} />
      </View>
      <Text style={[styles.name, { color: colors.text }]} numberOfLines={1}>
        {name}
      </Text>
      <Money
        value={balance}
        currency={currency}
        tone={balance < 0 ? 'expense' : 'default'}
        size={12}
        weight="500"
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  iconCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    fontSize: 13,
    fontWeight: '600',
    fontFamily: Fonts.semibold,
  },
});
