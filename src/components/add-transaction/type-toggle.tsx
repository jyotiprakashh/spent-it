import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import type { TxnType } from '@/types';

export type TypeToggleProps = {
  value: TxnType;
  onChange: (value: TxnType) => void;
};

const OPTIONS: readonly { value: TxnType; label: string }[] = [
  { value: 'expense', label: 'Expense' },
  { value: 'income', label: 'Income' },
];

export function TypeToggle({ value, onChange }: TypeToggleProps): React.JSX.Element {
  const colors = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.backgroundElement }]}>
      {OPTIONS.map((opt) => {
        const selected = opt.value === value;
        const bg = selected ? colors.surface : 'transparent';
        const fg = selected
          ? opt.value === 'income'
            ? colors.income
            : colors.expense
          : colors.textSecondary;
        return (
          <TouchableOpacity
            key={opt.value}
            onPress={() => onChange(opt.value)}
            activeOpacity={0.7}
            accessibilityRole="button"
            accessibilityLabel={opt.label}
            accessibilityState={{ selected }}
            style={[styles.option, { backgroundColor: bg }]}
          >
            <Text style={[styles.label, { color: fg }]}>{opt.label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 4,
    borderRadius: 12,
    alignSelf: 'center',
  },
  option: {
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.two - 2,
    borderRadius: 10,
    minWidth: 110,
    alignItems: 'center',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
  },
});
