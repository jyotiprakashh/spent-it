import type { BackupRepository } from '@/db/repositories/backup-repository';
import { FORMAT_VERSION, KEY_LENGTH_BYTES, PBKDF2_ITERATIONS } from '@/constants/backup';
import { aesGcmDecrypt, bytesToUtf8, fromBase64, pbkdf2, zeroize } from '@/utils/crypto';
import type { ExportPayload, ImportErrorReason, SpentItFile } from '@/types';

export class ImportValidationError extends Error {
  public readonly reason: ImportErrorReason;
  constructor(reason: ImportErrorReason, message?: string) {
    super(message ?? reason);
    this.name = 'ImportValidationError';
    this.reason = reason;
  }
}

function isObject(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null;
}

function validatePayloadShape(value: unknown): ExportPayload {
  if (!isObject(value)) throw new ImportValidationError('SCHEMA_INVALID', 'Not an object');
  const meta = value.meta;
  if (!isObject(meta)) throw new ImportValidationError('SCHEMA_INVALID', 'Missing meta');
  if (typeof meta.version !== 'string' || meta.version.length === 0) {
    throw new ImportValidationError('SCHEMA_INVALID', 'Missing meta.version');
  }
  const versionNum = parseInt(meta.version, 10);
  if (!Number.isFinite(versionNum)) {
    throw new ImportValidationError('SCHEMA_INVALID', 'Invalid meta.version');
  }
  if (versionNum > FORMAT_VERSION) {
    throw new ImportValidationError(
      'UNSUPPORTED_VERSION',
      `Backup version ${versionNum} is newer than this app supports`,
    );
  }
  for (const key of [
    'accounts',
    'categories',
    'payment_methods',
    'transactions',
    'budgets',
  ] as const) {
    if (!Array.isArray(value[key])) {
      throw new ImportValidationError('SCHEMA_INVALID', `${key} is not an array`);
    }
  }
  if (!isObject(value.settings)) {
    throw new ImportValidationError('SCHEMA_INVALID', 'settings is not an object');
  }
  return value as unknown as ExportPayload;
}

function validateReferentialIntegrity(payload: ExportPayload): void {
  const accountIds = new Set(payload.accounts.map((a) => a.id));
  const categoryIds = new Set(payload.categories.map((c) => c.id));
  for (const t of payload.transactions) {
    if (!accountIds.has(t.account_id)) {
      throw new ImportValidationError(
        'REFERENTIAL_INTEGRITY',
        `Transaction ${t.id} references missing account ${t.account_id}`,
      );
    }
    if (!categoryIds.has(t.category_id)) {
      throw new ImportValidationError(
        'REFERENTIAL_INTEGRITY',
        `Transaction ${t.id} references missing category ${t.category_id}`,
      );
    }
  }
  for (const b of payload.budgets) {
    if (b.category_id !== null && !categoryIds.has(b.category_id)) {
      throw new ImportValidationError(
        'REFERENTIAL_INTEGRITY',
        `Budget ${b.id} references missing category ${b.category_id}`,
      );
    }
  }
}

export class ImportService {
  private readonly backup: BackupRepository;

  constructor(backup: BackupRepository) {
    this.backup = backup;
  }

  validatePayload(payload: unknown): ExportPayload {
    const shaped = validatePayloadShape(payload);
    validateReferentialIntegrity(shaped);
    return shaped;
  }

  async importJSON(rawJson: string): Promise<ExportPayload> {
    let parsed: unknown;
    try {
      parsed = JSON.parse(rawJson);
    } catch {
      throw new ImportValidationError('SCHEMA_INVALID', 'File is not valid JSON');
    }
    const payload = this.validatePayload(parsed);
    try {
      await this.backup.restorePayload(payload);
    } catch (err) {
      throw new ImportValidationError(
        'DB_WRITE_FAILED',
        err instanceof Error ? err.message : 'Database write failed',
      );
    }
    return payload;
  }

  async importEncrypted(rawJson: string, passphrase: string): Promise<ExportPayload> {
    if (passphrase.length === 0) {
      throw new ImportValidationError('DECRYPTION_FAILED', 'Passphrase required');
    }
    let envelope: SpentItFile;
    try {
      envelope = JSON.parse(rawJson) as SpentItFile;
    } catch {
      throw new ImportValidationError('SCHEMA_INVALID', 'File is not a SpentIt backup');
    }
    if (envelope === null || typeof envelope !== 'object') {
      throw new ImportValidationError('SCHEMA_INVALID', 'File is not a SpentIt backup');
    }
    if (envelope.v !== FORMAT_VERSION) {
      if (typeof envelope.v === 'number' && envelope.v > FORMAT_VERSION) {
        throw new ImportValidationError('UNSUPPORTED_VERSION');
      }
      throw new ImportValidationError('SCHEMA_INVALID', 'Unknown file version');
    }
    if (
      typeof envelope.salt !== 'string' ||
      typeof envelope.iv !== 'string' ||
      typeof envelope.data !== 'string'
    ) {
      throw new ImportValidationError('SCHEMA_INVALID', 'Backup envelope is malformed');
    }

    const salt = fromBase64(envelope.salt);
    const iv = fromBase64(envelope.iv);
    const cipher = fromBase64(envelope.data);
    const key = pbkdf2(passphrase, salt, PBKDF2_ITERATIONS, KEY_LENGTH_BYTES);
    let json: string;
    try {
      const plaintext = aesGcmDecrypt(key, iv, cipher);
      json = bytesToUtf8(plaintext);
    } catch {
      throw new ImportValidationError('DECRYPTION_FAILED', 'Could not decrypt file');
    } finally {
      zeroize(key);
    }

    let parsed: unknown;
    try {
      parsed = JSON.parse(json);
    } catch {
      throw new ImportValidationError('SCHEMA_INVALID', 'Decrypted payload is not JSON');
    }
    const payload = this.validatePayload(parsed);
    try {
      await this.backup.restorePayload(payload);
    } catch (err) {
      throw new ImportValidationError(
        'DB_WRITE_FAILED',
        err instanceof Error ? err.message : 'Database write failed',
      );
    }
    return payload;
  }
}
