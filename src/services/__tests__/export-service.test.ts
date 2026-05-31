import * as SQLite from 'expo-sqlite';
import type { SQLiteDatabase } from 'expo-sqlite';
import JSZip from 'jszip';

import { runMigrations } from '@/db/migrations/runner';
import { BackupRepository } from '@/db/repositories/backup-repository';
import { SettingsRepository } from '@/db/repositories/settings-repository';
import { ExportService } from '@/services/export-service';
import { ImportService, ImportValidationError } from '@/services/import-service';
import type { SpentItFile } from '@/types';

let db: SQLiteDatabase;
let exportService: ExportService;
let importService: ImportService;

async function seedTwoTransactions(): Promise<void> {
  await db.runAsync(
    `INSERT INTO transactions
       (amount, type, category_id, account_id, payment_method_id, note, date, time, currency, receipt_uri,
        is_recurring, recurrence_rule, is_transfer, transfer_pair_id)
     VALUES (?, 'expense', 1, 1, NULL, ?, '2026-05-10', '00:00', 'INR', NULL, 0, NULL, 0, NULL)`,
    [120, 'lunch'],
  );
  await db.runAsync(
    `INSERT INTO transactions
       (amount, type, category_id, account_id, payment_method_id, note, date, time, currency, receipt_uri,
        is_recurring, recurrence_rule, is_transfer, transfer_pair_id)
     VALUES (?, 'income', 14, 1, NULL, ?, '2026-05-15', '00:00', 'INR', NULL, 0, NULL, 0, NULL)`,
    [5000, 'salary'],
  );
}

beforeEach(async () => {
  db = await SQLite.openDatabaseAsync(':memory:');
  await runMigrations(db);
  const backup = new BackupRepository(db);
  const settings = new SettingsRepository(db);
  exportService = new ExportService(backup, settings);
  importService = new ImportService(backup);
});

afterEach(async () => {
  await db.closeAsync();
});

describe('ExportService.buildPayload', () => {
  it('serialises all rows with transaction_count in meta', async () => {
    await seedTwoTransactions();
    const payload = await exportService.buildPayload();
    expect(payload.meta.transaction_count).toBe(2);
    expect(payload.transactions.length).toBe(2);
  });
});

describe('ExportService.exportJSON', () => {
  it('produces parseable JSON', async () => {
    await seedTwoTransactions();
    const art = await exportService.exportJSON();
    expect(art.filename.endsWith('.json')).toBe(true);
    expect(art.mimeType).toBe('application/json');
    const parsed = JSON.parse(art.data);
    expect(parsed.transactions.length).toBe(2);
  });

  it('updates last_backup setting', async () => {
    await exportService.exportJSON();
    const after = await new SettingsRepository(db).get('last_backup');
    expect(after).not.toBeNull();
    expect(after).not.toBe('');
  });
});

describe('ExportService.exportEncrypted', () => {
  it('produces a valid SpentItFile envelope', async () => {
    const art = await exportService.exportEncrypted('hunter2hunter2');
    expect(art.filename.endsWith('.spentit')).toBe(true);
    const envelope = JSON.parse(art.data) as SpentItFile;
    expect(envelope.v).toBe(1);
    expect(typeof envelope.salt).toBe('string');
    expect(typeof envelope.iv).toBe('string');
    expect(typeof envelope.data).toBe('string');
  });

  it('round-trips through ImportService', async () => {
    await seedTwoTransactions();
    const art = await exportService.exportEncrypted('correct-passphrase');
    // Wipe data, then restore via importEncrypted.
    await db.runAsync(`DELETE FROM transactions`);
    expect(
      (await db.getFirstAsync<{ n: number }>(`SELECT COUNT(*) AS n FROM transactions`))?.n,
    ).toBe(0);
    const restored = await importService.importEncrypted(art.data, 'correct-passphrase');
    expect(restored.transactions.length).toBe(2);
    expect(
      (await db.getFirstAsync<{ n: number }>(`SELECT COUNT(*) AS n FROM transactions`))?.n,
    ).toBe(2);
  });

  it('rejects empty passphrase', async () => {
    await expect(exportService.exportEncrypted('')).rejects.toThrow();
  });
});

describe('ExportService.exportCsvZip', () => {
  it('produces a zip with three CSV entries', async () => {
    await seedTwoTransactions();
    const art = await exportService.exportCsvZip();
    expect(art.filename.endsWith('.zip')).toBe(true);
    expect(art.base64).toBe(true);
    const zip = await JSZip.loadAsync(art.data, { base64: true });
    const names = Object.keys(zip.files).sort();
    expect(names).toContain('transactions.csv');
    expect(names).toContain('accounts.csv');
    expect(names).toContain('categories.csv');
    const txnCsv = await zip.file('transactions.csv')!.async('string');
    // header + 2 rows + trailing CRLF means 3 line-breaks.
    expect(txnCsv.split('\r\n').filter(Boolean).length).toBe(3);
  });
});

describe('ImportService.importEncrypted — failure modes', () => {
  it('throws DECRYPTION_FAILED on wrong passphrase', async () => {
    const art = await exportService.exportEncrypted('correct');
    await expect(importService.importEncrypted(art.data, 'wrong')).rejects.toMatchObject({
      reason: 'DECRYPTION_FAILED',
    });
  });

  it('throws SCHEMA_INVALID on a non-envelope JSON', async () => {
    await expect(importService.importEncrypted('"not an object"', 'x')).rejects.toBeInstanceOf(
      ImportValidationError,
    );
  });

  it('throws UNSUPPORTED_VERSION on future format version', async () => {
    const fake: SpentItFile = { v: 9 as 1, salt: 'AAAA', iv: 'AAAA', data: 'AAAA' };
    await expect(
      importService.importEncrypted(JSON.stringify(fake), 'anything'),
    ).rejects.toMatchObject({ reason: 'UNSUPPORTED_VERSION' });
  });
});

describe('ImportService.importJSON — failure modes', () => {
  it('throws SCHEMA_INVALID on malformed JSON', async () => {
    await expect(importService.importJSON('not json')).rejects.toMatchObject({
      reason: 'SCHEMA_INVALID',
    });
  });

  it('throws SCHEMA_INVALID when meta missing', async () => {
    await expect(importService.importJSON(JSON.stringify({ accounts: [] }))).rejects.toMatchObject({
      reason: 'SCHEMA_INVALID',
    });
  });

  it('throws REFERENTIAL_INTEGRITY when transaction references missing account', async () => {
    const payload = await exportService.buildPayload();
    payload.transactions = [
      {
        id: 1,
        amount: 10,
        type: 'expense',
        category_id: 1,
        account_id: 999,
        payment_method_id: null,
        note: null,
        date: '2026-05-10',
        time: '00:00',
        currency: 'INR',
        receipt_uri: null,
        is_recurring: false,
        recurrence_rule: null,
        is_transfer: false,
        transfer_pair_id: null,
        created_at: '2026-05-10 12:00:00',
        updated_at: '2026-05-10 12:00:00',
      },
    ];
    await expect(importService.importJSON(JSON.stringify(payload))).rejects.toMatchObject({
      reason: 'REFERENTIAL_INTEGRITY',
    });
  });
});
