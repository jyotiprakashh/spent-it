import type { AccountErrorRow, NewAppError } from '@/types';

import { BaseRepository } from './base-repository';

const MAX_FIELD_BYTES = 2048;

function truncate(value: string | null | undefined): string | null {
  if (value === null || value === undefined) return null;
  if (value.length <= MAX_FIELD_BYTES) return value;
  return value.slice(0, MAX_FIELD_BYTES);
}

export class ErrorRepository extends BaseRepository {
  async log(entry: NewAppError): Promise<void> {
    return this.execute(async () => {
      await this.db.runAsync(`INSERT INTO app_errors (message, stack, context) VALUES (?, ?, ?)`, [
        truncate(entry.message) ?? '',
        truncate(entry.stack ?? null),
        truncate(entry.context ?? null),
      ]);
    });
  }

  async getRecent(limit: number): Promise<AccountErrorRow[]> {
    return this.execute(async () => {
      return this.db.getAllAsync<AccountErrorRow>(
        `SELECT id, message, stack, context, occurred_at
         FROM app_errors
         ORDER BY occurred_at DESC, id DESC
         LIMIT ?`,
        [limit],
      );
    });
  }

  async clear(): Promise<void> {
    return this.execute(async () => {
      await this.db.runAsync(`DELETE FROM app_errors`);
    });
  }
}
