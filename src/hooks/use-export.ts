import { useMutation, useQueryClient, type UseMutationResult } from '@tanstack/react-query';
import { File, Paths } from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { useMemo } from 'react';

import { useDb } from '@/db/context';
import { BackupRepository } from '@/db/repositories/backup-repository';
import { SettingsRepository } from '@/db/repositories/settings-repository';
import { ExportService, type ExportArtifact } from '@/services/export-service';
import { fromBase64 } from '@/utils/crypto';

import { qk } from './query-keys';

function useExportService(): ExportService {
  const db = useDb();
  return useMemo(
    () => new ExportService(new BackupRepository(db), new SettingsRepository(db)),
    [db],
  );
}

async function writeAndShare(artifact: ExportArtifact): Promise<void> {
  const file = new File(Paths.cache, artifact.filename);
  if (file.exists) file.delete();
  file.create();
  if (artifact.base64) {
    // jszip outputs base64 — decode and write the raw bytes so the file on
    // disk is a real zip (not a base64-encoded text file).
    file.write(fromBase64(artifact.data));
  } else {
    file.write(artifact.data);
  }
  try {
    if (await Sharing.isAvailableAsync()) {
      await Sharing.shareAsync(file.uri, {
        mimeType: artifact.mimeType,
        dialogTitle: 'Save SpentIt backup',
      });
    }
  } finally {
    try {
      if (file.exists) file.delete();
    } catch {
      // Best-effort cleanup. A leftover cache file is harmless.
    }
  }
}

export function useExportEncrypted(): UseMutationResult<void, Error, string> {
  const service = useExportService();
  const client = useQueryClient();
  return useMutation<void, Error, string>({
    mutationFn: async (passphrase) => {
      const artifact = await service.exportEncrypted(passphrase);
      await writeAndShare(artifact);
    },
    onSuccess: () => {
      void client.invalidateQueries({ queryKey: ['settings'] });
      void client.invalidateQueries({ queryKey: qk.backupReminder() });
    },
  });
}

export function useExportJSON(): UseMutationResult<void, Error, void> {
  const service = useExportService();
  const client = useQueryClient();
  return useMutation<void, Error, void>({
    mutationFn: async () => {
      const artifact = await service.exportJSON();
      await writeAndShare(artifact);
    },
    onSuccess: () => {
      void client.invalidateQueries({ queryKey: ['settings'] });
      void client.invalidateQueries({ queryKey: qk.backupReminder() });
    },
  });
}

export function useExportCsvZip(): UseMutationResult<void, Error, void> {
  const service = useExportService();
  const client = useQueryClient();
  return useMutation<void, Error, void>({
    mutationFn: async () => {
      const artifact = await service.exportCsvZip();
      await writeAndShare(artifact);
    },
    onSuccess: () => {
      void client.invalidateQueries({ queryKey: ['settings'] });
      void client.invalidateQueries({ queryKey: qk.backupReminder() });
    },
  });
}
