import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import { useMemo } from 'react';

import { useDb } from '@/db/context';
import { CategoryRepository } from '@/db/repositories/category-repository';
import type { Category, TxnType } from '@/types';

import { qk } from './query-keys';

export function useCategories(): UseQueryResult<Category[], Error> {
  const db = useDb();
  const repo = useMemo(() => new CategoryRepository(db), [db]);
  return useQuery<Category[], Error>({
    queryKey: qk.categories(),
    queryFn: () => repo.getAll(),
  });
}

export function useActiveCategories(type?: TxnType): UseQueryResult<Category[], Error> {
  const db = useDb();
  const repo = useMemo(() => new CategoryRepository(db), [db]);
  return useQuery<Category[], Error>({
    queryKey: qk.activeCategories(type),
    queryFn: () => repo.getActive(type),
  });
}
