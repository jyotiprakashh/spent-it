import { ScrollView, StyleSheet } from 'react-native';

import { Chip } from '@/components/common/chip';
import { Spacing } from '@/constants/theme';
import type { AccountWithBalance } from '@/types';

export type AccountPickerProps = {
  accounts: AccountWithBalance[];
  selectedId: number | null;
  onSelect: (id: number) => void;
};

export function AccountPicker({
  accounts,
  selectedId,
  onSelect,
}: AccountPickerProps): React.JSX.Element {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.list}
    >
      {accounts.map((a) => (
        <Chip
          key={a.id}
          label={a.name}
          selected={selectedId === a.id}
          onPress={() => onSelect(a.id)}
          accessibilityLabel={`Select account ${a.name}`}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  list: {
    gap: Spacing.two,
    paddingHorizontal: Spacing.three,
    paddingBottom: Spacing.two,
  },
});
