import * as React from 'react';
export interface TxnRowData {
  category: string;
  /** Category icon name/alias. */
  icon: string;
  /** Category accent color (hex). */
  color?: string;
  note?: string;
  account?: string;
  amount: number;
  type: 'income' | 'expense';
  currency?: string;
}
/**
 * @startingPoint section="Lists" subtitle="Transaction line with category icon + amount" viewport="700x64"
 */
export interface TransactionRowProps {
  tx: TxnRowData;
  onClick?: () => void;
  style?: React.CSSProperties;
}
export declare function TransactionRow(props: TransactionRowProps): React.JSX.Element;
