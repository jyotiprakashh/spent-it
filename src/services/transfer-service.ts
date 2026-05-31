import type { AccountRepository } from '@/db/repositories/account-repository';
import type { CategoryRepository } from '@/db/repositories/category-repository';
import type { TransactionRepository } from '@/db/repositories/transaction-repository';

import { ValidationError } from './errors';

export interface CreateTransferInput {
  fromAccountId: number;
  toAccountId: number;
  amount: number;
  date: string;
  note?: string | null;
  currency?: string;
}

export class TransferService {
  private readonly txns: TransactionRepository;
  private readonly accounts: AccountRepository;
  private readonly categories: CategoryRepository;
  private cachedTransferCategoryId: number | null = null;

  constructor(
    txns: TransactionRepository,
    accounts: AccountRepository,
    categories: CategoryRepository,
  ) {
    this.txns = txns;
    this.accounts = accounts;
    this.categories = categories;
  }

  private async resolveTransferCategoryId(): Promise<number> {
    if (this.cachedTransferCategoryId !== null) return this.cachedTransferCategoryId;
    const id = await this.categories.findSystemCategoryIdByName('Transfer');
    if (id === null) {
      throw new ValidationError('Transfer category is missing (run v002 migration)', 'system');
    }
    this.cachedTransferCategoryId = id;
    return id;
  }

  async create(input: CreateTransferInput): Promise<{ fromId: number; toId: number }> {
    if (!Number.isFinite(input.amount) || input.amount <= 0) {
      throw new ValidationError('Amount must be greater than zero', 'amount');
    }
    if (input.fromAccountId === input.toAccountId) {
      throw new ValidationError('Cannot transfer to the same account', 'toAccountId');
    }
    const from = await this.accounts.getById(input.fromAccountId);
    const to = await this.accounts.getById(input.toAccountId);
    if (from === null) throw new ValidationError('From account not found', 'fromAccountId');
    if (to === null) throw new ValidationError('To account not found', 'toAccountId');
    if (from.is_archived) throw new ValidationError('From account is archived', 'fromAccountId');
    if (to.is_archived) throw new ValidationError('To account is archived', 'toAccountId');

    const transferCategoryId = await this.resolveTransferCategoryId();
    return this.txns.createTransferPair({
      fromAccountId: input.fromAccountId,
      toAccountId: input.toAccountId,
      amount: input.amount,
      date: input.date,
      note: input.note ?? null,
      transferCategoryId,
      currency: input.currency ?? from.currency ?? 'INR',
    });
  }

  async delete(id: number): Promise<void> {
    await this.txns.deleteTransferPair(id);
  }
}
