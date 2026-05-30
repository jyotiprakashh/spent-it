import * as SQLite from 'expo-sqlite';
import type { SQLiteDatabase } from 'expo-sqlite';

import { runMigrations } from '@/db/migrations/runner';
import { PaymentMethodRepository } from '@/db/repositories/payment-method-repository';

let db: SQLiteDatabase;
let repo: PaymentMethodRepository;

beforeEach(async () => {
  db = await SQLite.openDatabaseAsync(':memory:');
  await runMigrations(db);
  repo = new PaymentMethodRepository(db);
});

afterEach(async () => {
  await db.closeAsync();
});

describe('PaymentMethodRepository.getAll', () => {
  it('returns seeded methods with default first', async () => {
    const all = await repo.getAll();
    expect(all.length).toBeGreaterThanOrEqual(2);
    expect(all[0].is_default).toBe(true);
  });

  it('coerces boolean is_default', async () => {
    const all = await repo.getAll();
    for (const pm of all) expect(typeof pm.is_default).toBe('boolean');
  });
});

describe('PaymentMethodRepository.getDefault', () => {
  it('returns the default payment method', async () => {
    const def = await repo.getDefault();
    expect(def).not.toBeNull();
    expect(def?.is_default).toBe(true);
  });

  it('returns null when no default exists', async () => {
    await db.runAsync(`UPDATE payment_methods SET is_default = 0`);
    expect(await repo.getDefault()).toBeNull();
  });
});

describe('PaymentMethodRepository.upsert', () => {
  it('inserts a new method', async () => {
    await repo.upsert('UPI', 'phone-portrait-outline');
    const all = await repo.getAll();
    expect(all.find((m) => m.name === 'UPI')).toBeDefined();
  });

  it('updates icon when name already exists', async () => {
    await repo.upsert('Cash', 'cash-sharp');
    const all = await repo.getAll();
    expect(all.find((m) => m.name === 'Cash')?.icon).toBe('cash-sharp');
  });
});
