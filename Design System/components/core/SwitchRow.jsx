import React from 'react';
import { ListRow } from './ListRow';
import { Switch } from './Switch';

/**
 * SwitchRow — a ListRow whose trailing slot is a Switch. The whole row is
 * informational; only the switch toggles. Used for Biometric lock, etc.
 */
export function SwitchRow({ checked, onChange, ...rest }) {
  return (
    <ListRow
      {...rest}
      showChevron={false}
      trailing={<Switch checked={checked} onChange={onChange} />}
    />
  );
}
