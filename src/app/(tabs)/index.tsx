import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { TabScreen } from '@/components/common/tab-screen';
import { BackupReminderBanner } from '@/components/backup/backup-reminder-banner';
import { AccountBalanceList } from '@/components/dashboard/account-balance-list';
import { BalanceCard } from '@/components/dashboard/balance-card';
import { BudgetOverview } from '@/components/dashboard/budget-overview';
import { MonthSelector } from '@/components/dashboard/month-selector';
import { NetWorthCard } from '@/components/dashboard/net-worth-card';
import { RecentTransactions } from '@/components/dashboard/recent-transactions';
import { SpendingTrendChart } from '@/components/dashboard/spending-trend-chart';
import { BottomTabInset, Spacing } from '@/constants/theme';
import { useDashboard } from '@/hooks/use-dashboard';
import { useCurrency } from '@/hooks/use-settings';
import { currentYearMonth } from '@/utils/date';

export default function DashboardScreen(): React.JSX.Element {
  const insets = useSafeAreaInsets();

  const [yearMonth, setYearMonth] = useState<string>(currentYearMonth());
  const [accountId, setAccountId] = useState<number | null>(null);

  const data = useDashboard({ yearMonth, accountId });
  const currency = useCurrency();
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

        <NetWorthCard value={data.netWorth} />

        <AccountBalanceList
          accounts={data.balances}
          selectedId={accountId}
          totalNetWorth={data.netWorth}
          onSelect={setAccountId}
        />

        <BalanceCard summary={data.summary} />

        <BudgetOverview
          yearMonth={yearMonth}
          expense={data.summary?.expense ?? 0}
          currency={currency}
        />

        <SpendingTrendChart data={data.trend} isLoading={data.isLoading} />

        <RecentTransactions rows={data.recent} isLoading={data.isLoading} />
      </ScrollView>
    </TabScreen>
  );
}

const styles = StyleSheet.create({
  headerSticky: {
    paddingBottom: Spacing.one,
  },
  scroll: {
    gap: Spacing.three,
  },
});
