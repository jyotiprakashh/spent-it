import * as React from 'react';
export interface MoneyProps {
  value: number;
  /** ISO currency code. @default 'INR' */
  currency?: string;
  /** @default 'default' */
  tone?: 'default' | 'income' | 'expense' | 'muted';
  /** Font size px. @default 16 */
  size?: number;
  /** Font weight. @default 600 */
  weight?: number;
  /** Prepend +/− sign. @default false */
  signed?: boolean;
  style?: React.CSSProperties;
}
export declare function Money(props: MoneyProps): React.JSX.Element;
export declare function formatCurrency(value: number, currency?: string): string;
