import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import { useMemo } from 'react';

import { useDb } from '@/db/context';
import { AccountRepository } from '@/db/repositories/account-repository';
import type { AccountWithBalance } from '@/types';

import { qk } from './query-keys';

export function useAccounts(): UseQueryResult<AccountWithBalance[], Error> {
  const db = useDb();
  const repo = useMemo(() => new AccountRepository(db), [db]);
  return useQuery<AccountWithBalance[], Error>({
    queryKey: qk.accounts(),
    queryFn: () => repo.getAll(),
  });
}
