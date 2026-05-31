import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AccountRow } from '@/components/accounts/account-row';
import { Card } from '@/components/common/card';
import { EmptyState } from '@/components/common/empty-state';
import { Money } from '@/components/common/money';
import { SectionTitle } from '@/components/common/section-title';
import { Spacing } from '@/constants/theme';
import { useAccounts } from '@/hooks/use-accounts';
import { useCurrency } from '@/hooks/use-settings';
import { useTheme } from '@/hooks/use-theme';

export default function AccountsScreen(): React.JSX.Element {
  const colors = useTheme();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const currency = useCurrency();
  const accountsQuery = useAccounts();
  const [showArchived, setShowArchived] = useState(false);

  const all = accountsQuery.data ?? [];
  const active = all.filter((a) => !a.is_archived);
  const netWorth = all.filter((a) => !a.is_archived).reduce((sum, a) => sum + a.current_balance, 0);

  return (
    <View style={[styles.root, { backgroundColor: colors.background, paddingTop: insets.top }]}>
      <Stack.Screen
        options={{
          title: 'Accounts',
          headerShown: true,
          headerRight: () => (
            <TouchableOpacity
              onPress={() => router.push('/transfer')}
              accessibilityRole="button"
              accessibilityLabel="Transfer funds"
              style={styles.transferBtn}
            >
              <Ionicons name="swap-horizontal" size={18} color={colors.primary} />
              <Text style={[styles.transferText, { color: colors.primary }]}>Transfer</Text>
            </TouchableOpacity>
          ),
        }}
      />
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.netWorthRow}>
          <SectionTitle>Net Worth</SectionTitle>
          <Money value={netWorth} currency={currency} size={28} weight="800" />
        </View>

        <TouchableOpacity
          onPress={() => router.push('/account-edit')}
          activeOpacity={0.7}
          accessibilityRole="button"
          accessibilityLabel="Add account"
          style={[styles.addRow, { borderColor: colors.border }]}
        >
          <Ionicons name="add-circle-outline" size={20} color={colors.primary} />
          <Text style={[styles.addText, { color: colors.primary }]}>Add account</Text>
        </TouchableOpacity>

        <Card padded={false}>
          {active.length === 0 ? (
            <EmptyState
              icon="wallet-outline"
              title="No accounts"
              subtitle="Add your first account to start tracking"
            />
          ) : (
            active.map((a) => (
              <AccountRow
                key={a.id}
                account={a}
                onPress={() =>
                  router.push({ pathname: '/transactions', params: { account_id: String(a.id) } })
                }
                onLongPress={() =>
                  router.push({ pathname: '/account-edit', params: { id: String(a.id) } })
                }
              />
            ))
          )}
        </Card>

        <TouchableOpacity
          onPress={() => setShowArchived((v) => !v)}
          accessibilityRole="button"
          accessibilityLabel={showArchived ? 'Hide archived accounts' : 'Show archived accounts'}
          style={styles.toggle}
        >
          <Ionicons
            name={showArchived ? 'chevron-up' : 'chevron-down'}
            size={14}
            color={colors.textSecondary}
          />
          <Text style={[styles.toggleText, { color: colors.textSecondary }]}>
            {showArchived ? 'Hide archived' : 'Show archived'}
          </Text>
        </TouchableOpacity>

        {showArchived && (
          <Card padded={false}>
            {all
              .filter((a) => a.is_archived)
              .map((a) => (
                <AccountRow
                  key={a.id}
                  account={a}
                  onLongPress={() =>
                    router.push({ pathname: '/account-edit', params: { id: String(a.id) } })
                  }
                />
              ))}
          </Card>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  scroll: { padding: Spacing.three, gap: Spacing.three },
  netWorthRow: { gap: Spacing.one, alignItems: 'center' },
  addRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.one,
    paddingVertical: Spacing.two,
    borderRadius: 12,
    borderWidth: 1,
    borderStyle: 'dashed',
  },
  addText: { fontSize: 14, fontWeight: '700' },
  toggle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.one,
    paddingVertical: Spacing.one,
  },
  toggleText: { fontSize: 12, fontWeight: '600' },
  transferBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginRight: Spacing.two,
  },
  transferText: { fontSize: 13, fontWeight: '700' },
});
