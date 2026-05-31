import * as SQLite from 'expo-sqlite';
import type { SQLiteDatabase } from 'expo-sqlite';

import { runMigrations } from '@/db/migrations/runner';
import { AccountRepository } from '@/db/repositories/account-repository';
import { BudgetRepository } from '@/db/repositories/budget-repository';
import { CategoryRepository } from '@/db/repositories/category-repository';
import { TransactionRepository } from '@/db/repositories/transaction-repository';
import { BudgetAlertService } from '@/services/budget-alert-service';
import type { NewTransaction } from '@/types';

let db: SQLiteDatabase;
let txRepo: TransactionRepository;
let budgetRepo: BudgetRepository;
let categoryRepo: CategoryRepository;
let service: BudgetAlertService;

const FOOD_CAT_ID = 1; // first seeded category — expense

function buildTxn(amount: number): NewTransaction {
  return {
    amount,
    type: 'expense',
    category_id: FOOD_CAT_ID,
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
  };
}

async function seedExpense(amount: number): Promise<void> {
  await txRepo.create(buildTxn(amount));
}

async function makeServiceWithBudget(amount: number): Promise<void> {
  await budgetRepo.upsert({
    category_id: FOOD_CAT_ID,
    amount,
    period: 'monthly',
    year: 2026,
    month: 5,
  });
}

beforeEach(async () => {
  db = await SQLite.openDatabaseAsync(':memory:');
  await runMigrations(db);
  txRepo = new TransactionRepository(db);
  budgetRepo = new BudgetRepository(db);
  categoryRepo = new CategoryRepository(db);
  new AccountRepository(db); // ensures default account is seeded
  service = new BudgetAlertService(budgetRepo, txRepo, categoryRepo);
});

afterEach(async () => {
  await db.closeAsync();
});

describe('BudgetAlertService.checkAfterTransaction', () => {
  it('returns no alerts when budget unset', async () => {
    const alerts = await service.checkAfterTransaction(buildTxn(500));
    expect(alerts).toEqual([]);
  });

  it('returns no alerts at 0% of budget', async () => {
    await makeServiceWithBudget(1000);
    const alerts = await service.checkAfterTransaction(buildTxn(0.0001));
    expect(alerts).toEqual([]);
  });

  it('returns OK when below 80%', async () => {
    await makeServiceWithBudget(1000);
    await seedExpense(700);
    const alerts = await service.checkAfterTransaction(buildTxn(700));
    expect(alerts).toEqual([]);
  });

  it('returns WARNING at exactly 80%', async () => {
    await makeServiceWithBudget(1000);
    await seedExpense(800);
    const alerts = await service.checkAfterTransaction(buildTxn(800));
    expect(alerts.length).toBe(1);
    expect(alerts[0].level).toBe('WARNING');
  });

  it('returns WARNING at 99%', async () => {
    await makeServiceWithBudget(1000);
    await seedExpense(990);
    const alerts = await service.checkAfterTransaction(buildTxn(990));
    expect(alerts[0].level).toBe('WARNING');
  });

  it('returns EXCEEDED at 100%', async () => {
    await makeServiceWithBudget(1000);
    await seedExpense(1000);
    const alerts = await service.checkAfterTransaction(buildTxn(1000));
    expect(alerts[0].level).toBe('EXCEEDED');
  });

  it('returns EXCEEDED at 101%', async () => {
    await makeServiceWithBudget(1000);
    await seedExpense(1010);
    const alerts = await service.checkAfterTransaction(buildTxn(1010));
    expect(alerts[0].level).toBe('EXCEEDED');
  });

  it('skips income transactions', async () => {
    await makeServiceWithBudget(1000);
    await seedExpense(2000);
    const incomeTx: NewTransaction = { ...buildTxn(500), type: 'income' };
    const alerts = await service.checkAfterTransaction(incomeTx);
    expect(alerts).toEqual([]);
  });

  it('also checks total monthly budget', async () => {
    await budgetRepo.upsert({
      category_id: null,
      amount: 1000,
      period: 'monthly',
      year: 2026,
      month: 5,
    });
    await seedExpense(900);
    const alerts = await service.checkAfterTransaction(buildTxn(900));
    expect(alerts.length).toBeGreaterThanOrEqual(1);
    expect(alerts.find((a) => a.category_id === null)?.level).toBe('WARNING');
  });
});
