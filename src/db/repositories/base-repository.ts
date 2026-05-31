import type { SQLiteDatabase } from 'expo-sqlite';

import { OperationNotPermittedError, ValidationError } from '@/services/errors';

export class DatabaseError extends Error {
  public readonly code: string;

  constructor(message: string, code: string) {
    super(message);
    this.name = 'DatabaseError';
    this.code = code;
  }
}

export const DB_ERROR_CODES = {
  CONSTRAINT_UNIQUE: 'SQLITE_CONSTRAINT_UNIQUE',
  CONSTRAINT_FK: 'SQLITE_CONSTRAINT_FOREIGNKEY',
  BUSY: 'SQLITE_BUSY',
  UNKNOWN: 'DB_UNKNOWN',
} as const;

export type DbErrorCode = (typeof DB_ERROR_CODES)[keyof typeof DB_ERROR_CODES];

function translateError(err: unknown): Error {
  if (err instanceof DatabaseError) return err;
  if (err instanceof OperationNotPermittedError) return err;
  if (err instanceof ValidationError) return err;

  const message = err instanceof Error ? err.message : String(err);

  if (message.includes('UNIQUE constraint failed')) {
    return new DatabaseError(message, DB_ERROR_CODES.CONSTRAINT_UNIQUE);
  }
  if (message.includes('FOREIGN KEY constraint failed')) {
    return new DatabaseError(message, DB_ERROR_CODES.CONSTRAINT_FK);
  }
  if (message.includes('database is locked') || message.includes('SQLITE_BUSY')) {
    return new DatabaseError(message, DB_ERROR_CODES.BUSY);
  }
  return new DatabaseError(message, DB_ERROR_CODES.UNKNOWN);
}

export abstract class BaseRepository {
  protected readonly db: SQLiteDatabase;

  constructor(db: SQLiteDatabase) {
    this.db = db;
  }

  protected async execute<T>(operation: () => Promise<T>): Promise<T> {
    try {
      return await operation();
    } catch (err) {
      throw translateError(err);
    }
  }
}
