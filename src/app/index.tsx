import { FlashList } from '@shopify/flash-list';
import { useRouter } from 'expo-router';
import { useCallback, useMemo, useRef, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { EmptyState } from '@/components/common/empty-state';
import { Fab } from '@/components/common/fab';
import { IconButton } from '@/components/common/icon-button';
import { AccountFilterChips } from '@/components/transactions/account-filter-chips';
import { SearchBar } from '@/components/transactions/search-bar';
import { SwipeableRow } from '@/components/transactions/swipeable-row';
import { TransactionRow } from '@/components/transactions/transaction-row';
import { TransactionSectionHeader } from '@/components/transactions/transaction-section-header';
import { UndoToast } from '@/components/transactions/undo-toast';
import { BottomTabInset, Spacing } from '@/constants/theme';
import { useAccounts } from '@/hooks/use-accounts';
import { useDebounce } from '@/hooks/use-debounce';
import { useTheme } from '@/hooks/use-theme';
import { useDeleteTransaction, useTransactionsInfinite } from '@/hooks/use-transactions';
import type { TxnFilters } from '@/types';
import { groupTransactionsByDate, type TxnListItem } from '@/utils/date-grouping';

const UNDO_MS = 5000;

export default function TransactionsScreen(): React.JSX.Element {
  const colors = useTheme();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [accountId, setAccountId] = useState<number | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const debouncedSearch = useDebounce(searchInput, 300);

  const filters = useMemo<TxnFilters>(
    () => ({
      account_id: accountId ?? undefined,
      search: debouncedSearch.trim() === '' ? undefined : debouncedSearch.trim(),
    }),
    [accountId, debouncedSearch],
  );

  const accountsQuery = useAccounts();
  const txnQuery = useTransactionsInfinite(filters);
  const deleteMutation = useDeleteTransaction();

  const [pendingDeleteId, setPendingDeleteId] = useState<number | null>(null);
  const deleteTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const allRows = useMemo(() => {
    return txnQuery.data?.pages.flatMap((p) => p.rows) ?? [];
  }, [txnQuery.data]);

  const visibleRows = useMemo(
    () => (pendingDeleteId === null ? allRows : allRows.filter((t) => t.id !== pendingDeleteId)),
    [allRows, pendingDeleteId],
  );

  const items: TxnListItem[] = useMemo(() => groupTransactionsByDate(visibleRows), [visibleRows]);

  const handlePressRow = useCallback(
    (id: number) => router.push({ pathname: '/add-transaction', params: { id: String(id) } }),
    [router],
  );

  const commitDelete = useCallback(
    (id: number) => {
      deleteMutation.mutate(id);
      setPendingDeleteId(null);
      deleteTimer.current = null;
    },
    [deleteMutation],
  );

  const handleDelete = useCallback(
    (id: number) => {
      // If a previous delete is still pending, commit it now to keep things deterministic
      if (pendingDeleteId !== null && deleteTimer.current !== null) {
        clearTimeout(deleteTimer.current);
        commitDelete(pendingDeleteId);
      }
      setPendingDeleteId(id);
      deleteTimer.current = setTimeout(() => commitDelete(id), UNDO_MS);
    },
    [pendingDeleteId, commitDelete],
  );

  const handleUndo = useCallback(() => {
    if (deleteTimer.current !== null) clearTimeout(deleteTimer.current);
    deleteTimer.current = null;
    setPendingDeleteId(null);
  }, []);

  const handleEndReached = useCallback(() => {
    if (txnQuery.hasNextPage && !txnQuery.isFetchingNextPage) {
      void txnQuery.fetchNextPage();
    }
  }, [txnQuery]);

  const renderItem = useCallback(
    ({ item }: { item: TxnListItem }) => {
      if (item.kind === 'header') return <TransactionSectionHeader date={item.date} />;
      return (
        <SwipeableRow onDelete={() => handleDelete(item.tx.id)}>
          <TransactionRow tx={item.tx} onPress={handlePressRow} />
        </SwipeableRow>
      );
    },
    [handleDelete, handlePressRow],
  );

  const isInitialLoading = txnQuery.isLoading;
  const isEmpty = !isInitialLoading && items.length === 0;
  const bottomInset = BottomTabInset + insets.bottom;

  return (
    <GestureHandlerRootView style={[styles.root, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { paddingTop: insets.top + Spacing.one }]}>
        <View style={styles.headerTop}>
          <View style={styles.headerChips}>
            {accountsQuery.data !== undefined && (
              <AccountFilterChips
                accounts={accountsQuery.data}
                selectedId={accountId}
                onSelect={setAccountId}
              />
            )}
          </View>
          <IconButton
            icon={searchOpen ? 'close' : 'search'}
            onPress={() => {
              if (searchOpen) {
                setSearchInput('');
                setSearchOpen(false);
              } else {
                setSearchOpen(true);
              }
            }}
            accessibilityLabel={searchOpen ? 'Close search' : 'Open search'}
          />
        </View>
        {searchOpen && (
          <View style={styles.searchWrap}>
            <SearchBar
              value={searchInput}
              onChangeText={setSearchInput}
              onClose={() => {
                setSearchInput('');
                setSearchOpen(false);
              }}
            />
          </View>
        )}
      </View>

      {isInitialLoading ? (
        <View style={styles.centered}>
          <ActivityIndicator color={colors.textSecondary} />
        </View>
      ) : isEmpty ? (
        <EmptyState
          icon="receipt-outline"
          title="No transactions yet"
          subtitle="Tap + to add your first one"
        />
      ) : (
        <FlashList
          data={items}
          keyExtractor={(it) => it.key}
          renderItem={renderItem}
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.4}
          contentContainerStyle={{ paddingBottom: bottomInset + Spacing.six }}
          ListFooterComponent={
            txnQuery.isFetchingNextPage ? (
              <View style={styles.footer}>
                <ActivityIndicator color={colors.textSecondary} />
              </View>
            ) : null
          }
        />
      )}

      <Fab
        onPress={() => router.push('/add-transaction')}
        accessibilityLabel="Add transaction"
        bottomInset={bottomInset}
      />

      {pendingDeleteId !== null && (
        <UndoToast
          message="Transaction deleted"
          onUndo={handleUndo}
          onTimeout={() => {
            if (pendingDeleteId !== null) commitDelete(pendingDeleteId);
          }}
          bottomInset={bottomInset + 64}
        />
      )}
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  header: {
    paddingBottom: Spacing.one,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerChips: {
    flex: 1,
  },
  searchWrap: {
    paddingTop: Spacing.one,
    paddingBottom: Spacing.two,
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer: {
    paddingVertical: Spacing.three,
  },
});
