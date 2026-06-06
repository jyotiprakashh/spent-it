import * as React from 'react';
export interface IconProps {
  /** Icon name or semantic alias (e.g. 'wallet', 'groceries', 'add'). */
  name: string;
  /** Pixel size of the square glyph. @default 22 */
  size?: number;
  /** Stroke color (any CSS color or token var). @default 'currentColor' */
  color?: string;
  /** Stroke width. @default 2 */
  strokeWidth?: number;
  style?: React.CSSProperties;
}
export declare function Icon(props: IconProps): React.JSX.Element;
export declare const ICON_NAMES: string[];
export declare const ICON_ALIASES: Record<string, string>;
