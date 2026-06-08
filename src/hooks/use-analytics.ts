import { useQueries } from '@tanstack/react-query';
import { useMemo } from 'react';

import { useDb } from '@/db/context';
import { TransactionRepository } from '@/db/repositories/transaction-repository';
import type {
  CategorySpend,
  DailyTrendPoint,
  MonthlyComparisonPoint,
  MonthlySummary,
  YtdPoint,
} from '@/types';
import { yearOf } from '@/utils/date';

import { qk } from './query-keys';

export type AnalyticsData = {
  daily: DailyTrendPoint[];
  monthly: MonthlyComparisonPoint[];
  ytd: YtdPoint[];
  byCategory: CategorySpend[];
  summary: MonthlySummary | undefined;
  isLoading: boolean;
  isError: boolean;
};

export function useAnalytics(opts: { yearMonth: string; accountId: number | null }): AnalyticsData {
  const db = useDb();
  const repo = useMemo(() => new TransactionRepository(db), [db]);
  const year = yearOf(opts.yearMonth);

  return useQueries({
    queries: [
      {
        queryKey: qk.analyticsDaily(opts.yearMonth, opts.accountId),
        queryFn: () => repo.getDailyTrend(opts.yearMonth, opts.accountId),
      },
      {
        queryKey: qk.analyticsMonthly(opts.yearMonth, opts.accountId),
        queryFn: () => repo.getMonthlyComparison(opts.yearMonth, opts.accountId),
      },
      {
        queryKey: qk.analyticsYtd(year, opts.accountId),
        queryFn: () => repo.getYearToDate(year, opts.accountId),
      },
      {
        queryKey: qk.dashboardByCategory(opts.yearMonth, opts.accountId),
        queryFn: () => repo.getSpendingByCategory(opts.yearMonth, opts.accountId),
      },
      {
        queryKey: qk.analyticsSummary(opts.yearMonth, opts.accountId),
        queryFn: () => repo.getMonthlySummary(opts.yearMonth, opts.accountId),
      },
    ],
    combine: (results): AnalyticsData => {
      const [dailyR, monthlyR, ytdR, byCategoryR, summaryR] = results;
      return {
        daily: (dailyR.data as DailyTrendPoint[] | undefined) ?? [],
        monthly: (monthlyR.data as MonthlyComparisonPoint[] | undefined) ?? [],
        ytd: (ytdR.data as YtdPoint[] | undefined) ?? [],
        byCategory: (byCategoryR.data as CategorySpend[] | undefined) ?? [],
        summary: summaryR.data as MonthlySummary | undefined,
        isLoading: results.some((r) => r.isLoading),
        isError: results.some((r) => r.isError),
      };
    },
  });
}
