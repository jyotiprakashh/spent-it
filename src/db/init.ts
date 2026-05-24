import * as SQLite from 'expo-sqlite';

export type DbEncryptionKey = string | null;

// Opens (or creates) the SpentIt database and applies all required PRAGMAs.
// encryptionKey is reserved for S1-09 SQLCipher integration.
export async function openDatabase(
  encryptionKey: DbEncryptionKey = null,
): Promise<SQLite.SQLiteDatabase> {
  const db = await SQLite.openDatabaseAsync('spentit.db');

  // WAL must be set first — CLAUDE.md immutable rule 7
  await db.execAsync('PRAGMA journal_mode = WAL;');
  await db.execAsync('PRAGMA foreign_keys = ON;');
  await db.execAsync('PRAGMA cache_size = -8000;');
  await db.execAsync('PRAGMA synchronous = NORMAL;');

  // SQLCipher key — uncomment in S1-09 when AuthService is wired:
  // if (encryptionKey !== null) {
  //   await db.execAsync(`PRAGMA key = "${encryptionKey}";`);
  // }
  void encryptionKey;

  return db;
}
