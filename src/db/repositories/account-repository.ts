import type { Account, AccountWithBalance, NewAccount } from '@/types';

import { BaseRepository } from './base-repository';

// Raw row shape returned by expo-sqlite before boolean coercion
interface AccountRow {
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

interface BalanceRow {
  current_balance: number;
}

function rowToAccount(row: AccountRow): Account {
  return {
    ...row,
    type: row.type as Account['type'],
    is_default: row.is_default === 1,
    is_archived: row.is_archived === 1,
  };
}

export class AccountRepository extends BaseRepository {
  async create(account: NewAccount): Promise<number> {
    return this.execute(async () => {
      const result = await this.db.runAsync(
        `INSERT INTO accounts
           (name, type, icon, color, opening_balance, currency, is_default, is_archived, sort_order)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          account.name,
          account.type,
          account.icon,
          account.color,
          account.opening_balance,
          account.currency,
          account.is_default ? 1 : 0,
          account.is_archived ? 1 : 0,
          account.sort_order,
        ],
      );
      return result.lastInsertRowId;
    });
  }

  async getAll(): Promise<AccountWithBalance[]> {
    return this.execute(async () => {
      const rows = await this.db.getAllAsync<AccountRow & BalanceRow>(
        `SELECT
           a.*,
           a.opening_balance
           + COALESCE(SUM(CASE WHEN t.type = 'income' THEN t.amount ELSE 0 END), 0)
           - COALESCE(SUM(CASE WHEN t.type = 'expense' THEN t.amount ELSE 0 END), 0)
           AS current_balance
         FROM accounts a
         LEFT JOIN transactions t ON t.account_id = a.id AND t.is_transfer = 0
         WHERE a.is_archived = 0
         GROUP BY a.id
         ORDER BY a.sort_order ASC, a.name ASC`,
      );
      return rows.map((row) => ({
        ...rowToAccount(row),
        current_balance: row.current_balance,
      }));
    });
  }

  async getById(id: number): Promise<Account | null> {
    return this.execute(async () => {
      const row = await this.db.getFirstAsync<AccountRow>(`SELECT * FROM accounts WHERE id = ?`, [
        id,
      ]);
      return row ? rowToAccount(row) : null;
    });
  }

  async update(id: number, data: Partial<NewAccount>): Promise<void> {
    return this.execute(async () => {
      const fields = Object.keys(data) as (keyof NewAccount)[];
      if (fields.length === 0) return;

      const setClauses = fields.map((f) => `${f} = ?`).join(', ');
      const values: (string | number)[] = fields.map((f) => {
        const val = data[f];
        if (typeof val === 'boolean') return val ? 1 : 0;
        return val as string | number;
      });
      values.push(id);

      await this.db.runAsync(
        `UPDATE accounts SET ${setClauses}, updated_at = datetime('now') WHERE id = ?`,
        values,
      );
    });
  }

  async archive(id: number): Promise<void> {
    return this.execute(async () => {
      await this.db.runAsync(
        `UPDATE accounts SET is_archived = 1, updated_at = datetime('now') WHERE id = ?`,
        [id],
      );
    });
  }

  async getNetWorth(): Promise<number> {
    return this.execute(async () => {
      const row = await this.db.getFirstAsync<{ net_worth: number }>(
        `SELECT COALESCE(SUM(
           a.opening_balance
           + COALESCE(income.total, 0)
           - COALESCE(expense.total, 0)
         ), 0) AS net_worth
         FROM accounts a
         LEFT JOIN (SELECT account_id, SUM(amount) AS total FROM transactions
                    WHERE type = 'income'  AND is_transfer = 0 GROUP BY account_id) income
                ON income.account_id  = a.id
         LEFT JOIN (SELECT account_id, SUM(amount) AS total FROM transactions
                    WHERE type = 'expense' AND is_transfer = 0 GROUP BY account_id) expense
                ON expense.account_id = a.id
         WHERE a.is_archived = 0`,
      );
      return row?.net_worth ?? 0;
    });
  }

  async getRunningBalance(id: number): Promise<number> {
    return this.execute(async () => {
      const row = await this.db.getFirstAsync<{ current_balance: number }>(
        `SELECT
           a.opening_balance
           + COALESCE(SUM(CASE WHEN t.type = 'income' THEN t.amount ELSE 0 END), 0)
           - COALESCE(SUM(CASE WHEN t.type = 'expense' THEN t.amount ELSE 0 END), 0)
           AS current_balance
         FROM accounts a
         LEFT JOIN transactions t ON t.account_id = a.id AND t.is_transfer = 0
         WHERE a.id = ?
         GROUP BY a.id`,
        [id],
      );
      return row?.current_balance ?? 0;
    });
  }
}
