import { useMutation, useQueryClient, type UseMutationResult } from '@tanstack/react-query';
import * as FileSystem from 'expo-file-system/legacy';
import { useMemo } from 'react';

import { useDb } from '@/db/context';
import { BackupRepository } from '@/db/repositories/backup-repository';
import { ImportService } from '@/services/import-service';
import type { ExportPayload } from '@/types';

import { qk } from './query-keys';

function useImportService(): ImportService {
  const db = useDb();
  return useMemo(() => new ImportService(new BackupRepository(db)), [db]);
}

function useInvalidateAll(): () => Promise<void> {
  const client = useQueryClient();
  return async () => {
    await Promise.all([
      client.invalidateQueries({ queryKey: qk.transactionsRoot() }),
      client.invalidateQueries({ queryKey: qk.accounts() }),
      client.invalidateQueries({ queryKey: qk.categories() }),
      client.invalidateQueries({ queryKey: ['categories', 'active'] }),
      client.invalidateQueries({ queryKey: qk.paymentMethods() }),
      client.invalidateQueries({ queryKey: qk.dashboardRoot() }),
      client.invalidateQueries({ queryKey: qk.analyticsRoot() }),
      client.invalidateQueries({ queryKey: qk.budgets() }),
      client.invalidateQueries({ queryKey: ['settings'] }),
      client.invalidateQueries({ queryKey: qk.backupReminder() }),
    ]);
  };
}

async function readFile(uri: string): Promise<string> {
  return FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.UTF8 });
}

export function useImportEncrypted(): UseMutationResult<
  ExportPayload,
  Error,
  { uri: string; passphrase: string }
> {
  const service = useImportService();
  const invalidate = useInvalidateAll();
  return useMutation<ExportPayload, Error, { uri: string; passphrase: string }>({
    mutationFn: async ({ uri, passphrase }) => {
      const raw = await readFile(uri);
      return service.importEncrypted(raw, passphrase);
    },
    onSuccess: () => invalidate(),
  });
}

export function useImportJSON(): UseMutationResult<ExportPayload, Error, { uri: string }> {
  const service = useImportService();
  const invalidate = useInvalidateAll();
  return useMutation<ExportPayload, Error, { uri: string }>({
    mutationFn: async ({ uri }) => {
      const raw = await readFile(uri);
      return service.importJSON(raw);
    },
    onSuccess: () => invalidate(),
  });
}
