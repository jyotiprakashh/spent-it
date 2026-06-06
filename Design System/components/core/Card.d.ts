import * as React from 'react';
export interface CardProps {
  children: React.ReactNode;
  /** Apply 16px padding. Set false for full-bleed row lists. @default true */
  padded?: boolean;
  style?: React.CSSProperties;
}
export declare function Card(props: CardProps): React.JSX.Element;
