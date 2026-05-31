import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import { useMemo } from 'react';
import { create } from 'zustand';

import { useDb } from '@/db/context';
import { SettingsRepository } from '@/db/repositories/settings-repository';
import { BackupReminderService } from '@/services/backup-reminder-service';

import { qk } from './query-keys';

interface BannerState {
  dismissedAt: number | null;
  dismiss: () => void;
}

const useBannerDismissStore = create<BannerState>((set) => ({
  dismissedAt: null,
  dismiss: () => set({ dismissedAt: Date.now() }),
}));

export function useBackupReminder(): UseQueryResult<boolean, Error> {
  const db = useDb();
  const service = useMemo(() => new BackupReminderService(new SettingsRepository(db)), [db]);
  return useQuery<boolean, Error>({
    queryKey: qk.backupReminder(),
    queryFn: () => service.shouldRemind(),
  });
}

export function useBannerDismiss(): { dismissedAt: number | null; dismiss: () => void } {
  return useBannerDismissStore();
}
