import { OperationNotPermittedError } from '@/services/errors';
import type { Category, NewCategory, TxnType } from '@/types';

import { BaseRepository } from './base-repository';

interface CategoryRow {
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

function rowToCategory(row: CategoryRow): Category {
  return {
    ...row,
    is_income: row.is_income === 1,
    is_system: row.is_system === 1,
    is_archived: row.is_archived === 1,
  };
}

export class CategoryRepository extends BaseRepository {
  async getAll(): Promise<Category[]> {
    return this.execute(async () => {
      const rows = await this.db.getAllAsync<CategoryRow>(
        `SELECT * FROM categories ORDER BY sort_order ASC, name ASC`,
      );
      return rows.map(rowToCategory);
    });
  }

  async getById(id: number): Promise<Category | null> {
    return this.execute(async () => {
      const row = await this.db.getFirstAsync<CategoryRow>(
        `SELECT * FROM categories WHERE id = ?`,
        [id],
      );
      return row ? rowToCategory(row) : null;
    });
  }

  async getActive(type?: TxnType): Promise<Category[]> {
    return this.execute(async () => {
      if (type === undefined) {
        const rows = await this.db.getAllAsync<CategoryRow>(
          `SELECT * FROM categories WHERE is_archived = 0 ORDER BY sort_order ASC, name ASC`,
        );
        return rows.map(rowToCategory);
      }
      const isIncome = type === 'income' ? 1 : 0;
      const rows = await this.db.getAllAsync<CategoryRow>(
        `SELECT * FROM categories
         WHERE is_archived = 0 AND is_income = ?
         ORDER BY sort_order ASC, name ASC`,
        [isIncome],
      );
      return rows.map(rowToCategory);
    });
  }

  async findSystemCategoryIdByName(name: string): Promise<number | null> {
    return this.execute(async () => {
      const row = await this.db.getFirstAsync<{ id: number }>(
        `SELECT id FROM categories WHERE name = ? AND is_system = 1 LIMIT 1`,
        [name],
      );
      return row?.id ?? null;
    });
  }

  async create(category: NewCategory): Promise<number> {
    return this.execute(async () => {
      const result = await this.db.runAsync(
        `INSERT INTO categories
           (name, icon, color, is_income, is_system, is_archived, sort_order)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
          category.name,
          category.icon,
          category.color,
          category.is_income ? 1 : 0,
          category.is_system ? 1 : 0,
          category.is_archived ? 1 : 0,
          category.sort_order,
        ],
      );
      return result.lastInsertRowId;
    });
  }

  async update(id: number, patch: Partial<NewCategory>): Promise<void> {
    return this.execute(async () => {
      const existing = await this.db.getFirstAsync<CategoryRow>(
        `SELECT * FROM categories WHERE id = ?`,
        [id],
      );
      if (existing === null) return;
      if (existing.is_system === 1) {
        throw new OperationNotPermittedError('System categories cannot be edited');
      }
      const fields = Object.keys(patch) as (keyof NewCategory)[];
      if (fields.length === 0) return;

      const setClauses = fields.map((f) => `${f} = ?`).join(', ');
      const values: (string | number)[] = fields.map((f) => {
        const val = patch[f];
        if (typeof val === 'boolean') return val ? 1 : 0;
        return val as string | number;
      });
      values.push(id);

      await this.db.runAsync(
        `UPDATE categories SET ${setClauses}, updated_at = datetime('now') WHERE id = ?`,
        values,
      );
    });
  }

  async archive(id: number): Promise<void> {
    return this.execute(async () => {
      const existing = await this.db.getFirstAsync<CategoryRow>(
        `SELECT * FROM categories WHERE id = ?`,
        [id],
      );
      if (existing === null) return;
      if (existing.is_system === 1) {
        throw new OperationNotPermittedError('System categories cannot be archived');
      }
      await this.db.runAsync(
        `UPDATE categories SET is_archived = 1, updated_at = datetime('now') WHERE id = ?`,
        [id],
      );
    });
  }
}
