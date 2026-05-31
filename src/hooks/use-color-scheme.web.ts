import { useSyncExternalStore } from 'react';
import { useColorScheme as useRNColorScheme, type ColorSchemeName } from 'react-native';

// On web, useRNColorScheme can return values inconsistent with the server-rendered
// markup. We subscribe to a single mount event via useSyncExternalStore so the
// hook returns 'light' until React hydrates, then the actual scheme afterwards.
// This avoids the react-hooks/set-state-in-effect lint rule.

let isHydrated = false;
const listeners = new Set<() => void>();

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  if (!isHydrated && typeof window !== 'undefined') {
    queueMicrotask(() => {
      if (isHydrated) return;
      isHydrated = true;
      for (const l of listeners) l();
    });
  }
  return () => {
    listeners.delete(listener);
  };
}

function getSnapshot(): boolean {
  return isHydrated;
}

function getServerSnapshot(): boolean {
  return false;
}

export function useColorScheme(): ColorSchemeName {
  const hydrated = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const colorScheme = useRNColorScheme();
  return hydrated ? colorScheme : 'light';
}
