import { BaseRepository } from './base-repository';

interface SettingRow {
  key: string;
  value: string;
}

export class SettingsRepository extends BaseRepository {
  async get(key: string): Promise<string | null> {
    return this.execute(async () => {
      const row = await this.db.getFirstAsync<SettingRow>(
        `SELECT value FROM app_settings WHERE key = ?`,
        [key],
      );
      return row?.value ?? null;
    });
  }

  async set(key: string, value: string): Promise<void> {
    return this.execute(async () => {
      await this.db.runAsync(
        `INSERT INTO app_settings (key, value) VALUES (?, ?)
         ON CONFLICT(key) DO UPDATE SET value = excluded.value`,
        [key, value],
      );
    });
  }

  async getAll(): Promise<Record<string, string>> {
    return this.execute(async () => {
      const rows = await this.db.getAllAsync<SettingRow>(`SELECT key, value FROM app_settings`);
      const out: Record<string, string> = {};
      for (const r of rows) out[r.key] = r.value;
      return out;
    });
  }
}
