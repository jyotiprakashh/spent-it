import {
  useMutation,
  useQuery,
  useQueryClient,
  type UseMutationResult,
  type UseQueryResult,
} from '@tanstack/react-query';
import { useMemo } from 'react';

import { useDb } from '@/db/context';
import { AccountRepository } from '@/db/repositories/account-repository';
import type { Account, AccountWithBalance, NewAccount } from '@/types';

import { qk } from './query-keys';

function useAccountRepo(): AccountRepository {
  const db = useDb();
  return useMemo(() => new AccountRepository(db), [db]);
}

function useInvalidateAccountQueries(): () => Promise<void> {
  const client = useQueryClient();
  return async () => {
    await Promise.all([
      client.invalidateQueries({ queryKey: qk.accounts() }),
      client.invalidateQueries({ queryKey: qk.dashboardRoot() }),
      client.invalidateQueries({ queryKey: qk.analyticsRoot() }),
      client.invalidateQueries({ queryKey: qk.transactionsRoot() }),
    ]);
  };
}

export function useAccounts(): UseQueryResult<AccountWithBalance[], Error> {
  const repo = useAccountRepo();
  return useQuery<AccountWithBalance[], Error>({
    queryKey: qk.accounts(),
    queryFn: () => repo.getAll(),
  });
}

export function useAccount(id: number | null): UseQueryResult<Account | null, Error> {
  const repo = useAccountRepo();
  return useQuery<Account | null, Error>({
    queryKey: id !== null ? ['account', id] : ['account', 'null'],
    enabled: id !== null,
    queryFn: () => (id !== null ? repo.getById(id) : Promise.resolve(null)),
    staleTime: 0,
  });
}

export function useAccountTransactionCount(id: number | null): UseQueryResult<number, Error> {
  const repo = useAccountRepo();
  return useQuery<number, Error>({
    queryKey: id !== null ? qk.accountTransactionCount(id) : ['accounts', 'tx_count', 'null'],
    enabled: id !== null,
    queryFn: () => (id !== null ? repo.getTransactionCount(id) : Promise.resolve(0)),
  });
}

export function useCreateAccount(): UseMutationResult<number, Error, NewAccount> {
  const repo = useAccountRepo();
  const invalidate = useInvalidateAccountQueries();
  return useMutation<number, Error, NewAccount>({
    mutationFn: (input) => repo.create(input),
    onSuccess: () => invalidate(),
  });
}

export function useUpdateAccount(): UseMutationResult<
  void,
  Error,
  { id: number; patch: Partial<NewAccount> }
> {
  const repo = useAccountRepo();
  const invalidate = useInvalidateAccountQueries();
  return useMutation<void, Error, { id: number; patch: Partial<NewAccount> }>({
    mutationFn: ({ id, patch }) => repo.update(id, patch),
    onSuccess: () => invalidate(),
  });
}

export function useArchiveAccount(): UseMutationResult<void, Error, number> {
  const repo = useAccountRepo();
  const invalidate = useInvalidateAccountQueries();
  return useMutation<void, Error, number>({
    mutationFn: (id) => repo.archive(id),
    onSuccess: () => invalidate(),
  });
}
