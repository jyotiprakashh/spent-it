import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Fab } from '@/components/common/fab';
import { TabScreen } from '@/components/common/tab-screen';
import { BackupReminderBanner } from '@/components/backup/backup-reminder-banner';
import { AccountBalanceList } from '@/components/dashboard/account-balance-list';
import { BalanceCard } from '@/components/dashboard/balance-card';
import { MonthSelector } from '@/components/dashboard/month-selector';
import { NetWorthCard } from '@/components/dashboard/net-worth-card';
import { RecentTransactions } from '@/components/dashboard/recent-transactions';
import { SpendingDonut } from '@/components/dashboard/spending-donut';
import { BottomTabInset, Spacing } from '@/constants/theme';
import { useDashboard } from '@/hooks/use-dashboard';
import { currentYearMonth } from '@/utils/date';

export default function DashboardScreen(): React.JSX.Element {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [yearMonth, setYearMonth] = useState<string>(currentYearMonth());
  const [accountId, setAccountId] = useState<number | null>(null);

  const data = useDashboard({ yearMonth, accountId });
  const bottomInset = BottomTabInset + insets.bottom;

  return (
    <TabScreen>
      <View style={[styles.headerSticky, { paddingTop: insets.top + Spacing.one }]}>
        <MonthSelector value={yearMonth} onChange={setYearMonth} />
      </View>

      <ScrollView
        contentContainerStyle={[styles.scroll, { paddingBottom: bottomInset + Spacing.six }]}
        showsVerticalScrollIndicator={false}
      >
        <BackupReminderBanner />

        <View style={styles.section}>
          <NetWorthCard value={data.netWorth} />
        </View>

        <View style={styles.balanceList}>
          <AccountBalanceList
            accounts={data.balances}
            selectedId={accountId}
            totalNetWorth={data.netWorth}
            onSelect={setAccountId}
          />
        </View>

        <View style={styles.section}>
          <BalanceCard summary={data.summary} />
        </View>

        <View style={styles.section}>
          <SpendingDonut data={data.byCategory} isLoading={data.isLoading} />
        </View>

        <View style={styles.section}>
          <RecentTransactions rows={data.recent} isLoading={data.isLoading} />
        </View>
      </ScrollView>

      <Fab
        onPress={() => router.push('/add-transaction')}
        accessibilityLabel="Add transaction"
        bottomInset={bottomInset}
      />
    </TabScreen>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  headerSticky: {
    paddingBottom: Spacing.one,
  },
  scroll: {
    gap: Spacing.three,
  },
  section: {
    paddingHorizontal: Spacing.three,
  },
  balanceList: {
    // list itself owns its padding via contentContainerStyle
  },
});
