import { ScrollView, StyleSheet } from 'react-native';

import { Spacing } from '@/constants/theme';
import type { AccountWithBalance } from '@/types';

import { AccountBalanceCard } from './account-balance-card';

export type AccountBalanceListProps = {
  accounts: AccountWithBalance[];
  selectedId: number | null;
  totalNetWorth: number;
  onSelect: (id: number | null) => void;
};

export function AccountBalanceList({
  accounts,
  selectedId,
  totalNetWorth,
  onSelect,
}: AccountBalanceListProps): React.JSX.Element {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.list}
    >
      <AccountBalanceCard
        account={null}
        totalNetWorth={totalNetWorth}
        selected={selectedId === null}
        onPress={() => onSelect(null)}
      />
      {accounts.map((a) => (
        <AccountBalanceCard
          key={a.id}
          account={a}
          selected={selectedId === a.id}
          onPress={() => onSelect(a.id)}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  list: {
    gap: Spacing.two,
    paddingHorizontal: Spacing.three,
  },
});
