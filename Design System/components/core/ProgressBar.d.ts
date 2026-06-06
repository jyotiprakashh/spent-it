import * as React from 'react';
export interface ProgressBarProps {
  value?: number;
  /** @default 100 */
  max?: number;
  /** Track height px. @default 8 */
  height?: number;
  /** Override the threshold color. */
  color?: string;
  style?: React.CSSProperties;
}
export declare function ProgressBar(props: ProgressBarProps): React.JSX.Element;
