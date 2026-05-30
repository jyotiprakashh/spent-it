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

import { qk } from './query-keys';

export function useSetting(key: string): UseQueryResult<string | null, Error> {
  const db = useDb();
  const repo = useMemo(() => new SettingsRepository(db), [db]);
  return useQuery<string | null, Error>({
    queryKey: qk.settings(key),
    queryFn: () => repo.get(key),
  });
}

export function useSetSetting(): UseMutationResult<void, Error, { key: string; value: string }> {
  const db = useDb();
  const client = useQueryClient();
  const repo = useMemo(() => new SettingsRepository(db), [db]);
  return useMutation<void, Error, { key: string; value: string }>({
    mutationFn: ({ key, value }) => repo.set(key, value),
    onSuccess: (_data, vars) => {
      void client.invalidateQueries({ queryKey: qk.settings(vars.key) });
    },
  });
}
