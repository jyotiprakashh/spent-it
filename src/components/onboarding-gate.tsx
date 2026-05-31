import { useRouter } from 'expo-router';
import { useEffect, useRef } from 'react';

import { useSetting } from '@/hooks/use-settings';
import { SETTING_KEYS } from '@/services/settings-service';

// Mounts once after auth. If onboarding hasn't been completed, redirects to
// /onboarding. The redirect fires exactly once per app launch so manual
// dismissal (router.back) doesn't immediately bounce the user back.
export function OnboardingGate(): null {
  const router = useRouter();
  const onboardingDone = useSetting(SETTING_KEYS.onboardingDone);
  const fired = useRef(false);

  useEffect(() => {
    if (fired.current) return;
    if (onboardingDone.data === undefined) return;
    if (onboardingDone.data === '1') return;
    fired.current = true;
    router.replace('/onboarding');
  }, [onboardingDone.data, router]);

  return null;
}
