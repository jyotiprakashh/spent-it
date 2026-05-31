import * as SQLite from 'expo-sqlite';
import type { SQLiteDatabase } from 'expo-sqlite';

import { runMigrations } from '@/db/migrations/runner';
import { SettingsRepository } from '@/db/repositories/settings-repository';
import { SettingsService } from '@/services/settings-service';

let db: SQLiteDatabase;
let svc: SettingsService;

beforeEach(async () => {
  db = await SQLite.openDatabaseAsync(':memory:');
  await runMigrations(db);
  svc = new SettingsService(new SettingsRepository(db));
});

afterEach(async () => {
  await db.closeAsync();
});

describe('SettingsService.getCurrency', () => {
  it('returns the seeded currency', async () => {
    expect(await svc.getCurrency()).toBe('INR');
  });

  it('returns the override after setCurrency', async () => {
    await svc.setCurrency('USD');
    expect(await svc.getCurrency()).toBe('USD');
  });
});

describe('SettingsService.getTheme', () => {
  it('returns "system" by default', async () => {
    expect(await svc.getTheme()).toBe('system');
  });

  it('round-trips "dark"', async () => {
    await svc.setTheme('dark');
    expect(await svc.getTheme()).toBe('dark');
  });

  it('falls back to default on invalid stored value', async () => {
    await new SettingsRepository(db).set('theme', 'rainbow');
    expect(await svc.getTheme()).toBe('system');
  });
});

describe('SettingsService.getBiometricEnabled', () => {
  it('returns true by default', async () => {
    expect(await svc.getBiometricEnabled()).toBe(true);
  });

  it('round-trips false', async () => {
    await svc.setBiometricEnabled(false);
    expect(await svc.getBiometricEnabled()).toBe(false);
  });
});

describe('SettingsService.getLockTimeoutSeconds', () => {
  it('returns 30 by default', async () => {
    expect(await svc.getLockTimeoutSeconds()).toBe(30);
  });

  it.each([15, 30, 60, 300, -1] as const)('accepts %i', async (value) => {
    await svc.setLockTimeoutSeconds(value);
    expect(await svc.getLockTimeoutSeconds()).toBe(value);
  });

  it('falls back to default on invalid stored value', async () => {
    await new SettingsRepository(db).set('lock_timeout_seconds', '999');
    expect(await svc.getLockTimeoutSeconds()).toBe(30);
  });
});
