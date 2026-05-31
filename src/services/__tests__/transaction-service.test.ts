import { TransactionRepository } from '@/db/repositories/transaction-repository';
import { ValidationError } from '@/services/errors';
import { TransactionService } from '@/services/transaction-service';
import type { NewTransaction } from '@/types';

function makeTxn(overrides: Partial<NewTransaction> = {}): NewTransaction {
  return {
    amount: 100,
    type: 'expense',
    category_id: 1,
    account_id: 1,
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

function makeRepoMock(): jest.Mocked<TransactionRepository> {
  return {
    create: jest.fn().mockResolvedValue(42),
    update: jest.fn().mockResolvedValue(undefined),
    remove: jest.fn().mockResolvedValue(undefined),
    findById: jest.fn().mockResolvedValue(null),
  } as unknown as jest.Mocked<TransactionRepository>;
}

describe('TransactionService.create', () => {
  it('delegates to repo when input valid', async () => {
    const repo = makeRepoMock();
    const svc = new TransactionService(repo);
    const result = await svc.create(makeTxn());
    expect(result.id).toBe(42);
    expect(result.alerts).toEqual([]);
    expect(repo.create).toHaveBeenCalledTimes(1);
  });

  it('throws ValidationError when amount is zero', async () => {
    const svc = new TransactionService(makeRepoMock());
    await expect(svc.create(makeTxn({ amount: 0 }))).rejects.toBeInstanceOf(ValidationError);
  });

  it('throws ValidationError when amount is negative', async () => {
    const svc = new TransactionService(makeRepoMock());
    await expect(svc.create(makeTxn({ amount: -1 }))).rejects.toBeInstanceOf(ValidationError);
  });

  it('throws ValidationError when amount is NaN', async () => {
    const svc = new TransactionService(makeRepoMock());
    await expect(svc.create(makeTxn({ amount: NaN }))).rejects.toBeInstanceOf(ValidationError);
  });

  it('throws ValidationError when category_id missing', async () => {
    const svc = new TransactionService(makeRepoMock());
    await expect(svc.create(makeTxn({ category_id: 0 }))).rejects.toBeInstanceOf(ValidationError);
  });

  it('throws ValidationError when account_id missing', async () => {
    const svc = new TransactionService(makeRepoMock());
    await expect(svc.create(makeTxn({ account_id: 0 }))).rejects.toBeInstanceOf(ValidationError);
  });
});

describe('TransactionService.update', () => {
  it('delegates to repo when patch valid', async () => {
    const repo = makeRepoMock();
    const svc = new TransactionService(repo);
    await svc.update(1, { amount: 200 });
    expect(repo.update).toHaveBeenCalledWith(1, { amount: 200 });
  });

  it('rejects negative amount patch', async () => {
    const svc = new TransactionService(makeRepoMock());
    await expect(svc.update(1, { amount: -5 })).rejects.toBeInstanceOf(ValidationError);
  });

  it('allows patches without amount', async () => {
    const repo = makeRepoMock();
    const svc = new TransactionService(repo);
    await svc.update(1, { note: 'updated' });
    expect(repo.update).toHaveBeenCalledTimes(1);
  });
});

describe('TransactionService.remove', () => {
  it('delegates to repo', async () => {
    const repo = makeRepoMock();
    const svc = new TransactionService(repo);
    await svc.remove(42);
    expect(repo.remove).toHaveBeenCalledWith(42);
  });
});
