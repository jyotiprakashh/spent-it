import * as SQLite from 'expo-sqlite';
import type { SQLiteDatabase } from 'expo-sqlite';

import { runMigrations } from '@/db/migrations/runner';
import { AccountRepository } from '@/db/repositories/account-repository';
import { BaseRepository, DatabaseError, DB_ERROR_CODES } from '@/db/repositories/base-repository';
import type { NewAccount } from '@/types';

// ---------------------------------------------------------------------------
// Test fixture factory
// ---------------------------------------------------------------------------

/** Minimal valid NewAccount – override individual fields as needed. */
function makeAccount(overrides: Partial<NewAccount> = {}): NewAccount {
  return {
    name: 'Test Account',
    type: 'bank',
    icon: 'card',
    color: '#123456',
    opening_balance: 0,
    currency: 'INR',
    is_default: false,
    is_archived: false,
    sort_order: 99,
    ...overrides,
  };
}

// ---------------------------------------------------------------------------
// Setup / teardown
// ---------------------------------------------------------------------------

let db: SQLiteDatabase;
let repo: AccountRepository;

beforeEach(async () => {
  db = await SQLite.openDatabaseAsync(':memory:');
  await runMigrations(db);
  repo = new AccountRepository(db);
});

afterEach(async () => {
  await db.closeAsync();
});

// ---------------------------------------------------------------------------
// create()
// ---------------------------------------------------------------------------

describe('AccountRepository.create', () => {
  it('returns a positive integer id', async () => {
    // Arrange
    const newAccount = makeAccount({ name: 'My Bank' });

    // Act
    const id = await repo.create(newAccount);

    // Assert
    expect(typeof id).toBe('number');
    expect(id).toBeGreaterThan(0);
  });

  it('throws DatabaseError with SQLITE_CONSTRAINT_UNIQUE on duplicate name', async () => {
    // Arrange
    await repo.create(makeAccount({ name: 'Duplicate' }));

    // Act & Assert
    await expect(repo.create(makeAccount({ name: 'Duplicate' }))).rejects.toThrow(DatabaseError);

    await expect(repo.create(makeAccount({ name: 'Duplicate' }))).rejects.toMatchObject({
      code: DB_ERROR_CODES.CONSTRAINT_UNIQUE,
    });
  });
});

// ---------------------------------------------------------------------------
// getAll()
// ---------------------------------------------------------------------------

describe('AccountRepository.getAll', () => {
  it('returns the seeded Cash Wallet account with current_balance of 0', async () => {
    // Arrange – migrations seed the default account

    // Act
    const accounts = await repo.getAll();

    // Assert
    const cashWallet = accounts.find((a) => a.name === 'Cash Wallet');
    expect(cashWallet).toBeDefined();
    expect(cashWallet?.current_balance).toBe(0);
  });

  it('does not include archived accounts', async () => {
    // Arrange
    const id = await repo.create(makeAccount({ name: 'To Archive' }));
    await repo.archive(id);

    // Act
    const accounts = await repo.getAll();

    // Assert
    const archived = accounts.find((a) => a.name === 'To Archive');
    expect(archived).toBeUndefined();
  });
});

// ---------------------------------------------------------------------------
// getById()
// ---------------------------------------------------------------------------

describe('AccountRepository.getById', () => {
  it('returns the default seeded account for id 1', async () => {
    // Act
    const account = await repo.getById(1);

    // Assert
    expect(account).not.toBeNull();
    expect(account?.name).toBe('Cash Wallet');
    expect(account?.is_default).toBe(true);
  });

  it('returns null for a non-existent id', async () => {
    // Act
    const account = await repo.getById(99);

    // Assert
    expect(account).toBeNull();
  });
});

// ---------------------------------------------------------------------------
// getRunningBalance()
// ---------------------------------------------------------------------------

