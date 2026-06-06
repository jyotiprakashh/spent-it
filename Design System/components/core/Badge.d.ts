import * as React from 'react';
export interface BadgeProps {
  children: React.ReactNode;
  /** @default 'neutral' */
  tone?: 'neutral' | 'primary' | 'income' | 'expense' | 'warning';
  style?: React.CSSProperties;
}
export declare function Badge(props: BadgeProps): React.JSX.Element;
