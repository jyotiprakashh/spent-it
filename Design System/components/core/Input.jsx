import React from 'react';
import { Icon } from './Icon';

/**
 * Input — single-line text field on the neutral card fill, optional leading icon.
 * Focus lifts the border to the primary green. Pair with a label above it.
 */
export function Input({
  value,
  onChange,
  placeholder,
  leadingIcon,
  type = 'text',
  disabled = false,
  style,
  ...rest
}) {
  const [focused, setFocused] = React.useState(false);
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--space-two)',
        height: 48,
        padding: '0 var(--space-three)',
        background: 'var(--surface-card)',
        border: `1.5px solid ${focused ? 'var(--color-primary)' : 'transparent'}`,
        borderRadius: 'var(--radius-md)',
        opacity: disabled ? 0.5 : 1,
        transition: 'border-color 120ms ease',
        ...style,
      }}
    >
      {leadingIcon ? <Icon name={leadingIcon} size={18} color="var(--text-secondary)" /> : null}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          flex: 1,
          border: 'none',
          outline: 'none',
          background: 'transparent',
          fontFamily: 'var(--font-display)',
          fontSize: 'var(--text-body)',
          color: 'var(--text-primary)',
          minWidth: 0,
        }}
        {...rest}
      />
    </div>
  );
}
