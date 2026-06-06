import * as React from 'react';
import type { ListRowProps } from './ListRow';
export interface SwitchRowProps extends Omit<ListRowProps, 'trailing' | 'showChevron' | 'onClick'> {
  checked: boolean;
  onChange?: (next: boolean) => void;
}
export declare function SwitchRow(props: SwitchRowProps): React.JSX.Element;
