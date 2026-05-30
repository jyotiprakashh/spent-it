import type { TransactionRepository } from '@/db/repositories/transaction-repository';
import type { NewTransaction, Transaction } from '@/types';

import { ValidationError } from './errors';

export class TransactionService {
  private readonly repo: TransactionRepository;

  constructor(repo: TransactionRepository) {
    this.repo = repo;
  }

  async create(input: NewTransaction): Promise<number> {
    if (input.amount <= 0) throw new ValidationError('Amount must be greater than zero', 'amount');
    if (!Number.isFinite(input.amount)) throw new ValidationError('Amount is invalid', 'amount');
    if (input.category_id <= 0) throw new ValidationError('Category is required', 'category_id');
    if (input.account_id <= 0) throw new ValidationError('Account is required', 'account_id');
    return this.repo.create(input);
  }

  async update(id: number, patch: Partial<NewTransaction>): Promise<void> {
    if (patch.amount !== undefined) {
      if (patch.amount <= 0)
        throw new ValidationError('Amount must be greater than zero', 'amount');
      if (!Number.isFinite(patch.amount)) throw new ValidationError('Amount is invalid', 'amount');
    }
    return this.repo.update(id, patch);
  }

  async remove(id: number): Promise<void> {
    return this.repo.remove(id);
  }

  async findById(id: number): Promise<Transaction | null> {
    return this.repo.findById(id);
  }
}
