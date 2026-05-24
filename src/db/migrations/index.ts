// Migration SQL is embedded as TypeScript string constants.
// Metro bundler cannot read raw .sql files at runtime, so this is the
// correct pattern for expo-sqlite projects.

import { V001_SQL } from './V001_SQL';

export interface Migration {
  readonly version: number;
  readonly sql: string;
}

export const MIGRATIONS: readonly Migration[] = [{ version: 1, sql: V001_SQL }];
