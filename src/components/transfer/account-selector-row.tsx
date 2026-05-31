import { Ionicons } from '@expo/vector-icons';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Money } from '@/components/common/money';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import type { AccountWithBalance } from '@/types';

export type AccountSelectorRowProps = {
  label: string;
  accounts: AccountWithBalance[];
  selectedId: number | null;
  excludeId?: number | null;
  onSelect: (id: number) => void;
};

export function AccountSelectorRow({
  label,
  accounts,
  selectedId,
  excludeId,
  onSelect,
}: AccountSelectorRowProps): React.JSX.Element {
  const colors = useTheme();
  return (
    <View style={styles.wrap}>
      <Text style={[styles.label, { color: colors.textSecondary }]}>{label}</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.row}
      >
        {accounts.map((a) => {
          const disabled = excludeId !== undefined && excludeId !== null && a.id === excludeId;
          const isSelected = a.id === selectedId;
          return (
            <TouchableOpacity
              key={a.id}
              onPress={() => !disabled && onSelect(a.id)}
              disabled={disabled}
              activeOpacity={0.7}
              accessibilityRole="button"
              accessibilityLabel={`${a.name}${disabled ? ', unavailable' : ''}`}
              accessibilityState={{ selected: isSelected, disabled }}
              style={[
                styles.card,
                {
                  backgroundColor: isSelected
                    ? a.color + '22'
                    : disabled
                      ? colors.backgroundElement
                      : colors.surface,
                  borderColor: isSelected ? a.color : colors.border,
                  opacity: disabled ? 0.4 : 1,
                },
              ]}
            >
              <View style={[styles.iconWrap, { backgroundColor: a.color + '22' }]}>
                <Ionicons
                  name={a.icon as keyof typeof Ionicons.glyphMap}
                  size={16}
                  color={a.color}
                />
              </View>
              <Text style={[styles.name, { color: colors.text }]} numberOfLines={1}>
                {a.name}
              </Text>
              <Money value={a.current_balance} currency={a.currency} size={11} tone="muted" />
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    gap: Spacing.one,
  },
  label: {
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    paddingHorizontal: Spacing.three,
  },
  row: {
    flexDirection: 'row',
    gap: Spacing.two,
    paddingHorizontal: Spacing.three,
  },
  card: {
    minWidth: 110,
    padding: Spacing.two,
    borderRadius: 12,
    borderWidth: 1,
    gap: 4,
  },
  iconWrap: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    fontSize: 12,
    fontWeight: '600',
  },
});
