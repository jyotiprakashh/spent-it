import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import { DarkTheme, DefaultTheme, SplashScreen, Stack, ThemeProvider } from 'expo-router';
import type { SQLiteDatabase } from 'expo-sqlite';
import { useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { Colors } from '@/constants/theme';

import { AuthGate } from '@/components/auth-gate';
import { TransactionDrawer } from '@/components/add-transaction/transaction-drawer';
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

  const [fontsLoaded] = useFonts({
    Inter_400Regular: require('../../assets/fonts/Inter-Regular.ttf'),
    Inter_500Medium: require('../../assets/fonts/Inter-Medium.ttf'),
    Inter_600SemiBold: require('../../assets/fonts/Inter-SemiBold.ttf'),
    Inter_700Bold: require('../../assets/fonts/Inter-Bold.ttf'),
  });

  useEffect(() => {
    void (async () => {
      try {
        const key = await AuthService.getOrCreateKey();
        const database = await openDatabase(key);
        await runMigrations(database);
        configureErrorLogger(new ErrorRepository(database));
        setDb(database);
      } catch {
        // error already logged via configureErrorLogger
      }
    })();
  }, []);

  useEffect(() => {
    if (db !== null && fontsLoaded) void SplashScreen.hideAsync();
  }, [db, fontsLoaded]);

  if (db === null || !fontsLoaded) return null;

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
                  <Stack
                    screenOptions={{
                      headerShown: false,
                      contentStyle: {
                        backgroundColor:
                          colorScheme === 'dark' ? Colors.dark.background : Colors.light.background,
                      },
                    }}
                  >
                    <Stack.Screen name="(tabs)" />
                    <Stack.Screen name="onboarding" options={{ animation: 'fade' }} />
                    <Stack.Screen
                      name="add-transaction"
                      options={{ presentation: 'modal', animation: 'slide_from_bottom' }}
                    />
                    <Stack.Screen
                      name="account-edit"
                      options={{ presentation: 'modal', animation: 'slide_from_bottom' }}
                    />
                    <Stack.Screen
                      name="category-edit"
                      options={{ presentation: 'modal', animation: 'slide_from_bottom' }}
                    />
                    <Stack.Screen
                      name="budget-edit"
                      options={{ presentation: 'modal', animation: 'slide_from_bottom' }}
                    />
                    <Stack.Screen
                      name="transfer"
                      options={{ presentation: 'modal', animation: 'slide_from_bottom' }}
                    />
                    <Stack.Screen
                      name="settings/accounts"
                      options={{ animation: 'slide_from_right' }}
                    />
                    <Stack.Screen
                      name="settings/categories"
                      options={{ animation: 'slide_from_right' }}
                    />
                    <Stack.Screen
                      name="settings/budgets"
                      options={{ animation: 'slide_from_right' }}
                    />
                    <Stack.Screen
                      name="settings/currency"
                      options={{ animation: 'slide_from_right' }}
                    />
                    <Stack.Screen
                      name="settings/theme"
                      options={{ animation: 'slide_from_right' }}
                    />
                    <Stack.Screen
                      name="settings/lock-timeout"
                      options={{ animation: 'slide_from_right' }}
                    />
                    <Stack.Screen
                      name="settings/error-log"
                      options={{ animation: 'slide_from_right' }}
                    />
                    <Stack.Screen
                      name="settings/backup"
                      options={{ animation: 'slide_from_right' }}
                    />
                    <Stack.Screen
                      name="settings/restore"
                      options={{ animation: 'slide_from_right' }}
                    />
                    <Stack.Screen
                      name="settings/backup-preview"
                      options={{ animation: 'slide_from_right' }}
                    />
                    <Stack.Screen
                      name="backup-passphrase"
                      options={{ presentation: 'modal', animation: 'slide_from_bottom' }}
                    />
                  </Stack>
                  <BudgetAlertBanner />
                  <TransactionDrawer />
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
