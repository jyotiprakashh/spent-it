import { Switch } from 'react-native';

import { ListRow, type ListRowProps } from './list-row';

export type SwitchRowProps = Omit<ListRowProps, 'trailing' | 'showChevron' | 'onPress'> & {
  value: boolean;
  onValueChange: (value: boolean) => void;
};

export function SwitchRow({ value, onValueChange, ...rest }: SwitchRowProps): React.JSX.Element {
  return (
    <ListRow
      {...rest}
      showChevron={false}
      trailing={<Switch value={value} onValueChange={onValueChange} />}
    />
  );
}
