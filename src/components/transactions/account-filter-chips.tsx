import { ScrollView, StyleSheet } from 'react-native';

import { Chip } from '@/components/common/chip';
import { Spacing } from '@/constants/theme';
import type { AccountWithBalance } from '@/types';

export type AccountFilterChipsProps = {
  accounts: AccountWithBalance[];
  selectedId: number | null;
  onSelect: (id: number | null) => void;
};

export function AccountFilterChips({
  accounts,
  selectedId,
  onSelect,
}: AccountFilterChipsProps): React.JSX.Element {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      <Chip
        label="All"
        selected={selectedId === null}
        onPress={() => onSelect(null)}
        accessibilityLabel="Show all accounts"
      />
      {accounts.map((a) => (
        <Chip
          key={a.id}
          label={a.name}
          selected={selectedId === a.id}
          onPress={() => onSelect(a.id)}
          accessibilityLabel={`Filter by ${a.name}`}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
    gap: Spacing.two,
    alignItems: 'center',
  },
});
