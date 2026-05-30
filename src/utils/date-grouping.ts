import type { TransactionWithCategory } from '@/types';

export type TxnListItem =
  | { kind: 'header'; date: string; key: string }
  | { kind: 'row'; tx: TransactionWithCategory; key: string };

export function groupTransactionsByDate(rows: TransactionWithCategory[]): TxnListItem[] {
  const out: TxnListItem[] = [];
  let lastDate: string | null = null;
  for (const tx of rows) {
    if (tx.date !== lastDate) {
      out.push({ kind: 'header', date: tx.date, key: `h-${tx.date}` });
      lastDate = tx.date;
    }
    out.push({ kind: 'row', tx, key: `r-${tx.id}` });
  }
  return out;
}
