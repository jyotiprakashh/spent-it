import type { Account, Budget, Category, ExportPayload, PaymentMethod, Transaction } from '@/types';

import { BaseRepository } from './base-repository';

interface RawAccount {
  id: number;
  name: string;
  type: string;
  icon: string;
  color: string;
  opening_balance: number;
  currency: string;
  is_default: number;
  is_archived: number;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

interface RawCategory {
  id: number;
  name: string;
  icon: string;
  color: string;
  is_income: number;
  is_system: number;
  is_archived: number;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

interface RawPaymentMethod {
  id: number;
  name: string;
  icon: string;
  is_default: number;
}

interface RawTransaction {
  id: number;
  amount: number;
  type: string;
  category_id: number;
  account_id: number;
  payment_method_id: number | null;
  note: string | null;
  date: string;
  time: string;
  currency: string;
  receipt_uri: string | null;
  is_recurring: number;
  recurrence_rule: string | null;
  is_transfer: number;
  transfer_pair_id: number | null;
  created_at: string;
  updated_at: string;
}

interface RawBudget {
  id: number;
  category_id: number | null;
  amount: number;
  period: string;
  year: number;
  month: number | null;
}

interface RawSetting {
  key: string;
  value: string;
}

function toAccount(r: RawAccount): Account {
  return {
    ...r,
    type: r.type as Account['type'],
    is_default: r.is_default === 1,
    is_archived: r.is_archived === 1,
  };
}

function toCategory(r: RawCategory): Category {
  return {
    ...r,
    is_income: r.is_income === 1,
    is_system: r.is_system === 1,
    is_archived: r.is_archived === 1,
  };
}

function toPaymentMethod(r: RawPaymentMethod): PaymentMethod {
  return { ...r, is_default: r.is_default === 1 };
}

function toTransaction(r: RawTransaction): Transaction {
  return {
    ...r,
    type: r.type as Transaction['type'],
    is_recurring: r.is_recurring === 1,
    is_transfer: r.is_transfer === 1,
  };
}

function toBudget(r: RawBudget): Budget {
  return { ...r };
}

export interface RestoreOptions {
  preserveSettings?: boolean;
}

export class BackupRepository extends BaseRepository {
  async dumpPayload(): Promise<ExportPayload> {
    return this.execute(async () => {
      const accountRows = await this.db.getAllAsync<RawAccount>(
        `SELECT * FROM accounts ORDER BY id ASC`,
      );
      const categoryRows = await this.db.getAllAsync<RawCategory>(
        `SELECT * FROM categories ORDER BY id ASC`,
      );
      const paymentMethodRows = await this.db.getAllAsync<RawPaymentMethod>(
        `SELECT * FROM payment_methods ORDER BY id ASC`,
      );
      const transactionRows = await this.db.getAllAsync<RawTransaction>(
        `SELECT * FROM transactions ORDER BY id ASC`,
      );
      const budgetRows = await this.db.getAllAsync<RawBudget>(
        `SELECT * FROM budgets ORDER BY id ASC`,
      );
      const settingRows = await this.db.getAllAsync<RawSetting>(
        `SELECT key, value FROM app_settings`,
      );

      const settings: Record<string, string> = {};
      for (const s of settingRows) settings[s.key] = s.value;

      const currencyRow = settingRows.find((s) => s.key === 'currency');
      return {
        meta: {
          version: '1',
          exported_at: new Date().toISOString(),
          transaction_count: transactionRows.length,
          currency: currencyRow?.value ?? 'INR',
        },
        accounts: accountRows.map(toAccount),
        categories: categoryRows.map(toCategory),
        payment_methods: paymentMethodRows.map(toPaymentMethod),
        transactions: transactionRows.map(toTransaction),
        budgets: budgetRows.map(toBudget),
        settings,
      };
    });
  }

  async restorePayload(payload: ExportPayload, options: RestoreOptions = {}): Promise<void> {
    return this.execute(async () => {
      await this.db.withTransactionAsync(async () => {
        // Children first, parents last (FK order).
        await this.db.runAsync(`DELETE FROM transactions`);
        await this.db.runAsync(`DELETE FROM budgets`);
        await this.db.runAsync(`DELETE FROM payment_methods`);
        await this.db.runAsync(`DELETE FROM categories`);
        await this.db.runAsync(`DELETE FROM accounts`);

        // Parents first, then children.
        for (const a of payload.accounts) {
          await this.db.runAsync(
            `INSERT INTO accounts
               (id, name, type, icon, color, opening_balance, currency,
                is_default, is_archived, sort_order, created_at, updated_at)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
              a.id,
              a.name,
              a.type,
              a.icon,
              a.color,
              a.opening_balance,
              a.currency,
              a.is_default ? 1 : 0,
              a.is_archived ? 1 : 0,
              a.sort_order,
              a.created_at,
              a.updated_at,
            ],
          );
        }

        for (const c of payload.categories) {
          await this.db.runAsync(
            `INSERT INTO categories
               (id, name, icon, color, is_income, is_system, is_archived, sort_order, created_at, updated_at)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
              c.id,
              c.name,
              c.icon,
              c.color,
              c.is_income ? 1 : 0,
              c.is_system ? 1 : 0,
              c.is_archived ? 1 : 0,
              c.sort_order,
              c.created_at,
              c.updated_at,
            ],
          );
        }

        for (const p of payload.payment_methods) {
          await this.db.runAsync(
            `INSERT INTO payment_methods (id, name, icon, is_default) VALUES (?, ?, ?, ?)`,
            [p.id, p.name, p.icon, p.is_default ? 1 : 0],
          );
        }

        for (const b of payload.budgets) {
          await this.db.runAsync(
            `INSERT INTO budgets (id, category_id, amount, period, year, month)
             VALUES (?, ?, ?, ?, ?, ?)`,
            [b.id, b.category_id, b.amount, b.period, b.year, b.month],
          );
        }

        for (const t of payload.transactions) {
          await this.db.runAsync(
            `INSERT INTO transactions
               (id, amount, type, category_id, account_id, payment_method_id, note,
                date, time, currency, receipt_uri, is_recurring, recurrence_rule,
                is_transfer, transfer_pair_id, created_at, updated_at)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
              t.id,
              t.amount,
              t.type,
              t.category_id,
              t.account_id,
              t.payment_method_id,
              t.note,
              t.date,
              t.time,
              t.currency,
              t.receipt_uri,
              t.is_recurring ? 1 : 0,
              t.recurrence_rule,
              t.is_transfer ? 1 : 0,
              t.transfer_pair_id,
              t.created_at,
              t.updated_at,
            ],
          );
        }

        // Settings: upsert. We don't DELETE existing settings so that user
        // preferences (theme, biometric_lock, lock_timeout) survive a restore
        // unless they're explicitly in the payload.
        if (options.preserveSettings !== true) {
          for (const [key, value] of Object.entries(payload.settings)) {
            await this.db.runAsync(
              `INSERT INTO app_settings (key, value) VALUES (?, ?)
               ON CONFLICT(key) DO UPDATE SET value = excluded.value`,
              [key, value],
            );
          }
        }
      });
    });
  }
}
