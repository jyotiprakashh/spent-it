import * as SQLite from 'expo-sqlite';
import type { SQLiteDatabase } from 'expo-sqlite';

import { runMigrations } from '@/db/migrations/runner';
import { TransactionRepository } from '@/db/repositories/transaction-repository';
import { DatabaseError, DB_ERROR_CODES } from '@/db/repositories/base-repository';
import type { NewTransaction } from '@/types';

const SEED_ACCOUNT_ID = 1; // 'Cash Wallet' from V001 seed
const FOOD_CATEGORY_ID = 1; // 'Food & Dining' from V001 seed
const TRANSPORT_CATEGORY_ID = 2; // 'Transportation'
const SALARY_CATEGORY_ID = 14; // expense rows 1-13 then income 14+

function makeTxn(overrides: Partial<NewTransaction> = {}): NewTransaction {
  return {
    amount: 100,
    type: 'expense',
    category_id: FOOD_CATEGORY_ID,
    account_id: SEED_ACCOUNT_ID,
    payment_method_id: null,
    note: null,
    date: '2026-05-29',
    time: '00:00',
    currency: 'INR',
    receipt_uri: null,
    is_recurring: false,
    recurrence_rule: null,
    is_transfer: false,
    transfer_pair_id: null,
    ...overrides,
  };
}

let db: SQLiteDatabase;
let repo: TransactionRepository;

beforeEach(async () => {
  db = await SQLite.openDatabaseAsync(':memory:');
  await runMigrations(db);
  repo = new TransactionRepository(db);
});

afterEach(async () => {
  await db.closeAsync();
});

describe('TransactionRepository.create', () => {
  it('returns a positive id', async () => {
    const id = await repo.create(makeTxn());
    expect(id).toBeGreaterThan(0);
  });

  it('throws FK error when account_id does not exist', async () => {
    await expect(repo.create(makeTxn({ account_id: 9999 }))).rejects.toBeInstanceOf(DatabaseError);
    await expect(repo.create(makeTxn({ account_id: 9999 }))).rejects.toMatchObject({
      code: DB_ERROR_CODES.CONSTRAINT_FK,
    });
  });

  it('throws FK error when category_id does not exist', async () => {
    await expect(repo.create(makeTxn({ category_id: 9999 }))).rejects.toBeInstanceOf(DatabaseError);
  });

  it('persists optional fields as null', async () => {
    const id = await repo.create(makeTxn({ note: null }));
    const row = await repo.findById(id);
    expect(row?.note).toBeNull();
    expect(row?.payment_method_id).toBeNull();
  });
});

describe('TransactionRepository.findById', () => {
  it('returns the inserted row with coerced booleans', async () => {
    const id = await repo.create(makeTxn({ note: 'Lunch' }));
    const row = await repo.findById(id);
    expect(row).not.toBeNull();
    expect(row?.amount).toBe(100);
    expect(row?.type).toBe('expense');
    expect(row?.note).toBe('Lunch');
    expect(typeof row?.is_transfer).toBe('boolean');
    expect(row?.is_transfer).toBe(false);
  });

  it('returns null for missing id', async () => {
    const row = await repo.findById(9999);
    expect(row).toBeNull();
  });
});

describe('TransactionRepository.update', () => {
  it('updates only the patched fields', async () => {
    const id = await repo.create(makeTxn({ amount: 100, note: 'Old' }));
    await repo.update(id, { amount: 250, note: 'New' });
    const row = await repo.findById(id);
    expect(row?.amount).toBe(250);
    expect(row?.note).toBe('New');
    expect(row?.type).toBe('expense'); // unchanged
  });

  it('is a no-op when patch is empty', async () => {
    const id = await repo.create(makeTxn());
    await expect(repo.update(id, {})).resolves.toBeUndefined();
  });
});

describe('TransactionRepository.remove', () => {
  it('hard-deletes the row', async () => {
    const id = await repo.create(makeTxn());
    await repo.remove(id);
    expect(await repo.findById(id)).toBeNull();
  });
});

