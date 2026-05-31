import type { TransactionRepository } from '@/db/repositories/transaction-repository';
import type { BudgetAlertResult, NewTransaction, Transaction } from '@/types';

import type { BudgetAlertService } from './budget-alert-service';
import { ValidationError } from './errors';

export interface SaveTransactionResult {
  id: number;
  alerts: BudgetAlertResult[];
}

export interface UpdateTransactionResult {
  alerts: BudgetAlertResult[];
}

export class TransactionService {
  private readonly repo: TransactionRepository;
  private readonly alerts: BudgetAlertService | null;

  constructor(repo: TransactionRepository, alerts: BudgetAlertService | null = null) {
    this.repo = repo;
    this.alerts = alerts;
  }

  async create(input: NewTransaction): Promise<SaveTransactionResult> {
    if (input.amount <= 0) throw new ValidationError('Amount must be greater than zero', 'amount');
    if (!Number.isFinite(input.amount)) throw new ValidationError('Amount is invalid', 'amount');
    if (input.category_id <= 0) throw new ValidationError('Category is required', 'category_id');
    if (input.account_id <= 0) throw new ValidationError('Account is required', 'account_id');
    const id = await this.repo.create(input);
    const alerts = this.alerts !== null ? await this.alerts.checkAfterTransaction(input) : [];
    return { id, alerts };
  }

  async update(id: number, patch: Partial<NewTransaction>): Promise<UpdateTransactionResult> {
    if (patch.amount !== undefined) {
      if (patch.amount <= 0)
        throw new ValidationError('Amount must be greater than zero', 'amount');
      if (!Number.isFinite(patch.amount)) throw new ValidationError('Amount is invalid', 'amount');
    }
    await this.repo.update(id, patch);
    if (this.alerts !== null) {
      const updated = await this.repo.findById(id);
      if (updated !== null) {
        const alerts = await this.alerts.checkAfterTransaction(updated);
        return { alerts };
      }
    }
    return { alerts: [] };
  }

  async remove(id: number): Promise<void> {
    return this.repo.remove(id);
  }

  async findById(id: number): Promise<Transaction | null> {
    return this.repo.findById(id);
  }
}
