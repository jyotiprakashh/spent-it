import * as SQLite from 'expo-sqlite';
import type { SQLiteDatabase } from 'expo-sqlite';

import { runMigrations } from '@/db/migrations/runner';
import { BudgetRepository } from '@/db/repositories/budget-repository';

let db: SQLiteDatabase;
let repo: BudgetRepository;

beforeEach(async () => {
  db = await SQLite.openDatabaseAsync(':memory:');
  await runMigrations(db);
  repo = new BudgetRepository(db);
});

afterEach(async () => {
  await db.closeAsync();
});

describe('BudgetRepository.upsert', () => {
  it('inserts a new category budget', async () => {
    await repo.upsert({
      category_id: 1,
      amount: 5000,
      period: 'monthly',
      year: 2026,
      month: 5,
    });
    const found = await repo.getForCategory(1, 2026, 5);
    expect(found?.amount).toBe(5000);
  });

  it('is idempotent — second upsert with same key updates amount', async () => {
    await repo.upsert({
      category_id: 1,
      amount: 5000,
      period: 'monthly',
      year: 2026,
      month: 5,
    });
    await repo.upsert({
      category_id: 1,
      amount: 7000,
      period: 'monthly',
      year: 2026,
      month: 5,
    });
    const found = await repo.getForCategory(1, 2026, 5);
    expect(found?.amount).toBe(7000);

    const all = await repo.getAllForMonth(2026, 5);
    expect(all.filter((b) => b.category_id === 1).length).toBe(1);
  });

  it('treats NULL category_id as a separate total monthly budget', async () => {
    await repo.upsert({
      category_id: null,
      amount: 30000,
      period: 'monthly',
      year: 2026,
      month: 5,
    });
    const totalBudget = await repo.getForCategory(null, 2026, 5);
    expect(totalBudget?.amount).toBe(30000);
    expect(totalBudget?.category_id).toBeNull();
  });

  it('replaces the total budget on second upsert (NULL key)', async () => {
    await repo.upsert({
      category_id: null,
      amount: 30000,
      period: 'monthly',
      year: 2026,
      month: 5,
    });
    await repo.upsert({
      category_id: null,
      amount: 40000,
      period: 'monthly',
      year: 2026,
      month: 5,
    });
    const totalBudget = await repo.getForCategory(null, 2026, 5);
    expect(totalBudget?.amount).toBe(40000);
  });
});

describe('BudgetRepository.getForCategory', () => {
  it('returns null when no budget exists', async () => {
    const result = await repo.getForCategory(1, 2026, 5);
    expect(result).toBeNull();
  });
});

describe('BudgetRepository.getAllForMonth', () => {
  it('returns budgets for the requested month plus total (NULL month) row', async () => {
    await repo.upsert({
      category_id: 1,
      amount: 5000,
      period: 'monthly',
      year: 2026,
      month: 5,
    });
    await repo.upsert({
      category_id: 2,
      amount: 3000,
      period: 'monthly',
      year: 2026,
      month: 5,
    });
    await repo.upsert({
      category_id: null,
      amount: 30000,
      period: 'monthly',
      year: 2026,
      month: 5,
    });
    const all = await repo.getAllForMonth(2026, 5);
    expect(all.length).toBe(3);
    expect(all[0].category_id).toBeNull(); // total first
  });
});

describe('BudgetRepository.deleteForCategory', () => {
  it('removes a category budget', async () => {
    await repo.upsert({
      category_id: 1,
      amount: 5000,
      period: 'monthly',
      year: 2026,
      month: 5,
    });
    await repo.deleteForCategory(1, 2026, 5);
    const after = await repo.getForCategory(1, 2026, 5);
    expect(after).toBeNull();
  });

  it('removes the total budget when category_id is null', async () => {
    await repo.upsert({
      category_id: null,
      amount: 30000,
      period: 'monthly',
      year: 2026,
      month: 5,
    });
    await repo.deleteForCategory(null, 2026, 5);
    const after = await repo.getForCategory(null, 2026, 5);
    expect(after).toBeNull();
  });
});