describe('AccountRepository.getRunningBalance', () => {
  it('returns the opening_balance when the account has no transactions', async () => {
    // Arrange
    const id = await repo.create(makeAccount({ name: 'Empty Account', opening_balance: 500 }));

    // Act
    const balance = await repo.getRunningBalance(id);

    // Assert
    expect(balance).toBe(500);
  });

  it('adds income transactions to the opening balance', async () => {
    // Arrange – seed a category so the FK is satisfied (categories were seeded by migration)
    const id = await repo.create(makeAccount({ name: 'Income Account', opening_balance: 100 }));
    await db.runAsync(
      `INSERT INTO transactions
         (amount, type, category_id, account_id, date, time, currency, is_transfer)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [250, 'income', 1, id, '2025-05-01', '12:00', 'INR', 0],
    );

    // Act
    const balance = await repo.getRunningBalance(id);

    // Assert: 100 opening + 250 income = 350
    expect(balance).toBe(350);
  });

  it('subtracts expense transactions from the opening balance', async () => {
    // Arrange
    const id = await repo.create(makeAccount({ name: 'Expense Account', opening_balance: 1000 }));
    await db.runAsync(
      `INSERT INTO transactions
         (amount, type, category_id, account_id, date, time, currency, is_transfer)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [300, 'expense', 1, id, '2025-05-02', '09:00', 'INR', 0],
    );

    // Act
    const balance = await repo.getRunningBalance(id);

    // Assert: 1000 - 300 = 700
    expect(balance).toBe(700);
  });

  it('ignores transfer transactions (is_transfer = 1)', async () => {
    // Arrange
    const id = await repo.create(makeAccount({ name: 'Transfer Account', opening_balance: 200 }));
    // This income transaction is a transfer – must NOT affect running balance
    await db.runAsync(
      `INSERT INTO transactions
         (amount, type, category_id, account_id, date, time, currency, is_transfer)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [500, 'income', 1, id, '2025-05-03', '10:00', 'INR', 1],
    );

    // Act
    const balance = await repo.getRunningBalance(id);

    // Assert: still 200 – transfer is excluded
    expect(balance).toBe(200);
  });

  it('returns 0 for a non-existent account id', async () => {
    // Act
    const balance = await repo.getRunningBalance(999);

    // Assert
    expect(balance).toBe(0);
  });

  it('correctly combines income and expense transactions', async () => {
    // Arrange
    const id = await repo.create(makeAccount({ name: 'Mixed Account', opening_balance: 0 }));
    await db.runAsync(
      `INSERT INTO transactions
         (amount, type, category_id, account_id, date, time, currency, is_transfer)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [1000, 'income', 1, id, '2025-05-04', '08:00', 'INR', 0],
    );
    await db.runAsync(
      `INSERT INTO transactions
         (amount, type, category_id, account_id, date, time, currency, is_transfer)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [400, 'expense', 1, id, '2025-05-05', '08:00', 'INR', 0],
    );

    // Act
    const balance = await repo.getRunningBalance(id);

    // Assert: 0 + 1000 - 400 = 600
    expect(balance).toBe(600);
  });
});

// ---------------------------------------------------------------------------
// archive()
// ---------------------------------------------------------------------------

describe('AccountRepository.archive', () => {
  it('causes the account to disappear from getAll() but remain accessible via getById()', async () => {
    // Arrange
    const id = await repo.create(makeAccount({ name: 'Archivable' }));
    const beforeArchive = await repo.getAll();
    expect(beforeArchive.find((a) => a.name === 'Archivable')).toBeDefined();

    // Act
    await repo.archive(id);

    // Assert – not in getAll
    const afterArchive = await repo.getAll();
    expect(afterArchive.find((a) => a.name === 'Archivable')).toBeUndefined();

    // Assert – still findable by id
    const byId = await repo.getById(id);
    expect(byId).not.toBeNull();
    expect(byId?.is_archived).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// update()
// ---------------------------------------------------------------------------

describe('AccountRepository.update', () => {
  it('changes a field and the change is reflected in getById()', async () => {
    // Arrange
    const id = await repo.create(makeAccount({ name: 'Before Update', currency: 'INR' }));

    // Act
    await repo.update(id, { name: 'After Update', currency: 'USD' });

    // Assert
    const updated = await repo.getById(id);
    expect(updated?.name).toBe('After Update');
    expect(updated?.currency).toBe('USD');
  });

  it('is a no-op when called with an empty patch object', async () => {
    // Arrange
    const id = await repo.create(makeAccount({ name: 'Unchanged' }));

    // Act – empty patch
    await expect(repo.update(id, {})).resolves.toBeUndefined();

    // Assert – account is unchanged
    const account = await repo.getById(id);
    expect(account?.name).toBe('Unchanged');
  });
});

// ---------------------------------------------------------------------------
// BaseRepository.execute – error translation paths
// ---------------------------------------------------------------------------

// A minimal concrete subclass that lets us trigger any SQL error on demand.
class TestRepository extends BaseRepository {
  async runRaw(sql: string, params: (string | number)[] = []): Promise<void> {
    return this.execute(async () => {
      await this.db.runAsync(sql, params);
    });
  }
}

describe('BaseRepository error translation', () => {
  it('wraps a FOREIGN KEY constraint violation as DatabaseError with SQLITE_CONSTRAINT_FOREIGNKEY code', async () => {
    // Arrange – foreign_keys must be ON (enforced by the migration's PRAGMA)
    await db.execAsync('PRAGMA foreign_keys = ON');
    const testRepo = new TestRepository(db);

    // Act & Assert – insert a transaction referencing a non-existent account_id
    await expect(
      testRepo.runRaw(
        `INSERT INTO transactions
           (amount, type, category_id, account_id, date, time, currency, is_transfer)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [100, 'expense', 1, 9999, '2025-06-01', '08:00', 'INR', 0],
      ),
    ).rejects.toMatchObject({
      code: DB_ERROR_CODES.CONSTRAINT_FK,
    });
  });

  it('wraps an unknown SQL error as DatabaseError with DB_UNKNOWN code', async () => {
    // Arrange
    const testRepo = new TestRepository(db);

    // Act & Assert – reference a table that doesn't exist
    await expect(testRepo.runRaw('SELECT * FROM nonexistent_table')).rejects.toMatchObject({
      code: DB_ERROR_CODES.UNKNOWN,
    });
  });

  it('re-throws an existing DatabaseError unchanged', async () => {
    // Arrange – a subclass that throws a DatabaseError directly inside execute()
    class RethrowRepo extends BaseRepository {
      async triggerAlreadyWrapped(): Promise<void> {
        return this.execute(async () => {
          throw new DatabaseError('already wrapped', DB_ERROR_CODES.BUSY);
        });
      }
    }
    const rethrowRepo = new RethrowRepo(db);

    // Act & Assert
    await expect(rethrowRepo.triggerAlreadyWrapped()).rejects.toMatchObject({
      code: DB_ERROR_CODES.BUSY,
      message: 'already wrapped',
    });
  });
});
