import * as SQLite from 'expo-sqlite';
import type { SQLiteDatabase } from 'expo-sqlite';

import { runMigrations } from '@/db/migrations/runner';
import { SettingsRepository } from '@/db/repositories/settings-repository';

let db: SQLiteDatabase;
let repo: SettingsRepository;

beforeEach(async () => {
  db = await SQLite.openDatabaseAsync(':memory:');
  await runMigrations(db);
  repo = new SettingsRepository(db);
});

afterEach(async () => {
  await db.closeAsync();
});

describe('SettingsRepository.get', () => {
  it('returns the seeded currency', async () => {
    expect(await repo.get('currency')).toBe('INR');
  });

  it('returns null when key missing', async () => {
    expect(await repo.get('does_not_exist')).toBeNull();
  });
});

describe('SettingsRepository.set', () => {
  it('inserts a new key/value', async () => {
    await repo.set('last_account_id', '7');
    expect(await repo.get('last_account_id')).toBe('7');
  });

  it('overwrites existing value (upsert)', async () => {
    await repo.set('currency', 'USD');
    expect(await repo.get('currency')).toBe('USD');
  });
});

describe('SettingsRepository.getAll', () => {
  it('returns a key-value map of all settings', async () => {
    const all = await repo.getAll();
    expect(all['currency']).toBe('INR');
    expect(all['theme']).toBe('system');
    expect(Object.keys(all).length).toBeGreaterThanOrEqual(6);
  });
});
