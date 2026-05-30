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
import { TransactionRepository } from '@/db/repositories/transaction-repository';
import { TransactionService } from '@/services/transaction-service';
import type { NewTransaction, Transaction, TxnFilters, TxnPage } from '@/types';

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
  return useMemo(() => new TransactionService(new TransactionRepository(db)), [db]);
}

function useInvalidateTxnQueries(): () => Promise<void> {
  const client = useQueryClient();
  return async () => {
    await client.invalidateQueries({ queryKey: qk.transactionsRoot() });
    await client.invalidateQueries({ queryKey: qk.accounts() });
  };
}

export function useCreateTransaction(): UseMutationResult<number, Error, NewTransaction> {
  const service = useTransactionService();
  const invalidate = useInvalidateTxnQueries();
  return useMutation<number, Error, NewTransaction>({
    mutationFn: (input) => service.create(input),
    onSuccess: () => invalidate(),
  });
}

export function useUpdateTransaction(): UseMutationResult<
  void,
  Error,
  { id: number; patch: Partial<NewTransaction> }
> {
  const service = useTransactionService();
  const invalidate = useInvalidateTxnQueries();
  return useMutation<void, Error, { id: number; patch: Partial<NewTransaction> }>({
    mutationFn: ({ id, patch }) => service.update(id, patch),
    onSuccess: () => invalidate(),
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
