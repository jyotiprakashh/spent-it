import { useEffect, useRef } from 'react';
import { AppState, type AppStateStatus } from 'react-native';

import { useBiometricEnabled, useLockTimeoutSeconds } from '@/hooks/use-settings';
import { useAuthStore } from '@/stores/auth-store';

// Mounts an AppState listener. When the app comes back to the foreground
// after `lockTimeoutSeconds` of being backgrounded (and biometric is enabled),
// flips authenticated=false so AuthGate re-mounts.
export function LockController(): null {
  const biometricEnabled = useBiometricEnabled();
  const timeoutSeconds = useLockTimeoutSeconds();
  const setAuthenticated = useAuthStore((s) => s.setAuthenticated);
  const backgroundedAt = useRef<number | null>(null);

  useEffect(() => {
    const handler = (next: AppStateStatus): void => {
      if (next === 'background') {
        backgroundedAt.current = Date.now();
        return;
      }
      if (next === 'active') {
        const since = backgroundedAt.current;
        backgroundedAt.current = null;
        if (since === null) return;
        if (!biometricEnabled) return;
        if (timeoutSeconds === -1) return;
        const elapsed = (Date.now() - since) / 1000;
        if (elapsed >= timeoutSeconds) {
          setAuthenticated(false);
        }
      }
    };
    const sub = AppState.addEventListener('change', handler);
    return () => sub.remove();
  }, [biometricEnabled, timeoutSeconds, setAuthenticated]);

  return null;
}
