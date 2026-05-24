/**
 * Manual Jest mock for expo-sqlite.
 *
 * Replaces the React Native native module with a real better-sqlite3 in-process
 * database so tests exercise genuine SQL logic without any device/emulator.
 *
 * Only the async surface used by the repositories is implemented:
 *   openDatabaseAsync, SQLiteDatabase (execAsync, runAsync, getFirstAsync,
 *   getAllAsync, withTransactionAsync, closeAsync)
 */

'use strict';

const BetterSQLite = require('better-sqlite3');

// ---------------------------------------------------------------------------
// Minimal SQLiteDatabase wrapper over better-sqlite3
// ---------------------------------------------------------------------------

class SQLiteDatabase {
  /** @param {import('better-sqlite3').Database} bsDb */
  constructor(bsDb) {
    this._db = bsDb;
  }

  // ---- lifecycle -----------------------------------------------------------

  async closeAsync() {
    this._db.close();
  }

  // ---- multi-statement exec (no params) ------------------------------------

  async execAsync(source) {
    // better-sqlite3 exec() runs all statements in a string
    this._db.exec(source);
  }

  // ---- single-statement helpers -------------------------------------------

  /**
   * Runs an INSERT / UPDATE / DELETE and returns { lastInsertRowId, changes }.
   * Accepts params as a flat array or as the second positional argument.
   */
  async runAsync(source, ...rest) {
    const params = _flattenParams(rest);
    const stmt = this._db.prepare(source);
    const result = stmt.run(...params);
    return {
      lastInsertRowId: result.lastInsertRowid,
      changes: result.changes,
    };
  }

  /** Returns the first matching row or null. */
  async getFirstAsync(source, ...rest) {
    const params = _flattenParams(rest);
    const stmt = this._db.prepare(source);
    return stmt.get(...params) ?? null;
  }

  /** Returns all matching rows. */
  async getAllAsync(source, ...rest) {
    const params = _flattenParams(rest);
    const stmt = this._db.prepare(source);
    return stmt.all(...params);
  }

  // ---- transaction ---------------------------------------------------------

  /**
   * Mimics expo-sqlite's withTransactionAsync: runs `task` inside a
   * BEGIN/COMMIT block; rolls back on error.
   */
  async withTransactionAsync(task) {
    const run = this._db.transaction(async () => {
      await task();
    });
    // better-sqlite3 transactions are sync but our task is async;
    // we need to drive it manually.
    const db = this._db;
    db.exec('BEGIN');
    try {
      await task();
      db.exec('COMMIT');
    } catch (err) {
      try { db.exec('ROLLBACK'); } catch (_) { /* ignore rollback errors */ }
      throw err;
    }
  }
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * expo-sqlite accepts params as:
 *   db.runAsync(sql, [p1, p2])   ← array in first rest slot
 *   db.runAsync(sql, p1, p2)     ← spread values
 *
 * Normalize to a flat array that better-sqlite3 `.run(...params)` can accept.
 */
function _flattenParams(rest) {
  if (rest.length === 0) return [];
  if (rest.length === 1 && Array.isArray(rest[0])) return rest[0];
  return rest;
}

// ---------------------------------------------------------------------------
// Public factory
// ---------------------------------------------------------------------------

/**
 * Opens (or creates) an in-memory or named better-sqlite3 database.
 * `:memory:` is used by all repository / migration tests.
 */
async function openDatabaseAsync(databaseName, _options) {
  const path = databaseName === ':memory:' ? ':memory:' : databaseName;
  const bsDb = new BetterSQLite(path);
  return new SQLiteDatabase(bsDb);
}

module.exports = {
  openDatabaseAsync,
  SQLiteDatabase,
};
