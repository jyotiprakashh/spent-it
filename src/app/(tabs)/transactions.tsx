import { Ionicons } from '@expo/vector-icons';
import { FlashList, type FlashListRef } from '@shopify/flash-list';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { EmptyState } from '@/components/common/empty-state';
import { IconButton } from '@/components/common/icon-button';
import { TabScreen } from '@/components/common/tab-screen';
import { AccountFilterChips } from '@/components/transactions/account-filter-chips';
import { SearchBar } from '@/components/transactions/search-bar';
import { SwipeableRow } from '@/components/transactions/swipeable-row';
import { TransactionRow } from '@/components/transactions/transaction-row';
import { TransactionSectionHeader } from '@/components/transactions/transaction-section-header';
import { UndoToast } from '@/components/transactions/undo-toast';
import { BottomTabInset, Spacing } from '@/constants/theme';
import { useAccounts } from '@/hooks/use-accounts';
import { useCategories } from '@/hooks/use-categories';
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
  const params = useLocalSearchParams<{ category_id?: string; account_id?: string }>();

  const [accountId, setAccountId] = useState<number | null>(null);
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const debouncedSearch = useDebounce(searchInput, 300);

  // Apply drill-down params on mount (or when they change via navigation).
  // Deferred via microtask so setState doesn't fire synchronously inside the effect.
  useEffect(() => {
    const rawCat = typeof params.category_id === 'string' ? params.category_id : null;
    const rawAcc = typeof params.account_id === 'string' ? params.account_id : null;
    let cancelled = false;
    void Promise.resolve().then(() => {
      if (cancelled) return;
      if (rawCat !== null) {
        const id = parseInt(rawCat, 10);
        if (Number.isFinite(id)) setCategoryId(id);
      }
      if (rawAcc !== null) {
        const id = parseInt(rawAcc, 10);
        if (Number.isFinite(id)) setAccountId(id);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [params.category_id, params.account_id]);

  const filters = useMemo<TxnFilters>(
    () => ({
      account_id: accountId ?? undefined,
      category_id: categoryId ?? undefined,
      search: debouncedSearch.trim() === '' ? undefined : debouncedSearch.trim(),
    }),
    [accountId, categoryId, debouncedSearch],
  );

  const accountsQuery = useAccounts();
  const categoriesQuery = useCategories();
  const txnQuery = useTransactionsInfinite(filters);
  const deleteMutation = useDeleteTransaction();

  const selectedCategory = useMemo(
    () =>
      categoryId !== null ? (categoriesQuery.data?.find((c) => c.id === categoryId) ?? null) : null,
    [categoryId, categoriesQuery.data],
  );

  const [pendingDeleteId, setPendingDeleteId] = useState<number | null>(null);
  const deleteTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const flashListRef = useRef<FlashListRef<TxnListItem>>(null);
  const prevFirstIdRef = useRef<number | null>(null);

  const allRows = useMemo(() => txnQuery.data?.pages.flatMap((p) => p.rows) ?? [], [txnQuery.data]);
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

  useEffect(() => {
    const currentFirstId = allRows[0]?.id ?? null;
    if (
      currentFirstId !== null &&
      prevFirstIdRef.current !== null &&
      currentFirstId !== prevFirstIdRef.current
    ) {
      flashListRef.current?.scrollToTop({ animated: true });
    }
    prevFirstIdRef.current = currentFirstId;
  }, [allRows]);

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
    <TabScreen>
      <View style={[styles.header, { paddingTop: insets.top + Spacing.one }]}>
        {selectedCategory !== null && (
          <View style={styles.drillRow}>
            <TouchableOpacity
              onPress={() => setCategoryId(null)}
              accessibilityRole="button"
              accessibilityLabel={`Clear ${selectedCategory.name} filter`}
              activeOpacity={0.7}
              style={[styles.drillChip, { backgroundColor: `${selectedCategory.color}22` }]}
            >
              <Ionicons
                name={selectedCategory.icon as keyof typeof Ionicons.glyphMap}
                size={14}
                color={selectedCategory.color}
              />
              <Text style={[styles.drillLabel, { color: colors.text }]}>
                {selectedCategory.name}
              </Text>
              <Ionicons name="close" size={14} color={colors.textSecondary} />
            </TouchableOpacity>
          </View>
        )}
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
          title="No transactions"
          subtitle={
            selectedCategory !== null
              ? `No ${selectedCategory.name} transactions yet`
              : 'Tap + to add your first one'
          }
        />
      ) : (
        <FlashList
          ref={flashListRef}
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
    </TabScreen>
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
  drillRow: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.three,
    paddingBottom: Spacing.one,
  },
  drillChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.two,
    paddingVertical: 4,
    borderRadius: 999,
    gap: 4,
  },
  drillLabel: {
    fontSize: 12,
    fontWeight: '600',
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
