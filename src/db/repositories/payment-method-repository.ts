import type { PaymentMethod } from '@/types';

import { BaseRepository } from './base-repository';

interface PaymentMethodRow {
  id: number;
  name: string;
  icon: string;
  is_default: number;
}

function rowToPaymentMethod(row: PaymentMethodRow): PaymentMethod {
  return { ...row, is_default: row.is_default === 1 };
}

export class PaymentMethodRepository extends BaseRepository {
  async getAll(): Promise<PaymentMethod[]> {
    return this.execute(async () => {
      const rows = await this.db.getAllAsync<PaymentMethodRow>(
        `SELECT * FROM payment_methods ORDER BY is_default DESC, name ASC`,
      );
      return rows.map(rowToPaymentMethod);
    });
  }

  async getDefault(): Promise<PaymentMethod | null> {
    return this.execute(async () => {
      const row = await this.db.getFirstAsync<PaymentMethodRow>(
        `SELECT * FROM payment_methods WHERE is_default = 1 LIMIT 1`,
      );
      return row ? rowToPaymentMethod(row) : null;
    });
  }

  async upsert(name: string, icon: string): Promise<void> {
    return this.execute(async () => {
      await this.db.runAsync(
        `INSERT INTO payment_methods (name, icon) VALUES (?, ?)
         ON CONFLICT(name) DO UPDATE SET icon = excluded.icon`,
        [name, icon],
      );
    });
  }
}
