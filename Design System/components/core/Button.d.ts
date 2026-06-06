import * as React from 'react';
/**
 * @startingPoint section="Core" subtitle="Primary / secondary / ghost / danger action" viewport="700x120"
 */
export interface ButtonProps {
  children: React.ReactNode;
  /** @default 'primary' */
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  /** @default 'md' */
  size?: 'sm' | 'md' | 'lg';
  /** Icon name shown before the label. */
  leftIcon?: string;
  /** Icon name shown after the label. */
  rightIcon?: string;
  /** @default false */
  fullWidth?: boolean;
  /** @default false */
  disabled?: boolean;
  onClick?: () => void;
  style?: React.CSSProperties;
}
export declare function Button(props: ButtonProps): React.JSX.Element;
