import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Card } from '@/components/common/card';
import { EmptyState } from '@/components/common/empty-state';
import { SectionTitle } from '@/components/common/section-title';
import { TransactionRow } from '@/components/transactions/transaction-row';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import type { TransactionWithCategory } from '@/types';

export type RecentTransactionsProps = {
  rows: TransactionWithCategory[];
  isLoading: boolean;
};

export function RecentTransactions({
  rows,
  isLoading,
}: RecentTransactionsProps): React.JSX.Element {
  const colors = useTheme();
  const router = useRouter();

  const handleSeeAll = (): void => {
    router.push('/transactions');
  };

  const handlePressRow = (id: number): void => {
    router.push({ pathname: '/add-transaction', params: { id: String(id) } });
  };

  return (
    <Card padded={false}>
      <View style={styles.header}>
        <SectionTitle>Recent</SectionTitle>
        <TouchableOpacity
          onPress={handleSeeAll}
          accessibilityRole="button"
          accessibilityLabel="See all transactions"
          hitSlop={8}
          style={styles.seeAll}
        >
          <Text style={[styles.seeAllText, { color: colors.primary }]}>See all</Text>
          <Ionicons name="chevron-forward" size={14} color={colors.primary} />
        </TouchableOpacity>
      </View>

      {isLoading ? null : rows.length === 0 ? (
        <View style={styles.empty}>
          <EmptyState
            icon="receipt-outline"
            title="No recent activity"
            subtitle="Tap + to add a transaction"
          />
        </View>
      ) : (
        <View>
          {rows.map((tx) => (
            <TransactionRow key={tx.id} tx={tx} onPress={handlePressRow} />
          ))}
        </View>
      )}
    </Card>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.three,
    paddingTop: Spacing.three,
    paddingBottom: Spacing.one,
  },
  seeAll: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  seeAllText: {
    fontSize: 13,
    fontWeight: '600',
  },
  empty: {
    height: 150,
    justifyContent: 'center',
  },
});
