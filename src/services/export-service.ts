import JSZip from 'jszip';

import type { BackupRepository } from '@/db/repositories/backup-repository';
import type { SettingsRepository } from '@/db/repositories/settings-repository';
import {
  FORMAT_VERSION,
  IV_LENGTH_BYTES,
  KEY_LENGTH_BYTES,
  PBKDF2_ITERATIONS,
  SALT_LENGTH_BYTES,
} from '@/constants/backup';
import { aesGcmEncrypt, pbkdf2, randomBytes, toBase64, utf8ToBytes, zeroize } from '@/utils/crypto';
import { toCsv } from '@/utils/csv';
import { SETTING_KEYS } from '@/services/settings-service';
import type { ExportPayload, SpentItFile } from '@/types';

export interface ExportArtifact {
  data: string; // ready-to-write file content (UTF-8 for spentit/json, base64 for zip)
  base64: boolean;
  filename: string;
  mimeType: string;
}

function stamp(): string {
  const d = new Date();
  const y = d.getUTCFullYear();
  const m = String(d.getUTCMonth() + 1).padStart(2, '0');
  const day = String(d.getUTCDate()).padStart(2, '0');
  return `${y}${m}${day}`;
}

export class ExportService {
  private readonly backup: BackupRepository;
  private readonly settings: SettingsRepository;

  constructor(backup: BackupRepository, settings: SettingsRepository) {
    this.backup = backup;
    this.settings = settings;
  }

  async buildPayload(): Promise<ExportPayload> {
    return this.backup.dumpPayload();
  }

  async exportEncrypted(passphrase: string): Promise<ExportArtifact> {
    if (passphrase.length === 0) throw new Error('Passphrase is required');
    const payload = await this.buildPayload();
    const json = JSON.stringify(payload);

    const salt = await randomBytes(SALT_LENGTH_BYTES);
    const iv = await randomBytes(IV_LENGTH_BYTES);
    const key = pbkdf2(passphrase, salt, PBKDF2_ITERATIONS, KEY_LENGTH_BYTES);
    try {
      const cipher = aesGcmEncrypt(key, iv, utf8ToBytes(json));
      const file: SpentItFile = {
        v: FORMAT_VERSION,
        salt: toBase64(salt),
        iv: toBase64(iv),
        data: toBase64(cipher),
      };
      await this.markBackup();
      return {
        data: JSON.stringify(file),
        base64: false,
        filename: `spentit-${stamp()}.spentit`,
        mimeType: 'application/octet-stream',
      };
    } finally {
      zeroize(key);
    }
  }

  async exportJSON(): Promise<ExportArtifact> {
    const payload = await this.buildPayload();
    await this.markBackup();
    return {
      data: JSON.stringify(payload, null, 2),
      base64: false,
      filename: `spentit-${stamp()}.json`,
      mimeType: 'application/json',
    };
  }

  async exportCsvZip(): Promise<ExportArtifact> {
    const payload = await this.buildPayload();
    const zip = new JSZip();
    zip.file(
      'transactions.csv',
      toCsv(
        payload.transactions.map((t) => ({
          id: t.id,
          date: t.date,
          time: t.time,
          type: t.type,
          amount: t.amount,
          currency: t.currency,
          account_id: t.account_id,
          category_id: t.category_id,
          payment_method_id: t.payment_method_id ?? '',
          note: t.note ?? '',
          is_transfer: t.is_transfer ? 1 : 0,
          transfer_pair_id: t.transfer_pair_id ?? '',
        })),
        [
          'id',
          'date',
          'time',
          'type',
          'amount',
          'currency',
          'account_id',
          'category_id',
          'payment_method_id',
          'note',
          'is_transfer',
          'transfer_pair_id',
        ],
      ),
    );
    zip.file(
      'accounts.csv',
      toCsv(payload.accounts as unknown as Record<string, unknown>[], [
        'id',
        'name',
        'type',
        'icon',
        'color',
        'opening_balance',
        'currency',
        'is_default',
        'is_archived',
        'sort_order',
      ]),
    );
    zip.file(
      'categories.csv',
      toCsv(payload.categories as unknown as Record<string, unknown>[], [
        'id',
        'name',
        'icon',
        'color',
        'is_income',
        'is_system',
        'is_archived',
        'sort_order',
      ]),
    );
    const base64 = await zip.generateAsync({ type: 'base64' });
    await this.markBackup();
    return {
      data: base64,
      base64: true,
      filename: `spentit-csv-${stamp()}.zip`,
      mimeType: 'application/zip',
    };
  }

  private async markBackup(): Promise<void> {
    await this.settings.set(SETTING_KEYS.lastBackup, new Date().toISOString());
  }
}
