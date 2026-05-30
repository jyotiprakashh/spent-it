import type { TransactionWithCategory } from '@/types';
import { groupTransactionsByDate } from '@/utils/date-grouping';

function makeTxn(id: number, date: string): TransactionWithCategory {
  return {
    id,
    amount: 1,
    type: 'expense',
    category_id: 1,
    account_id: 1,
    payment_method_id: null,
    note: null,
    date,
    time: '00:00',
    currency: 'INR',
    receipt_uri: null,
    is_recurring: false,
    recurrence_rule: null,
    is_transfer: false,
    transfer_pair_id: null,
    created_at: '',
    updated_at: '',
    category_name: 'Food',
    category_icon: 'restaurant-outline',
    category_color: '#FF0000',
    account_name: 'Cash',
    account_color: '#000000',
  };
}

describe('groupTransactionsByDate', () => {
  it('returns empty list for no rows', () => {
    expect(groupTransactionsByDate([])).toEqual([]);
  });

  it('inserts a header before each distinct date', () => {
    const items = groupTransactionsByDate([
      makeTxn(1, '2026-05-29'),
      makeTxn(2, '2026-05-29'),
      makeTxn(3, '2026-05-28'),
    ]);
    expect(items.map((i) => i.kind)).toEqual(['header', 'row', 'row', 'header', 'row']);
  });

  it('preserves transaction order within a date', () => {
    const items = groupTransactionsByDate([makeTxn(1, '2026-05-29'), makeTxn(2, '2026-05-29')]);
    const rows = items.filter((i) => i.kind === 'row');
    expect(rows.map((r) => (r.kind === 'row' ? r.tx.id : -1))).toEqual([1, 2]);
  });

  it('emits unique keys', () => {
    const items = groupTransactionsByDate([makeTxn(1, '2026-05-29'), makeTxn(2, '2026-05-28')]);
    const keys = new Set(items.map((i) => i.key));
    expect(keys.size).toBe(items.length);
  });
});
