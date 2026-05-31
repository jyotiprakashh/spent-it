import { useMutation, useQueryClient, type UseMutationResult } from '@tanstack/react-query';
import { useMemo } from 'react';

import { useDb } from '@/db/context';
import { AccountRepository } from '@/db/repositories/account-repository';
import { CategoryRepository } from '@/db/repositories/category-repository';
import { TransactionRepository } from '@/db/repositories/transaction-repository';
import { TransferService, type CreateTransferInput } from '@/services/transfer-service';

import { qk } from './query-keys';

function useTransferService(): TransferService {
  const db = useDb();
  return useMemo(
    () =>
      new TransferService(
        new TransactionRepository(db),
        new AccountRepository(db),
        new CategoryRepository(db),
      ),
    [db],
  );
}

function useInvalidateAll(): () => Promise<void> {
  const client = useQueryClient();
  return async () => {
    await Promise.all([
      client.invalidateQueries({ queryKey: qk.transactionsRoot() }),
      client.invalidateQueries({ queryKey: qk.accounts() }),
      client.invalidateQueries({ queryKey: qk.dashboardRoot() }),
      client.invalidateQueries({ queryKey: qk.analyticsRoot() }),
    ]);
  };
}

export function useCreateTransfer(): UseMutationResult<
  { fromId: number; toId: number },
  Error,
  CreateTransferInput
> {
  const service = useTransferService();
  const invalidate = useInvalidateAll();
  return useMutation<{ fromId: number; toId: number }, Error, CreateTransferInput>({
    mutationFn: (input) => service.create(input),
    onSuccess: () => invalidate(),
  });
}

export function useDeleteTransfer(): UseMutationResult<void, Error, number> {
  const service = useTransferService();
  const invalidate = useInvalidateAll();
  return useMutation<void, Error, number>({
    mutationFn: (id) => service.delete(id),
    onSuccess: () => invalidate(),
  });
}
