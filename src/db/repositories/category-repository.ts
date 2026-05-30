import type { Category, TxnType } from '@/types';

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
}
