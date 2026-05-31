import * as SQLite from 'expo-sqlite';
import type { SQLiteDatabase } from 'expo-sqlite';

import { runMigrations } from '@/db/migrations/runner';
import { ErrorRepository } from '@/db/repositories/error-repository';

let db: SQLiteDatabase;
let repo: ErrorRepository;

beforeEach(async () => {
  db = await SQLite.openDatabaseAsync(':memory:');
  await runMigrations(db);
  repo = new ErrorRepository(db);
});

afterEach(async () => {
  await db.closeAsync();
});

describe('ErrorRepository.log', () => {
  it('inserts an error row', async () => {
    await repo.log({ message: 'boom', stack: 'at foo', context: 'render' });
    const rows = await repo.getRecent(10);
    expect(rows.length).toBe(1);
    expect(rows[0].message).toBe('boom');
    expect(rows[0].stack).toBe('at foo');
    expect(rows[0].context).toBe('render');
  });

  it('truncates very long messages to 2 KB', async () => {
    const long = 'x'.repeat(5000);
    await repo.log({ message: long });
    const rows = await repo.getRecent(1);
    expect(rows[0].message.length).toBe(2048);
  });

  it('truncates very long stacks to 2 KB', async () => {
    const long = 'y'.repeat(5000);
    await repo.log({ message: 'short', stack: long });
    const rows = await repo.getRecent(1);
    expect(rows[0].stack?.length).toBe(2048);
  });
});

describe('ErrorRepository.getRecent', () => {
  it('returns rows ordered by occurred_at DESC', async () => {
    await repo.log({ message: 'first' });
    await repo.log({ message: 'second' });
    await repo.log({ message: 'third' });
    const rows = await repo.getRecent(10);
    expect(rows.length).toBe(3);
    // Newest first; id is a tiebreaker.
    expect(rows[0].message).toBe('third');
    expect(rows[2].message).toBe('first');
  });

  it('respects the limit', async () => {
    for (let i = 0; i < 5; i++) await repo.log({ message: `e${i}` });
    const rows = await repo.getRecent(3);
    expect(rows.length).toBe(3);
  });
});

describe('ErrorRepository.clear', () => {
  it('removes all rows', async () => {
    await repo.log({ message: 'one' });
    await repo.clear();
    const rows = await repo.getRecent(10);
    expect(rows.length).toBe(0);
  });
});
