import { useQueries } from '@tanstack/react-query';
import { useMemo } from 'react';

import { useDb } from '@/db/context';
import { AccountRepository } from '@/db/repositories/account-repository';
import { TransactionRepository } from '@/db/repositories/transaction-repository';
import type {
  AccountWithBalance,
  CategorySpend,
  MonthlySummary,
  TransactionWithCategory,
} from '@/types';

import { qk } from './query-keys';

export type DashboardData = {
  netWorth: number;
  balances: AccountWithBalance[];
  summary: MonthlySummary | undefined;
  byCategory: CategorySpend[];
  recent: TransactionWithCategory[];
  isLoading: boolean;
  isError: boolean;
};

export function useDashboard(opts: { yearMonth: string; accountId: number | null }): DashboardData {
  const db = useDb();
  const txRepo = useMemo(() => new TransactionRepository(db), [db]);
  const accRepo = useMemo(() => new AccountRepository(db), [db]);

  return useQueries({
    queries: [
      { queryKey: qk.dashboardNetWorth(), queryFn: () => accRepo.getNetWorth() },
      { queryKey: qk.accounts(), queryFn: () => accRepo.getAll() },
      {
        queryKey: qk.dashboardSummary(opts.yearMonth, opts.accountId),
        queryFn: () => txRepo.getMonthlySummary(opts.yearMonth, opts.accountId),
      },
      {
        queryKey: qk.dashboardByCategory(opts.yearMonth, opts.accountId),
        queryFn: () => txRepo.getSpendingByCategory(opts.yearMonth, opts.accountId),
      },
      {
        queryKey: qk.dashboardRecent(opts.accountId),
        queryFn: () => txRepo.getRecent(5, opts.accountId),
      },
    ],
    combine: (results): DashboardData => {
      const [netWorthR, balancesR, summaryR, byCategoryR, recentR] = results;
      return {
        netWorth: (netWorthR.data as number | undefined) ?? 0,
        balances: (balancesR.data as AccountWithBalance[] | undefined) ?? [],
        summary: summaryR.data as MonthlySummary | undefined,
        byCategory: (byCategoryR.data as CategorySpend[] | undefined) ?? [],
        recent: (recentR.data as TransactionWithCategory[] | undefined) ?? [],
        isLoading: results.some((r) => r.isLoading),
        isError: results.some((r) => r.isError),
      };
    },
  });
}
