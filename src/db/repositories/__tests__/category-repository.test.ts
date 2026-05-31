import * as SQLite from 'expo-sqlite';
import type { SQLiteDatabase } from 'expo-sqlite';

import { runMigrations } from '@/db/migrations/runner';
import { CategoryRepository } from '@/db/repositories/category-repository';
import { OperationNotPermittedError } from '@/services/errors';

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

describe('CategoryRepository.create / update / archive', () => {
  it('creates a user category and returns its id', async () => {
    const id = await repo.create({
      name: 'Coffee',
      icon: 'cafe-outline',
      color: '#AABBCC',
      is_income: false,
      is_system: false,
      is_archived: false,
      sort_order: 0,
    });
    expect(id).toBeGreaterThan(0);
    const back = await repo.getById(id);
    expect(back?.name).toBe('Coffee');
  });

  it('updates a user category', async () => {
    const id = await repo.create({
      name: 'Coffee',
      icon: 'cafe-outline',
      color: '#AABBCC',
      is_income: false,
      is_system: false,
      is_archived: false,
      sort_order: 0,
    });
    await repo.update(id, { name: 'Espresso' });
    const after = await repo.getById(id);
    expect(after?.name).toBe('Espresso');
  });

  it('throws OperationNotPermittedError when updating a system category', async () => {
    const system = (await repo.getAll()).find((c) => c.is_system);
    expect(system).toBeDefined();
    if (system !== undefined) {
      await expect(repo.update(system.id, { name: 'Hacked' })).rejects.toBeInstanceOf(
        OperationNotPermittedError,
      );
    }
  });

  it('archives a user category', async () => {
    const id = await repo.create({
      name: 'Coffee',
      icon: 'cafe-outline',
      color: '#AABBCC',
      is_income: false,
      is_system: false,
      is_archived: false,
      sort_order: 0,
    });
    await repo.archive(id);
    const after = await repo.getById(id);
    expect(after?.is_archived).toBe(true);
    const active = await repo.getActive();
    expect(active.find((c) => c.id === id)).toBeUndefined();
  });

  it('throws OperationNotPermittedError when archiving a system category', async () => {
    const system = (await repo.getAll()).find((c) => c.is_system);
    if (system !== undefined) {
      await expect(repo.archive(system.id)).rejects.toBeInstanceOf(OperationNotPermittedError);
    }
  });
});

describe('CategoryRepository.findSystemCategoryIdByName', () => {
  it('finds the seeded Transfer system category from v002', async () => {
    const id = await repo.findSystemCategoryIdByName('Transfer');
    expect(id).not.toBeNull();
  });

  it('returns null for unknown name', async () => {
    const id = await repo.findSystemCategoryIdByName('Nonexistent');
    expect(id).toBeNull();
  });
});
