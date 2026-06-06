import * as React from 'react';
export interface IconButtonProps {
  /** Icon name. */
  icon: string;
  /** Button box size in px. @default 40 */
  size?: number;
  /** Glyph size in px. @default 20 */
  iconSize?: number;
  /** Glyph color when not tinted. @default 'var(--text-primary)' */
  color?: string;
  /** Fill with primary-subtle wash. @default false */
  tinted?: boolean;
  /** @default 'circle' */
  shape?: 'circle' | 'rounded';
  disabled?: boolean;
  onClick?: () => void;
  'aria-label'?: string;
  style?: React.CSSProperties;
}
export declare function IconButton(props: IconButtonProps): React.JSX.Element;
