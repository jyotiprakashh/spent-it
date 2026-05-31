import type { Budget, NewBudget } from '@/types';

import { BaseRepository } from './base-repository';

interface BudgetRow {
  id: number;
  category_id: number | null;
  amount: number;
  period: string;
  year: number;
  month: number | null;
}

function rowToBudget(row: BudgetRow): Budget {
  return { ...row };
}

export class BudgetRepository extends BaseRepository {
  async upsert(b: NewBudget): Promise<void> {
    return this.execute(async () => {
      // SQLite's ON CONFLICT with UNIQUE(category_id, year, month) handles the
      // (category_id IS NULL, year, month) case correctly since NULL is treated
      // as a distinct value in UNIQUE constraints — but here only one row may
      // exist for (NULL, year, month) so we manually short-circuit.
      if (b.category_id === null) {
        const existing = await this.db.getFirstAsync<{ id: number }>(
          `SELECT id FROM budgets WHERE category_id IS NULL AND year = ? AND month IS ?`,
          [b.year, b.month],
        );
        if (existing !== null) {
          await this.db.runAsync(`UPDATE budgets SET amount = ?, period = ? WHERE id = ?`, [
            b.amount,
            b.period,
            existing.id,
          ]);
          return;
        }
        await this.db.runAsync(
          `INSERT INTO budgets (category_id, amount, period, year, month) VALUES (NULL, ?, ?, ?, ?)`,
          [b.amount, b.period, b.year, b.month],
        );
        return;
      }
      await this.db.runAsync(
        `INSERT INTO budgets (category_id, amount, period, year, month)
         VALUES (?, ?, ?, ?, ?)
         ON CONFLICT(category_id, year, month)
         DO UPDATE SET amount = excluded.amount, period = excluded.period`,
        [b.category_id, b.amount, b.period, b.year, b.month],
      );
    });
  }

  async getForCategory(
    categoryId: number | null,
    year: number,
    month: number | null,
  ): Promise<Budget | null> {
    return this.execute(async () => {
      const monthClause = month === null ? 'month IS NULL' : 'month = ?';
      const categoryClause = categoryId === null ? 'category_id IS NULL' : 'category_id = ?';
      const params: (string | number)[] = [];
      if (categoryId !== null) params.push(categoryId);
      params.push(year);
      if (month !== null) params.push(month);

      const row = await this.db.getFirstAsync<BudgetRow>(
        `SELECT * FROM budgets WHERE ${categoryClause} AND year = ? AND ${monthClause}`,
        params,
      );
      return row ? rowToBudget(row) : null;
    });
  }

  async getAllForMonth(year: number, month: number): Promise<Budget[]> {
    return this.execute(async () => {
      const rows = await this.db.getAllAsync<BudgetRow>(
        `SELECT * FROM budgets WHERE year = ? AND (month = ? OR month IS NULL)
         ORDER BY category_id IS NULL DESC, category_id ASC`,
        [year, month],
      );
      return rows.map(rowToBudget);
    });
  }

  async deleteForCategory(
    categoryId: number | null,
    year: number,
    month: number | null,
  ): Promise<void> {
    return this.execute(async () => {
      const monthClause = month === null ? 'month IS NULL' : 'month = ?';
      const categoryClause = categoryId === null ? 'category_id IS NULL' : 'category_id = ?';
      const params: (string | number)[] = [];
      if (categoryId !== null) params.push(categoryId);
      params.push(year);
      if (month !== null) params.push(month);

      await this.db.runAsync(
        `DELETE FROM budgets WHERE ${categoryClause} AND year = ? AND ${monthClause}`,
        params,
      );
    });
  }
}
