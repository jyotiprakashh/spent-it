import * as SQLite from 'expo-sqlite';
import type { SQLiteDatabase } from 'expo-sqlite';

import { runMigrations } from '@/db/migrations/runner';
import { CategoryRepository } from '@/db/repositories/category-repository';

let db: SQLiteDatabase;
let repo: CategoryRepository;

beforeEach(async () => {
  db = await SQLite.openDatabaseAsync(':memory:');
  await runMigrations(db);
  repo = new CategoryRepository(db);
});

afterEach(async () => {
  await db.closeAsync();
});

describe('CategoryRepository.getAll', () => {
  it('returns all seeded categories', async () => {
    const all = await repo.getAll();
    expect(all.length).toBeGreaterThanOrEqual(15);
  });

  it('coerces booleans', async () => {
    const all = await repo.getAll();
    for (const c of all) {
      expect(typeof c.is_income).toBe('boolean');
      expect(typeof c.is_system).toBe('boolean');
      expect(typeof c.is_archived).toBe('boolean');
    }
  });
});

describe('CategoryRepository.getById', () => {
  it('returns matching category', async () => {
    const c = await repo.getById(1);
    expect(c).not.toBeNull();
    expect(c?.id).toBe(1);
  });

  it('returns null for unknown id', async () => {
    expect(await repo.getById(9999)).toBeNull();
  });
});

describe('CategoryRepository.getActive', () => {
  it('returns only non-archived rows', async () => {
    await db.runAsync(`UPDATE categories SET is_archived = 1 WHERE id = ?`, [1]);
    const active = await repo.getActive();
    expect(active.every((c) => c.is_archived === false)).toBe(true);
    expect(active.find((c) => c.id === 1)).toBeUndefined();
  });

  it('filters expense vs income via type', async () => {
    const expense = await repo.getActive('expense');
    const income = await repo.getActive('income');
    expect(expense.every((c) => c.is_income === false)).toBe(true);
    expect(income.every((c) => c.is_income === true)).toBe(true);
    expect(expense.length).toBeGreaterThan(0);
    expect(income.length).toBeGreaterThan(0);
  });
});
