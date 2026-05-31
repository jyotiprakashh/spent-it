import {
  useMutation,
  useQuery,
  useQueryClient,
  type UseMutationResult,
  type UseQueryResult,
} from '@tanstack/react-query';
import { useMemo } from 'react';

import { useDb } from '@/db/context';
import { SettingsRepository } from '@/db/repositories/settings-repository';
import { DEFAULTS, SETTING_KEYS, parseSettingsValue } from '@/services/settings-service';
import type { LockTimeoutSeconds, ThemePreference } from '@/types';

import { qk } from './query-keys';

function useSettingsRepo(): SettingsRepository {
  const db = useDb();
  return useMemo(() => new SettingsRepository(db), [db]);
}

export function useSetting(key: string): UseQueryResult<string | null, Error> {
  const repo = useSettingsRepo();
  return useQuery<string | null, Error>({
    queryKey: qk.settings(key),
    queryFn: () => repo.get(key),
  });
}

export function useSetSetting(): UseMutationResult<void, Error, { key: string; value: string }> {
  const repo = useSettingsRepo();
  const client = useQueryClient();
  return useMutation<void, Error, { key: string; value: string }>({
    mutationFn: ({ key, value }) => repo.set(key, value),
    onSuccess: (_data, vars) => {
      void client.invalidateQueries({ queryKey: qk.settings(vars.key) });
    },
  });
}

export function useCurrency(): string {
  const query = useSetting(SETTING_KEYS.currency);
  return query.data ?? DEFAULTS.currency;
}

export function useThemePreference(): ThemePreference {
  const query = useSetting(SETTING_KEYS.theme);
  return parseSettingsValue.theme(query.data ?? null);
}

export function useBiometricEnabled(): boolean {
  const query = useSetting(SETTING_KEYS.biometricLock);
  return parseSettingsValue.boolean(query.data ?? null, DEFAULTS.biometricEnabled);
}

export function useLockTimeoutSeconds(): LockTimeoutSeconds {
  const query = useSetting(SETTING_KEYS.lockTimeoutSeconds);
  return parseSettingsValue.lockTimeout(query.data ?? null);
}
