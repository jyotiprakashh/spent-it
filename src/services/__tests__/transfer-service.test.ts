import * as SQLite from 'expo-sqlite';
import type { SQLiteDatabase } from 'expo-sqlite';

import { runMigrations } from '@/db/migrations/runner';
import { AccountRepository } from '@/db/repositories/account-repository';
import { CategoryRepository } from '@/db/repositories/category-repository';
import { TransactionRepository } from '@/db/repositories/transaction-repository';
import { ValidationError } from '@/services/errors';
import { TransferService } from '@/services/transfer-service';
import type { NewAccount } from '@/types';

let db: SQLiteDatabase;
let accounts: AccountRepository;
let txns: TransactionRepository;
let categories: CategoryRepository;
let service: TransferService;
let fromId: number;
let toId: number;

function makeAccount(name: string, balance = 1000): NewAccount {
  return {
    name,
    type: 'cash',
    icon: 'wallet-outline',
    color: '#00D09C',
    opening_balance: balance,
    currency: 'INR',
    is_default: false,
    is_archived: false,
    sort_order: 0,
  };
}

beforeEach(async () => {
  db = await SQLite.openDatabaseAsync(':memory:');
  await runMigrations(db);
  accounts = new AccountRepository(db);
  txns = new TransactionRepository(db);
  categories = new CategoryRepository(db);
  service = new TransferService(txns, accounts, categories);
  fromId = await accounts.create(makeAccount('Cash', 1000));
  toId = await accounts.create(makeAccount('Bank', 500));
});

afterEach(async () => {
  await db.closeAsync();
});

describe('TransferService.create', () => {
  it('inserts two linked transactions with opposite types and is_transfer=1', async () => {
    const { fromId: f, toId: t } = await service.create({
      fromAccountId: fromId,
      toAccountId: toId,
      amount: 200,
      date: '2026-05-10',
    });
    expect(f).toBeGreaterThan(0);
    expect(t).toBeGreaterThan(0);

    const expense = await txns.findById(f);
    const income = await txns.findById(t);
    expect(expense?.type).toBe('expense');
    expect(income?.type).toBe('income');
    expect(expense?.is_transfer).toBe(true);
    expect(income?.is_transfer).toBe(true);
    expect(expense?.transfer_pair_id).toBe(t);
    expect(income?.transfer_pair_id).toBe(f);
  });

  it('updates both account balances atomically', async () => {
    await service.create({
      fromAccountId: fromId,
      toAccountId: toId,
      amount: 300,
      date: '2026-05-10',
    });
    const fromBal = await accounts.getRunningBalance(fromId);
    const toBal = await accounts.getRunningBalance(toId);
    expect(fromBal).toBe(1000 - 300);
    expect(toBal).toBe(500 + 300);
  });

  it('rejects amount <= 0', async () => {
    await expect(
      service.create({
        fromAccountId: fromId,
        toAccountId: toId,
        amount: 0,
        date: '2026-05-10',
      }),
    ).rejects.toBeInstanceOf(ValidationError);
  });

  it('rejects same-account transfer', async () => {
    await expect(
      service.create({
        fromAccountId: fromId,
        toAccountId: fromId,
        amount: 100,
        date: '2026-05-10',
      }),
    ).rejects.toBeInstanceOf(ValidationError);
  });

  it('rejects transfer involving an archived account', async () => {
    await accounts.archive(fromId);
    await expect(
      service.create({
        fromAccountId: fromId,
        toAccountId: toId,
        amount: 100,
        date: '2026-05-10',
      }),
    ).rejects.toBeInstanceOf(ValidationError);
  });
});

describe('TransferService.delete', () => {
  it('removes both legs of a transfer pair atomically', async () => {
    const { fromId: f, toId: t } = await service.create({
      fromAccountId: fromId,
      toAccountId: toId,
      amount: 200,
      date: '2026-05-10',
    });
    await service.delete(f);
    expect(await txns.findById(f)).toBeNull();
    expect(await txns.findById(t)).toBeNull();
  });
});
