import { ScrollView, StyleSheet } from 'react-native';

import { Chip } from '@/components/common/chip';
import { Spacing } from '@/constants/theme';
import type { AccountType } from '@/types';

const TYPES: { key: AccountType; label: string }[] = [
  { key: 'cash', label: 'Cash' },
  { key: 'bank', label: 'Bank' },
  { key: 'credit_card', label: 'Credit Card' },
  { key: 'savings', label: 'Savings' },
  { key: 'investment', label: 'Investment' },
  { key: 'wallet', label: 'Wallet' },
];

export type AccountTypePickerProps = {
  selected: AccountType;
  onSelect: (type: AccountType) => void;
};

export function AccountTypePicker({
  selected,
  onSelect,
}: AccountTypePickerProps): React.JSX.Element {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.row}
    >
      {TYPES.map((t) => (
        <Chip
          key={t.key}
          label={t.label}
          selected={t.key === selected}
          onPress={() => onSelect(t.key)}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: Spacing.one,
    paddingVertical: Spacing.one,
  },
});
