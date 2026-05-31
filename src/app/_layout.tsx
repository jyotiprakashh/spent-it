import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { DarkTheme, DefaultTheme, SplashScreen, Stack, ThemeProvider } from 'expo-router';
import type { SQLiteDatabase } from 'expo-sqlite';
import { useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { AuthGate } from '@/components/auth-gate';
import { BudgetAlertBanner } from '@/components/budgets/budget-alert-banner';
import { ErrorBoundary } from '@/components/error-boundary';
import { LockController } from '@/components/lock-controller';
import { OnboardingGate } from '@/components/onboarding-gate';
import { DbContext } from '@/db/context';
import { openDatabase } from '@/db/init';
import { runMigrations } from '@/db/migrations/runner';
import { ErrorRepository } from '@/db/repositories/error-repository';
import { AuthService } from '@/services/auth-service';
import { configureErrorLogger } from '@/services/error-logger-service';
import { useAuthStore } from '@/stores/auth-store';

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 60_000, retry: 0, refetchOnWindowFocus: false },
  },
});

export default function RootLayout(): React.JSX.Element | null {
  const colorScheme = useColorScheme();
  const [db, setDb] = useState<SQLiteDatabase | null>(null);
  const authenticated = useAuthStore((s) => s.authenticated);
  const setAuthenticated = useAuthStore((s) => s.setAuthenticated);

  useEffect(() => {
    void (async () => {
      try {
        const key = await AuthService.getOrCreateKey();
        const database = await openDatabase(key);
        await runMigrations(database);
        configureErrorLogger(new ErrorRepository(database));
        setDb(database);
      } finally {
        await SplashScreen.hideAsync();
      }
    })();
  }, []);

  if (db === null) return null;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ErrorBoundary>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <QueryClientProvider client={queryClient}>
            <DbContext.Provider value={db}>
              {authenticated ? (
                <>
                  <LockController />
                  <OnboardingGate />
                  <Stack screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="(tabs)" />
                    <Stack.Screen name="onboarding" options={{ animation: 'fade' }} />
                    <Stack.Screen name="add-transaction" options={{ presentation: 'modal' }} />
                    <Stack.Screen name="account-edit" options={{ presentation: 'modal' }} />
                    <Stack.Screen name="category-edit" options={{ presentation: 'modal' }} />
                    <Stack.Screen name="budget-edit" options={{ presentation: 'modal' }} />
                    <Stack.Screen name="transfer" options={{ presentation: 'modal' }} />
                    <Stack.Screen name="settings/accounts" />
                    <Stack.Screen name="settings/categories" />
                    <Stack.Screen name="settings/budgets" />
                    <Stack.Screen name="settings/currency" />
                    <Stack.Screen name="settings/theme" />
                    <Stack.Screen name="settings/lock-timeout" />
                    <Stack.Screen name="settings/error-log" />
                    <Stack.Screen name="settings/backup" />
                    <Stack.Screen name="settings/restore" />
                    <Stack.Screen name="settings/backup-preview" />
                    <Stack.Screen name="backup-passphrase" options={{ presentation: 'modal' }} />
                  </Stack>
                  <BudgetAlertBanner />
                </>
              ) : (
                <AuthGate onAuthenticated={() => setAuthenticated(true)} />
              )}
            </DbContext.Provider>
          </QueryClientProvider>
        </ThemeProvider>
      </ErrorBoundary>
    </GestureHandlerRootView>
  );
}
