import * as React from 'react';
export interface AccountData {
  name: string;
  balance: number;
  /** Icon name/alias. */
  icon?: string;
  /** Accent color (hex). */
  color?: string;
  currency?: string;
}
export interface AccountCardProps {
  /** Pass null for the "All" rollup card. */
  account: AccountData | null;
  /** Used when account is null. */
  totalNetWorth?: number;
  selected?: boolean;
  onClick?: () => void;
  style?: React.CSSProperties;
}
export declare function AccountCard(props: AccountCardProps): React.JSX.Element;
