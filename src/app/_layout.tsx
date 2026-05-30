import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { DarkTheme, DefaultTheme, SplashScreen, Stack, ThemeProvider } from 'expo-router';
import type { SQLiteDatabase } from 'expo-sqlite';
import { useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { AuthGate } from '@/components/auth-gate';
import { DbContext } from '@/db/context';
import { openDatabase } from '@/db/init';
import { runMigrations } from '@/db/migrations/runner';
import { AuthService } from '@/services/auth-service';

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 60_000, retry: 0, refetchOnWindowFocus: false },
  },
});

export default function RootLayout(): React.JSX.Element | null {
  const colorScheme = useColorScheme();
  const [db, setDb] = useState<SQLiteDatabase | null>(null);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    void (async () => {
      try {
        const key = await AuthService.getOrCreateKey();
        const database = await openDatabase(key);
        await runMigrations(database);
        setDb(database);
      } finally {
        await SplashScreen.hideAsync();
      }
    })();
  }, []);

  if (db === null) return null;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <QueryClientProvider client={queryClient}>
          <DbContext.Provider value={db}>
            {authenticated ? (
              <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="(tabs)" />
                <Stack.Screen name="add-transaction" options={{ presentation: 'modal' }} />
              </Stack>
            ) : (
              <AuthGate onAuthenticated={() => setAuthenticated(true)} />
            )}
          </DbContext.Provider>
        </QueryClientProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
