import * as React from 'react';
/**
 * @startingPoint section="Lists" subtitle="Settings/list row with tinted icon" viewport="700x80"
 */
export interface ListRowProps {
  title: string;
  subtitle?: string;
  /** Tinted leading icon name. */
  leadingIcon?: string;
  /** Accent color for the icon + tint. @default 'var(--color-primary)' */
  leadingIconColor?: string;
  trailingText?: string;
  /** Custom trailing node (overrides trailingText). */
  trailing?: React.ReactNode;
  /** @default true */
  showChevron?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  style?: React.CSSProperties;
}
export declare function ListRow(props: ListRowProps): React.JSX.Element;
