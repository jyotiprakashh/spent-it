import * as React from 'react';
export interface InputProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  /** Optional leading icon name. */
  leadingIcon?: string;
  /** @default 'text' */
  type?: string;
  disabled?: boolean;
  style?: React.CSSProperties;
}
export declare function Input(props: InputProps): React.JSX.Element;
