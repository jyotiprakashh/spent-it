import type { SettingsRepository } from '@/db/repositories/settings-repository';
import type { LockTimeoutSeconds, ThemePreference } from '@/types';

export const SETTING_KEYS = {
  currency: 'currency',
  theme: 'theme',
  biometricLock: 'biometric_lock',
  lockTimeoutSeconds: 'lock_timeout_seconds',
  lastBackup: 'last_backup',
  onboardingDone: 'onboarding_done',
} as const;

export const DEFAULTS = {
  currency: 'INR',
  theme: 'system' as ThemePreference,
  biometricEnabled: true,
  lockTimeoutSeconds: 30 as LockTimeoutSeconds,
};

function parseTheme(raw: string | null): ThemePreference {
  if (raw === 'light' || raw === 'dark' || raw === 'system') return raw;
  return DEFAULTS.theme;
}

function parseLockTimeout(raw: string | null): LockTimeoutSeconds {
  if (raw === null) return DEFAULTS.lockTimeoutSeconds;
  const n = parseInt(raw, 10);
  if (n === 15 || n === 30 || n === 60 || n === 300 || n === -1) return n;
  return DEFAULTS.lockTimeoutSeconds;
}

function parseBoolean(raw: string | null, fallback: boolean): boolean {
  if (raw === '1') return true;
  if (raw === '0') return false;
  return fallback;
}

export class SettingsService {
  private readonly repo: SettingsRepository;

  constructor(repo: SettingsRepository) {
    this.repo = repo;
  }

  async getCurrency(): Promise<string> {
    return (await this.repo.get(SETTING_KEYS.currency)) ?? DEFAULTS.currency;
  }

  async setCurrency(value: string): Promise<void> {
    await this.repo.set(SETTING_KEYS.currency, value);
  }

  async getTheme(): Promise<ThemePreference> {
    return parseTheme(await this.repo.get(SETTING_KEYS.theme));
  }

  async setTheme(value: ThemePreference): Promise<void> {
    await this.repo.set(SETTING_KEYS.theme, value);
  }

  async getBiometricEnabled(): Promise<boolean> {
    return parseBoolean(await this.repo.get(SETTING_KEYS.biometricLock), DEFAULTS.biometricEnabled);
  }

  async setBiometricEnabled(value: boolean): Promise<void> {
    await this.repo.set(SETTING_KEYS.biometricLock, value ? '1' : '0');
  }

  async getLockTimeoutSeconds(): Promise<LockTimeoutSeconds> {
    return parseLockTimeout(await this.repo.get(SETTING_KEYS.lockTimeoutSeconds));
  }

  async setLockTimeoutSeconds(value: LockTimeoutSeconds): Promise<void> {
    await this.repo.set(SETTING_KEYS.lockTimeoutSeconds, String(value));
  }
}

export const parseSettingsValue = {
  theme: parseTheme,
  lockTimeout: parseLockTimeout,
  boolean: parseBoolean,
};
