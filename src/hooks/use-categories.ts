import {
  useMutation,
  useQuery,
  useQueryClient,
  type UseMutationResult,
  type UseQueryResult,
} from '@tanstack/react-query';
import { useMemo } from 'react';

import { useDb } from '@/db/context';
import { CategoryRepository } from '@/db/repositories/category-repository';
import type { Category, NewCategory, TxnType } from '@/types';

import { qk } from './query-keys';

function useCategoryRepo(): CategoryRepository {
  const db = useDb();
  return useMemo(() => new CategoryRepository(db), [db]);
}

function useInvalidateCategoryQueries(): () => Promise<void> {
  const client = useQueryClient();
  return async () => {
    await Promise.all([
      client.invalidateQueries({ queryKey: qk.categories() }),
      client.invalidateQueries({ queryKey: ['categories', 'active'] }),
      client.invalidateQueries({ queryKey: qk.dashboardRoot() }),
      client.invalidateQueries({ queryKey: qk.analyticsRoot() }),
    ]);
  };
}

export function useCategories(): UseQueryResult<Category[], Error> {
  const repo = useCategoryRepo();
  return useQuery<Category[], Error>({
    queryKey: qk.categories(),
    queryFn: () => repo.getAll(),
  });
}

export function useActiveCategories(type?: TxnType): UseQueryResult<Category[], Error> {
  const repo = useCategoryRepo();
  return useQuery<Category[], Error>({
    queryKey: qk.activeCategories(type),
    queryFn: () => repo.getActive(type),
  });
}

export function useCategory(id: number | null): UseQueryResult<Category | null, Error> {
  const repo = useCategoryRepo();
  return useQuery<Category | null, Error>({
    queryKey: id !== null ? ['category', id] : ['category', 'null'],
    enabled: id !== null,
    queryFn: () => (id !== null ? repo.getById(id) : Promise.resolve(null)),
    staleTime: 0,
  });
}

export function useCreateCategory(): UseMutationResult<number, Error, NewCategory> {
  const repo = useCategoryRepo();
  const invalidate = useInvalidateCategoryQueries();
  return useMutation<number, Error, NewCategory>({
    mutationFn: (input) => repo.create(input),
    onSuccess: () => invalidate(),
  });
}

export function useUpdateCategory(): UseMutationResult<
  void,
  Error,
  { id: number; patch: Partial<NewCategory> }
> {
  const repo = useCategoryRepo();
  const invalidate = useInvalidateCategoryQueries();
  return useMutation<void, Error, { id: number; patch: Partial<NewCategory> }>({
    mutationFn: ({ id, patch }) => repo.update(id, patch),
    onSuccess: () => invalidate(),
  });
}

export function useArchiveCategory(): UseMutationResult<void, Error, number> {
  const repo = useCategoryRepo();
  const invalidate = useInvalidateCategoryQueries();
  return useMutation<void, Error, number>({
    mutationFn: (id) => repo.archive(id),
    onSuccess: () => invalidate(),
  });
}
