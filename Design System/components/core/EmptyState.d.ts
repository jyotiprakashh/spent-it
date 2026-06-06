import * as React from 'react';
export interface EmptyStateProps {
  /** @default 'receipt' */
  icon?: string;
  title: string;
  subtitle?: string;
  style?: React.CSSProperties;
}
export declare function EmptyState(props: EmptyStateProps): React.JSX.Element;