describe('TransactionRepository.getPaginated', () => {
  beforeEach(async () => {
    // seed 5 rows across 3 days
    await repo.create(makeTxn({ amount: 10, date: '2026-05-27' }));
    await repo.create(makeTxn({ amount: 20, date: '2026-05-28' }));
    await repo.create(makeTxn({ amount: 30, date: '2026-05-28' }));
    await repo.create(makeTxn({ amount: 40, date: '2026-05-29' }));
    await repo.create(
      makeTxn({
        amount: 5000,
        type: 'income',
        category_id: SALARY_CATEGORY_ID,
        date: '2026-05-29',
      }),
    );
  });

  it('returns rows ordered by date DESC, id DESC', async () => {
    const page = await repo.getPaginated({}, null, 10);
    expect(page.rows).toHaveLength(5);
    expect(page.rows[0].date).toBe('2026-05-29');
    expect(page.rows[0].amount).toBe(5000); // last inserted on that day
    expect(page.rows[4].date).toBe('2026-05-27');
  });

  it('joins category and account data', async () => {
    const page = await repo.getPaginated({}, null, 10);
    expect(page.rows[0].category_name).toBeDefined();
    expect(page.rows[0].account_name).toBe('Cash Wallet');
  });

  it('returns a cursor when more rows exist', async () => {
    const page = await repo.getPaginated({}, null, 2);
    expect(page.rows).toHaveLength(2);
    expect(page.nextCursor).not.toBeNull();
  });

  it('walks all rows via cursor without duplicates', async () => {
    const seen = new Set<number>();
    let cursor = null;
    for (let i = 0; i < 5; i++) {
      const page = await repo.getPaginated({}, cursor, 2);
      for (const r of page.rows) {
        expect(seen.has(r.id)).toBe(false);
        seen.add(r.id);
      }
      if (page.nextCursor === null) break;
      cursor = page.nextCursor;
    }
    expect(seen.size).toBe(5);
  });

  it('filters by type', async () => {
    const page = await repo.getPaginated({ type: 'income' }, null, 10);
    expect(page.rows).toHaveLength(1);
    expect(page.rows[0].amount).toBe(5000);
  });

  it('filters by category_id', async () => {
    const page = await repo.getPaginated({ category_id: SALARY_CATEGORY_ID }, null, 10);
    expect(page.rows).toHaveLength(1);
  });

  it('filters by yearMonth', async () => {
    await repo.create(makeTxn({ amount: 1, date: '2026-04-10' }));
    const page = await repo.getPaginated({ yearMonth: '2026-05' }, null, 10);
    expect(page.rows).toHaveLength(5);
  });

  it('filters by search via note', async () => {
    await repo.create(makeTxn({ note: 'Coffee with friend', date: '2026-05-30' }));
    const page = await repo.getPaginated({ search: 'coffee' }, null, 10);
    expect(page.rows).toHaveLength(1);
  });

  it('filters by search via category name', async () => {
    await repo.create(makeTxn({ category_id: TRANSPORT_CATEGORY_ID, date: '2026-05-30' }));
    const page = await repo.getPaginated({ search: 'Transport' }, null, 10);
    expect(page.rows).toHaveLength(1);
  });

  it('combines account_id and type filters', async () => {
    const page = await repo.getPaginated(
      { account_id: SEED_ACCOUNT_ID, type: 'expense' },
      null,
      10,
    );
    expect(page.rows).toHaveLength(4);
  });

  it('excludes transfer rows from pagination', async () => {
    await repo.create(makeTxn({ is_transfer: true, date: '2026-05-30' }));
    const page = await repo.getPaginated({}, null, 10);
    expect(page.rows.every((r) => r.is_transfer === false)).toBe(true);
  });
});

describe('TransactionRepository.createTransferPair', () => {
  beforeEach(async () => {
    // Create a second account to transfer to.
    await db.runAsync(
      `INSERT INTO accounts (name, type, icon, color, opening_balance, currency, is_default, is_archived, sort_order)
       VALUES ('Bank', 'bank', 'business-outline', '#4A90E2', 0, 'INR', 0, 0, 0)`,
    );
  });

  it('creates two rows with linked transfer_pair_id and opposite types', async () => {
    const transferCategoryId =
      (await db.getFirstAsync<{ id: number }>(`SELECT id FROM categories WHERE name = 'Transfer'`))
        ?.id ?? -1;
    expect(transferCategoryId).toBeGreaterThan(0);

    const { fromId, toId } = await repo.createTransferPair({
      fromAccountId: 1,
      toAccountId: 2,
      amount: 200,
      date: '2026-05-10',
      note: 'gift',
      transferCategoryId,
      currency: 'INR',
    });
    expect(fromId).toBeGreaterThan(0);
    expect(toId).toBeGreaterThan(0);

    const expense = await repo.findById(fromId);
    const income = await repo.findById(toId);
    expect(expense?.type).toBe('expense');
    expect(income?.type).toBe('income');
    expect(expense?.is_transfer).toBe(true);
    expect(income?.is_transfer).toBe(true);
    expect(expense?.transfer_pair_id).toBe(toId);
    expect(income?.transfer_pair_id).toBe(fromId);
    expect(expense?.amount).toBe(200);
    expect(income?.amount).toBe(200);
  });
});

describe('TransactionRepository.deleteTransferPair', () => {
  it('deletes both legs of a transfer atomically', async () => {
    await db.runAsync(
      `INSERT INTO accounts (name, type, icon, color, opening_balance, currency, is_default, is_archived, sort_order)
       VALUES ('Bank', 'bank', 'business-outline', '#4A90E2', 0, 'INR', 0, 0, 0)`,
    );
    const transferCategoryId =
      (await db.getFirstAsync<{ id: number }>(`SELECT id FROM categories WHERE name = 'Transfer'`))
        ?.id ?? -1;
    const { fromId, toId } = await repo.createTransferPair({
      fromAccountId: 1,
      toAccountId: 2,
      amount: 50,
      date: '2026-05-10',
      note: null,
      transferCategoryId,
      currency: 'INR',
    });
    await repo.deleteTransferPair(fromId);
    expect(await repo.findById(fromId)).toBeNull();
    expect(await repo.findById(toId)).toBeNull();
  });
});
