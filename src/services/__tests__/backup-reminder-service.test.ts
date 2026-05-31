import * as SQLite from 'expo-sqlite';
import type { SQLiteDatabase } from 'expo-sqlite';

import { runMigrations } from '@/db/migrations/runner';
import { SettingsRepository } from '@/db/repositories/settings-repository';
import { BackupReminderService } from '@/services/backup-reminder-service';

let db: SQLiteDatabase;
let settings: SettingsRepository;
let service: BackupReminderService;

beforeEach(async () => {
  db = await SQLite.openDatabaseAsync(':memory:');
  await runMigrations(db);
  settings = new SettingsRepository(db);
  service = new BackupReminderService(settings);
});

afterEach(async () => {
  await db.closeAsync();
});

const NOW = new Date('2026-05-30T12:00:00Z');

describe('BackupReminderService.shouldRemind', () => {
  it('returns true when last_backup is empty (seeded default)', async () => {
    expect(await service.shouldRemind(NOW)).toBe(true);
  });

  it('returns true when last_backup is unparseable', async () => {
    await settings.set('last_backup', 'not-a-date');
    expect(await service.shouldRemind(NOW)).toBe(true);
  });

  it('returns false at exactly 7 days', async () => {
    const sevenDaysAgo = new Date(NOW.getTime() - 7 * 86_400_000).toISOString();
    await settings.set('last_backup', sevenDaysAgo);
    expect(await service.shouldRemind(NOW)).toBe(false);
  });

  it('returns true at 7 days + 1 second', async () => {
    const justOver = new Date(NOW.getTime() - 7 * 86_400_000 - 1000).toISOString();
    await settings.set('last_backup', justOver);
    expect(await service.shouldRemind(NOW)).toBe(true);
  });

  it('returns false immediately after a backup', async () => {
    await settings.set('last_backup', NOW.toISOString());
    expect(await service.shouldRemind(NOW)).toBe(false);
  });
});
