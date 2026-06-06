import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Money } from '@/components/common/money';
import { Fonts, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import type { AccountWithBalance } from '@/types';

export type AccountRowProps = {
  account: AccountWithBalance;
  onPress?: () => void;
  onLongPress?: () => void;
  trailingChevron?: boolean;
};

export function AccountRow({
  account,
  onPress,
  onLongPress,
  trailingChevron = true,
}: AccountRowProps): React.JSX.Element {
  const colors = useTheme();
  return (
    <TouchableOpacity
      onPress={onPress}
      onLongPress={onLongPress}
      activeOpacity={0.7}
      accessibilityRole="button"
      accessibilityLabel={`${account.name}, balance`}
      style={styles.row}
    >
      <View style={[styles.iconWrap, { backgroundColor: account.color + '22' }]}>
        <Ionicons
          name={account.icon as keyof typeof Ionicons.glyphMap}
          size={18}
          color={account.color}
        />
      </View>
      <View style={styles.body}>
        <Text style={[styles.name, { color: colors.text }]} numberOfLines={1}>
          {account.name}
        </Text>
        <Text style={[styles.type, { color: colors.textSecondary }]} numberOfLines={1}>
          {account.type.replace('_', ' ')}
        </Text>
      </View>
      <Money
        value={account.current_balance}
        currency={account.currency}
        tone={account.current_balance < 0 ? 'expense' : 'default'}
        size={15}
        weight="700"
      />
      {trailingChevron && (
        <Ionicons name="chevron-forward" size={16} color={colors.textSecondary} />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.two,
    paddingHorizontal: Spacing.three,
    gap: Spacing.three,
  },
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: {
    flex: 1,
    gap: 2,
  },
  name: {
    fontSize: 15,
    fontWeight: '600',
    fontFamily: Fonts.semibold,
  },
  type: {
    fontSize: 11,
    fontWeight: '500',
    fontFamily: Fonts.medium,
    textTransform: 'capitalize',
  },
});
