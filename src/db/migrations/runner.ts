import type { SQLiteDatabase } from 'expo-sqlite';

import { MIGRATIONS } from './index';

// Reads current user_version, applies all pending migrations in ascending order.
// Idempotent: calling with no pending migrations is a no-op.
export async function runMigrations(db: SQLiteDatabase): Promise<void> {
  const versionRow = await db.getFirstAsync<{ user_version: number }>('PRAGMA user_version');
  const currentVersion = versionRow?.user_version ?? 0;

  const pending = MIGRATIONS.filter((m) => m.version > currentVersion);
  if (pending.length === 0) return;

  for (const migration of pending) {
    await db.withTransactionAsync(async () => {
      await db.execAsync(migration.sql);
      // PRAGMA user_version cannot use ? binding — this integer comes from the
      // controlled MIGRATIONS array, not user input, so direct interpolation is safe.
      await db.execAsync(`PRAGMA user_version = ${migration.version}`);
    });
  }
}
