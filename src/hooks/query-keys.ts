import type { TxnFilters } from '@/types';

export const qk = {
  transactions: (filters: TxnFilters) => ['transactions', filters] as const,
  transactionsRoot: () => ['transactions'] as const,
  transaction: (id: number) => ['transaction', id] as const,
  accounts: () => ['accounts'] as const,
  categories: () => ['categories'] as const,
  activeCategories: (type?: 'expense' | 'income') =>
    ['categories', 'active', type ?? 'all'] as const,
  paymentMethods: () => ['payment_methods'] as const,
  settings: (key: string) => ['settings', key] as const,
  dashboardRoot: () => ['dashboard'] as const,
  dashboardNetWorth: () => ['dashboard', 'net_worth'] as const,
  dashboardSummary: (yearMonth: string, accountId: number | null) =>
    ['dashboard', 'summary', yearMonth, accountId] as const,
  dashboardByCategory: (yearMonth: string, accountId: number | null) =>
    ['dashboard', 'by_category', yearMonth, accountId] as const,
  dashboardRecent: (accountId: number | null) => ['dashboard', 'recent', accountId] as const,
  analyticsRoot: () => ['analytics'] as const,
  analyticsDaily: (yearMonth: string, accountId: number | null) =>
    ['analytics', 'daily', yearMonth, accountId] as const,
  analyticsMonthly: (endYearMonth: string, accountId: number | null) =>
    ['analytics', 'monthly', endYearMonth, accountId] as const,
  analyticsYtd: (year: number, accountId: number | null) =>
    ['analytics', 'ytd', year, accountId] as const,
} as const;
