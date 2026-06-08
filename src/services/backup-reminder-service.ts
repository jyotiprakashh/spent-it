import type { SettingsRepository } from '@/db/repositories/settings-repository';
import { SETTING_KEYS } from '@/services/settings-service';

const REMIND_AFTER_MS = 30 * 24 * 60 * 60 * 1000; // 1 month

export class BackupReminderService {
  private readonly settings: SettingsRepository;

  constructor(settings: SettingsRepository) {
    this.settings = settings;
  }

  async shouldRemind(now: Date = new Date()): Promise<boolean> {
    const raw = await this.settings.get(SETTING_KEYS.lastBackup);
    if (raw === null || raw === '') return true;
    const lastMs = new Date(raw).getTime();
    if (!Number.isFinite(lastMs)) return true;
    return now.getTime() - lastMs > REMIND_AFTER_MS;
  }
}
