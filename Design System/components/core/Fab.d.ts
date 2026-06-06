import * as React from 'react';
export interface FabProps {
  /** @default 'add' */
  icon?: string;
  onClick?: () => void;
  'aria-label'?: string;
  style?: React.CSSProperties;
}
export declare function Fab(props: FabProps): React.JSX.Element;
