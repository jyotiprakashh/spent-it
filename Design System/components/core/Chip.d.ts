import * as React from 'react';
export interface ChipProps {
  label: string;
  /** Optional leading icon name. */
  icon?: string;
  /** @default false */
  selected?: boolean;
  onClick?: () => void;
  style?: React.CSSProperties;
}
export declare function Chip(props: ChipProps): React.JSX.Element;
