import * as React from 'react';
export interface SegmentOption {
  value: string;
  label: string;
  /** Tint the label when selected. */
  tone?: 'income' | 'expense';
}
export interface SegmentedControlProps {
  options: SegmentOption[];
  value: string;
  onChange?: (value: string) => void;
  style?: React.CSSProperties;
}
export declare function SegmentedControl(props: SegmentedControlProps): React.JSX.Element;
