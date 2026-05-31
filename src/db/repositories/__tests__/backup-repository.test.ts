import * as SQLite from 'expo-sqlite';
import type { SQLiteDatabase } from 'expo-sqlite';

import { runMigrations } from '@/db/migrations/runner';
import { BackupRepository } from '@/db/repositories/backup-repository';

let db: SQLiteDatabase;
let repo: BackupRepository;

beforeEach(async () => {
  db = await SQLite.openDatabaseAsync(':memory:');
  await runMigrations(db);
  repo = new BackupRepository(db);
});

afterEach(async () => {
  await db.closeAsync();
});

describe('BackupRepository.dumpPayload', () => {
  it('returns seeded counts after a fresh migration', async () => {
    const payload = await repo.dumpPayload();
    expect(payload.accounts.length).toBeGreaterThanOrEqual(1);
    expect(payload.categories.length).toBe(16); // 15 v001 + Transfer v002
    expect(payload.transactions.length).toBe(0);
    expect(payload.meta.version).toBe('1');
    expect(payload.meta.transaction_count).toBe(0);
  });

  it('coerces SQL integer booleans into TS booleans', async () => {
    const payload = await repo.dumpPayload();
    for (const a of payload.accounts) {
      expect(typeof a.is_default).toBe('boolean');
      expect(typeof a.is_archived).toBe('boolean');
    }
    for (const c of payload.categories) {
      expect(typeof c.is_income).toBe('boolean');
      expect(typeof c.is_system).toBe('boolean');
    }
  });

  it('includes settings map with the seeded currency key', async () => {
    const payload = await repo.dumpPayload();
    expect(payload.settings.currency).toBe('INR');
  });
});

describe('BackupRepository.restorePayload', () => {
  it('round-trips: dump → restore yields the same payload', async () => {
    // Seed a transaction so there's something to round-trip.
    await db.runAsync(
      `INSERT INTO transactions
         (amount, type, category_id, account_id, payment_method_id, note,
          date, time, currency, receipt_uri, is_recurring, recurrence_rule,
          is_transfer, transfer_pair_id)
       VALUES (250, 'expense', 1, 1, NULL, 'lunch', '2026-05-10', '12:00', 'INR',
               NULL, 0, NULL, 0, NULL)`,
    );
    const original = await repo.dumpPayload();
    await repo.restorePayload(original);
    const back = await repo.dumpPayload();
    expect(back.transactions.length).toBe(original.transactions.length);
    expect(back.accounts.length).toBe(original.accounts.length);
    expect(back.categories.length).toBe(original.categories.length);
  });

  it('replaces existing data — new payload wins', async () => {
    // Seed an account in the live DB.
    await db.runAsync(
      `INSERT INTO accounts (name, type, icon, color, opening_balance, currency, is_default, is_archived, sort_order)
       VALUES ('Pre-Existing', 'cash', 'wallet', '#000', 0, 'INR', 0, 0, 0)`,
    );
    expect((await db.getFirstAsync<{ n: number }>(`SELECT COUNT(*) AS n FROM accounts`))?.n).toBe(
      2,
    );

    // Build a minimal payload that only knows about a single replacement account.
    const restorePayload = await repo.dumpPayload();
    restorePayload.accounts = [
      {
        id: 99,
        name: 'Restored Only',
        type: 'bank',
        icon: 'business-outline',
        color: '#4A90E2',
        opening_balance: 500,
        currency: 'INR',
        is_default: true,
        is_archived: false,
        sort_order: 0,
        created_at: '2026-01-01 00:00:00',
        updated_at: '2026-01-01 00:00:00',
      },
    ];
    restorePayload.transactions = [];
    restorePayload.budgets = [];

    await repo.restorePayload(restorePayload);

    const after = await db.getAllAsync<{ name: string }>(`SELECT name FROM accounts`);
    expect(after.length).toBe(1);
    expect(after[0].name).toBe('Restored Only');
  });

  it('rolls back when an insert fails mid-restore', async () => {
    // Seed something to verify it survives a failed restore.
    await db.runAsync(
      `INSERT INTO accounts (name, type, icon, color, opening_balance, currency, is_default, is_archived, sort_order)
       VALUES ('Survives', 'cash', 'wallet', '#000', 0, 'INR', 0, 0, 0)`,
    );

    const payload = await repo.dumpPayload();
    // Force a CHECK violation: amount must be > 0.
    payload.transactions = [
      {
        id: 1,
        amount: 0,
        type: 'expense',
        category_id: 1,
        account_id: 1,
        payment_method_id: null,
        note: null,
        date: '2026-05-10',
        time: '00:00',
        currency: 'INR',
        receipt_uri: null,
        is_recurring: false,
        recurrence_rule: null,
        is_transfer: false,
        transfer_pair_id: null,
        created_at: '2026-05-10 12:00:00',
        updated_at: '2026-05-10 12:00:00',
      },
    ];

    await expect(repo.restorePayload(payload)).rejects.toBeDefined();

    // Pre-restore state should be intact.
    const names = await db.getAllAsync<{ name: string }>(`SELECT name FROM accounts ORDER BY id`);
    expect(names.some((n) => n.name === 'Survives')).toBe(true);
  });
});
