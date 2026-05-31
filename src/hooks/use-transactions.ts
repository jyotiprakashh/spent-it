import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
  type InfiniteData,
  type UseInfiniteQueryResult,
  type UseMutationResult,
  type UseQueryResult,
} from '@tanstack/react-query';
import { useMemo } from 'react';

import { useDb } from '@/db/context';
import { BudgetRepository } from '@/db/repositories/budget-repository';
import { CategoryRepository } from '@/db/repositories/category-repository';
import { TransactionRepository } from '@/db/repositories/transaction-repository';
import { BudgetAlertService } from '@/services/budget-alert-service';
import {
  TransactionService,
  type SaveTransactionResult,
  type UpdateTransactionResult,
} from '@/services/transaction-service';
import { useAlertStore } from '@/stores/alert-store';
import type { BudgetAlertResult, NewTransaction, Transaction, TxnFilters, TxnPage } from '@/types';

import { qk } from './query-keys';

const PAGE_SIZE = 30;

export function useTransactionsInfinite(
  filters: TxnFilters,
): UseInfiniteQueryResult<InfiniteData<TxnPage>, Error> {
  const db = useDb();
  const repo = useMemo(() => new TransactionRepository(db), [db]);
  return useInfiniteQuery<
    TxnPage,
    Error,
    InfiniteData<TxnPage>,
    ReturnType<typeof qk.transactions>,
    TxnPage['nextCursor']
  >({
    queryKey: qk.transactions(filters),
    initialPageParam: null,
    queryFn: ({ pageParam }) => repo.getPaginated(filters, pageParam, PAGE_SIZE),
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });
}

export function useTransaction(id: number | null): UseQueryResult<Transaction | null, Error> {
  const db = useDb();
  const repo = useMemo(() => new TransactionRepository(db), [db]);
  return useQuery<Transaction | null, Error>({
    queryKey: id !== null ? qk.transaction(id) : ['transaction', 'null'],
    enabled: id !== null,
    queryFn: () => (id !== null ? repo.findById(id) : Promise.resolve(null)),
    staleTime: 0,
  });
}

function useTransactionService(): TransactionService {
  const db = useDb();
  return useMemo(() => {
    const txnRepo = new TransactionRepository(db);
    const budgetRepo = new BudgetRepository(db);
    const categoryRepo = new CategoryRepository(db);
    const alerts = new BudgetAlertService(budgetRepo, txnRepo, categoryRepo);
    return new TransactionService(txnRepo, alerts);
  }, [db]);
}

function useInvalidateTxnQueries(): () => Promise<void> {
  const client = useQueryClient();
  return async () => {
    await Promise.all([
      client.invalidateQueries({ queryKey: qk.transactionsRoot() }),
      client.invalidateQueries({ queryKey: qk.accounts() }),
      client.invalidateQueries({ queryKey: qk.dashboardRoot() }),
      client.invalidateQueries({ queryKey: qk.analyticsRoot() }),
      client.invalidateQueries({ queryKey: qk.budgets() }),
    ]);
  };
}

function pushAlerts(alerts: BudgetAlertResult[]): void {
  const push = useAlertStore.getState().push;
  for (const alert of alerts) push(alert);
}

export function useCreateTransaction(): UseMutationResult<
  SaveTransactionResult,
  Error,
  NewTransaction
> {
  const service = useTransactionService();
  const invalidate = useInvalidateTxnQueries();
  return useMutation<SaveTransactionResult, Error, NewTransaction>({
    mutationFn: (input) => service.create(input),
    onSuccess: async (result) => {
      await invalidate();
      pushAlerts(result.alerts);
    },
  });
}

export function useUpdateTransaction(): UseMutationResult<
  UpdateTransactionResult,
  Error,
  { id: number; patch: Partial<NewTransaction> }
> {
  const service = useTransactionService();
  const invalidate = useInvalidateTxnQueries();
  return useMutation<
    UpdateTransactionResult,
    Error,
    { id: number; patch: Partial<NewTransaction> }
  >({
    mutationFn: ({ id, patch }) => service.update(id, patch),
    onSuccess: async (result) => {
      await invalidate();
      pushAlerts(result.alerts);
    },
  });
}

export function useDeleteTransaction(): UseMutationResult<void, Error, number> {
  const service = useTransactionService();
  const invalidate = useInvalidateTxnQueries();
  return useMutation<void, Error, number>({
    mutationFn: (id) => service.remove(id),
    onSuccess: () => invalidate(),
  });
}
