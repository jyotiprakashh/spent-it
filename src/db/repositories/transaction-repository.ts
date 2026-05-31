import type {
  CategorySpend,
  DailyTrendPoint,
  MonthlyComparisonPoint,
  MonthlySummary,
  NewTransaction,
  Transaction,
  TransactionWithCategory,
  TxnCursor,
  TxnFilters,
  TxnPage,
  YtdPoint,
} from '@/types';

import { BaseRepository } from './base-repository';

interface TransactionRow {
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

interface TransactionJoinRow extends TransactionRow {
  category_name: string;
  category_icon: string;
  category_color: string;
  account_name: string;
  account_color: string;
}

function rowToTransaction(row: TransactionRow): Transaction {
  return {
    ...row,
    type: row.type as Transaction['type'],
    is_recurring: row.is_recurring === 1,
    is_transfer: row.is_transfer === 1,
  };
}

function rowToWithCategory(row: TransactionJoinRow): TransactionWithCategory {
  return {
    ...rowToTransaction(row),
    category_name: row.category_name,
    category_icon: row.category_icon,
    category_color: row.category_color,
    account_name: row.account_name,
    account_color: row.account_color,
  };
}

export class TransactionRepository extends BaseRepository {
  async create(tx: NewTransaction): Promise<number> {
    return this.execute(async () => {
      const result = await this.db.runAsync(
        `INSERT INTO transactions
           (amount, type, category_id, account_id, payment_method_id,
            note, date, time, currency, receipt_uri,
            is_recurring, recurrence_rule, is_transfer, transfer_pair_id)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          tx.amount,
          tx.type,
          tx.category_id,
          tx.account_id,
          tx.payment_method_id,
          tx.note,
          tx.date,
          tx.time,
          tx.currency,
          tx.receipt_uri,
          tx.is_recurring ? 1 : 0,
          tx.recurrence_rule,
          tx.is_transfer ? 1 : 0,
          tx.transfer_pair_id,
        ],
      );
      return result.lastInsertRowId;
    });
  }

  async findById(id: number): Promise<Transaction | null> {
    return this.execute(async () => {
      const row = await this.db.getFirstAsync<TransactionRow>(
        `SELECT * FROM transactions WHERE id = ?`,
        [id],
      );
      return row ? rowToTransaction(row) : null;
    });
  }

  async update(id: number, patch: Partial<NewTransaction>): Promise<void> {
    return this.execute(async () => {
      const fields = Object.keys(patch) as (keyof NewTransaction)[];
      if (fields.length === 0) return;

      const setClauses = fields.map((f) => `${f} = ?`).join(', ');
      const values: (string | number | null)[] = fields.map((f) => {
        const val = patch[f];
        if (typeof val === 'boolean') return val ? 1 : 0;
        if (val === undefined) return null;
        return val as string | number | null;
      });
      values.push(id);

      await this.db.runAsync(
        `UPDATE transactions SET ${setClauses}, updated_at = datetime('now') WHERE id = ?`,
        values,
      );
    });
  }

  async remove(id: number): Promise<void> {
    return this.execute(async () => {
      await this.db.runAsync(`DELETE FROM transactions WHERE id = ?`, [id]);
    });
  }

  async getPaginated(filters: TxnFilters, cursor: TxnCursor, limit: number): Promise<TxnPage> {
    return this.execute(async () => {
      const where: string[] = ['t.is_transfer = 0'];
      const params: (string | number)[] = [];

      if (cursor !== null) {
        where.push('(t.date < ? OR (t.date = ? AND t.id < ?))');
        params.push(cursor.date, cursor.date, cursor.id);
      }
      if (filters.yearMonth !== undefined) {
        where.push('substr(t.date, 1, 7) = ?');
        params.push(filters.yearMonth);
      }
      if (filters.type !== undefined) {
        where.push('t.type = ?');
        params.push(filters.type);
      }
      if (filters.category_id !== undefined) {
        where.push('t.category_id = ?');
        params.push(filters.category_id);
      }
      if (filters.account_id !== undefined) {
        where.push('t.account_id = ?');
        params.push(filters.account_id);
      }
      if (filters.search !== undefined && filters.search.trim() !== '') {
        where.push('(t.note LIKE ? OR c.name LIKE ?)');
        const pat = `%${filters.search.trim()}%`;
        params.push(pat, pat);
      }

      params.push(limit + 1);

      const sql = `
        SELECT
          t.*,
          c.name  AS category_name,
          c.icon  AS category_icon,
          c.color AS category_color,
          a.name  AS account_name,
          a.color AS account_color
        FROM transactions t
        INNER JOIN categories c ON c.id = t.category_id
        INNER JOIN accounts   a ON a.id = t.account_id
        WHERE ${where.join(' AND ')}
        ORDER BY t.date DESC, t.id DESC
        LIMIT ?
      `;

      const rows = await this.db.getAllAsync<TransactionJoinRow>(sql, params);

      let nextCursor: TxnCursor = null;
      if (rows.length > limit) {
        const last = rows[limit - 1];
        nextCursor = { date: last.date, id: last.id };
        rows.length = limit;
      }
      return { rows: rows.map(rowToWithCategory), nextCursor };
    });
  }

  async getMonthlySummary(
    yearMonth: string,
    accountId: number | null = null,
  ): Promise<MonthlySummary> {
    return this.execute(async () => {
      const row = await this.db.getFirstAsync<{ income: number; expense: number }>(
        `SELECT
           COALESCE(SUM(CASE WHEN type = 'income'  THEN amount ELSE 0 END), 0) AS income,
           COALESCE(SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END), 0) AS expense
         FROM transactions
         WHERE is_transfer = 0
           AND substr(date, 1, 7) = ?
           AND (? IS NULL OR account_id = ?)`,
        [yearMonth, accountId, accountId],
      );
      const income = row?.income ?? 0;
      const expense = row?.expense ?? 0;
      return { income, expense, net: income - expense };
    });
  }

  async getSpendingByCategory(
    yearMonth: string,
    accountId: number | null = null,
  ): Promise<CategorySpend[]> {
    return this.execute(async () => {
      const rows = await this.db.getAllAsync<{
        id: number;
        name: string;
        color: string;
        icon: string;
        total: number;
      }>(
        `SELECT c.id, c.name, c.color, c.icon, SUM(t.amount) AS total
         FROM transactions t
         INNER JOIN categories c ON c.id = t.category_id
         WHERE t.is_transfer = 0
           AND t.type = 'expense'
           AND substr(t.date, 1, 7) = ?
           AND (? IS NULL OR t.account_id = ?)
         GROUP BY c.id
         ORDER BY total DESC`,
        [yearMonth, accountId, accountId],
      );
      return rows.map((r) => ({
        category_id: r.id,
        category_name: r.name,
        category_icon: r.icon,
        category_color: r.color,
        total: r.total,
      }));
    });
  }

  async getDailyTrend(
    yearMonth: string,
    accountId: number | null = null,
  ): Promise<DailyTrendPoint[]> {
    return this.execute(async () => {
      return this.db.getAllAsync<DailyTrendPoint>(
        `WITH RECURSIVE days(d) AS (
           SELECT date(? || '-01')
           UNION ALL
           SELECT date(d, '+1 day') FROM days
           WHERE strftime('%Y-%m', date(d, '+1 day')) = ?
         )
         SELECT d AS date, COALESCE(SUM(t.amount), 0) AS total
         FROM days
         LEFT JOIN transactions t
           ON t.date = days.d
           AND t.is_transfer = 0
           AND t.type = 'expense'
           AND (? IS NULL OR t.account_id = ?)
         GROUP BY d
         ORDER BY d ASC`,
        [yearMonth, yearMonth, accountId, accountId],
      );
    });
  }

  async getRecent(
    limit: number,
    accountId: number | null = null,
  ): Promise<TransactionWithCategory[]> {
    return this.execute(async () => {
      const rows = await this.db.getAllAsync<TransactionJoinRow>(
        `SELECT
           t.*,
           c.name  AS category_name,
           c.icon  AS category_icon,
           c.color AS category_color,
           a.name  AS account_name,
           a.color AS account_color
         FROM transactions t
         INNER JOIN categories c ON c.id = t.category_id
         INNER JOIN accounts   a ON a.id = t.account_id
         WHERE t.is_transfer = 0
           AND (? IS NULL OR t.account_id = ?)
         ORDER BY t.date DESC, t.id DESC
         LIMIT ?`,
        [accountId, accountId, limit],
      );
      return rows.map(rowToWithCategory);
    });
  }

  async getMonthlyComparison(
    endYearMonth: string,
    accountId: number | null = null,
  ): Promise<MonthlyComparisonPoint[]> {
    return this.execute(async () => {
      return this.db.getAllAsync<MonthlyComparisonPoint>(
        `WITH RECURSIVE months(ym, n) AS (
           SELECT ?, 1
           UNION ALL
           SELECT strftime('%Y-%m', date(ym || '-01', '-1 month')), n + 1
           FROM months
           WHERE n < 6
         )
         SELECT m.ym AS year_month,
                COALESCE(SUM(CASE WHEN t.type = 'income'  THEN t.amount END), 0) AS income,
                COALESCE(SUM(CASE WHEN t.type = 'expense' THEN t.amount END), 0) AS expense
         FROM months m
         LEFT JOIN transactions t
           ON substr(t.date, 1, 7) = m.ym
           AND t.is_transfer = 0
           AND (? IS NULL OR t.account_id = ?)
         GROUP BY m.ym
         ORDER BY m.ym ASC`,
        [endYearMonth, accountId, accountId],
      );
    });
  }

  async createTransferPair(input: {
    fromAccountId: number;
    toAccountId: number;
    amount: number;
    date: string;
    note: string | null;
    transferCategoryId: number;
    currency: string;
  }): Promise<{ fromId: number; toId: number }> {
    return this.execute(async () => {
      let fromId = 0;
      let toId = 0;
      await this.db.withTransactionAsync(async () => {
        const expense = await this.db.runAsync(
          `INSERT INTO transactions
             (amount, type, category_id, account_id, payment_method_id,
              note, date, time, currency, receipt_uri,
              is_recurring, recurrence_rule, is_transfer, transfer_pair_id)
           VALUES (?, 'expense', ?, ?, NULL, ?, ?, '00:00', ?, NULL, 0, NULL, 1, NULL)`,
          [
            input.amount,
            input.transferCategoryId,
            input.fromAccountId,
            input.note,
            input.date,
            input.currency,
          ],
        );
        fromId = expense.lastInsertRowId;

        const income = await this.db.runAsync(
          `INSERT INTO transactions
             (amount, type, category_id, account_id, payment_method_id,
              note, date, time, currency, receipt_uri,
              is_recurring, recurrence_rule, is_transfer, transfer_pair_id)
           VALUES (?, 'income', ?, ?, NULL, ?, ?, '00:00', ?, NULL, 0, NULL, 1, ?)`,
          [
            input.amount,
            input.transferCategoryId,
            input.toAccountId,
            input.note,
            input.date,
            input.currency,
            fromId,
          ],
        );
        toId = income.lastInsertRowId;

        await this.db.runAsync(`UPDATE transactions SET transfer_pair_id = ? WHERE id = ?`, [
          toId,
          fromId,
        ]);
      });
      return { fromId, toId };
    });
  }

  async deleteTransferPair(id: number): Promise<void> {
    return this.execute(async () => {
      await this.db.withTransactionAsync(async () => {
        const row = await this.db.getFirstAsync<{ transfer_pair_id: number | null }>(
          `SELECT transfer_pair_id FROM transactions WHERE id = ? AND is_transfer = 1`,
          [id],
        );
        if (row === null) return;
        const pairId = row.transfer_pair_id;
        await this.db.runAsync(`DELETE FROM transactions WHERE id = ?`, [id]);
        if (pairId !== null) {
          await this.db.runAsync(`DELETE FROM transactions WHERE id = ?`, [pairId]);
        }
      });
    });
  }

  async getYearToDate(year: number, accountId: number | null = null): Promise<YtdPoint[]> {
    return this.execute(async () => {
      return this.db.getAllAsync<YtdPoint>(
        `WITH RECURSIVE months(n) AS (
           SELECT 1
           UNION ALL SELECT n + 1 FROM months WHERE n < 12
         ),
         monthly AS (
           SELECT n, printf('%04d-%02d', ?, n) AS ym FROM months
         ),
         sums AS (
           SELECT m.n,
                  COALESCE(SUM(CASE WHEN t.type = 'income'  THEN t.amount END), 0) AS income,
                  COALESCE(SUM(CASE WHEN t.type = 'expense' THEN t.amount END), 0) AS expense
           FROM monthly m
           LEFT JOIN transactions t
             ON substr(t.date, 1, 7) = m.ym
             AND t.is_transfer = 0
             AND (? IS NULL OR t.account_id = ?)
           GROUP BY m.n
         )
         SELECT a.n AS month,
                SUM(b.income)  AS cum_income,
                SUM(b.expense) AS cum_expense
         FROM sums a
         JOIN sums b ON b.n <= a.n
         GROUP BY a.n
         ORDER BY a.n ASC`,
        [year, accountId, accountId],
      );
    });
  }
}
