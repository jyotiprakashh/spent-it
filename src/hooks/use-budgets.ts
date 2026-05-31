import {
  useMutation,
  useQuery,
  useQueryClient,
  type UseMutationResult,
  type UseQueryResult,
} from '@tanstack/react-query';
import { useMemo } from 'react';

import { useDb } from '@/db/context';
import { BudgetRepository } from '@/db/repositories/budget-repository';
import type { Budget, NewBudget } from '@/types';

import { qk } from './query-keys';

function useBudgetRepo(): BudgetRepository {
  const db = useDb();
  return useMemo(() => new BudgetRepository(db), [db]);
}

function useInvalidateBudgetQueries(): () => Promise<void> {
  const client = useQueryClient();
  return async () => {
    await Promise.all([
      client.invalidateQueries({ queryKey: qk.budgets() }),
      client.invalidateQueries({ queryKey: qk.dashboardRoot() }),
      client.invalidateQueries({ queryKey: qk.analyticsRoot() }),
    ]);
  };
}

export function useBudgetsForMonth(year: number, month: number): UseQueryResult<Budget[], Error> {
  const repo = useBudgetRepo();
  return useQuery<Budget[], Error>({
    queryKey: qk.budgetsForMonth(year, month),
    queryFn: () => repo.getAllForMonth(year, month),
  });
}

export function useBudgetForCategory(
  categoryId: number | null,
  year: number,
  month: number | null,
): UseQueryResult<Budget | null, Error> {
  const repo = useBudgetRepo();
  return useQuery<Budget | null, Error>({
    queryKey: qk.budgetForCategory(categoryId, year, month),
    queryFn: () => repo.getForCategory(categoryId, year, month),
  });
}

export function useUpsertBudget(): UseMutationResult<void, Error, NewBudget> {
  const repo = useBudgetRepo();
  const invalidate = useInvalidateBudgetQueries();
  return useMutation<void, Error, NewBudget>({
    mutationFn: (input) => repo.upsert(input),
    onSuccess: () => invalidate(),
  });
}

export function useDeleteBudget(): UseMutationResult<
  void,
  Error,
  { categoryId: number | null; year: number; month: number | null }
> {
  const repo = useBudgetRepo();
  const invalidate = useInvalidateBudgetQueries();
  return useMutation<
    void,
    Error,
    { categoryId: number | null; year: number; month: number | null }
  >({
    mutationFn: ({ categoryId, year, month }) => repo.deleteForCategory(categoryId, year, month),
    onSuccess: () => invalidate(),
  });
}
