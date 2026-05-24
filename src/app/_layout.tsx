import { DarkTheme, DefaultTheme, SplashScreen, ThemeProvider } from 'expo-router';
import type { SQLiteDatabase } from 'expo-sqlite';
import { useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';

import AppTabs from '@/components/app-tabs';
import { AuthGate } from '@/components/auth-gate';
import { openDatabase } from '@/db/init';
import { runMigrations } from '@/db/migrations/runner';
import { DbContext } from '@/db/context';
import { AuthService } from '@/services/auth-service';

SplashScreen.preventAutoHideAsync();

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
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      {authenticated ? (
        <DbContext.Provider value={db}>
          <AppTabs />
        </DbContext.Provider>
      ) : (
        <AuthGate onAuthenticated={() => setAuthenticated(true)} />
      )}
    </ThemeProvider>
  );
}
