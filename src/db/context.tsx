import { createContext, useContext } from 'react';

import type { SQLiteDatabase } from 'expo-sqlite';

export const DbContext = createContext<SQLiteDatabase | null>(null);

export function useDb(): SQLiteDatabase {
  const db = useContext(DbContext);
  if (db === null) {
    throw new Error('useDb must be called inside DbContext.Provider');
  }
  return db;
}
