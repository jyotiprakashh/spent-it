import * as React from 'react';
export interface SearchBarProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClose?: () => void;
  /** @default 'Search notes or categories' */
  placeholder?: string;
  style?: React.CSSProperties;
}
export declare function SearchBar(props: SearchBarProps): React.JSX.Element;
