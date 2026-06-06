import React from 'react';

/**
 * Switch — iOS-style toggle. Off is the neutral track; on fills with the
 * primary green. The thumb slides with the system's soft spring easing.
 */
export function Switch({ checked = false, onChange, disabled = false, style }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onChange && onChange(!checked)}
      style={{
        width: 50,
        height: 30,
        borderRadius: 'var(--radius-pill)',
        border: 'none',
        padding: 2,
        background: checked ? 'var(--color-primary)' : 'var(--line)',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        transition: 'background 180ms ease',
        display: 'flex',
        justifyContent: checked ? 'flex-end' : 'flex-start',
        alignItems: 'center',
        ...style,
      }}
    >
      <span
        style={{
          width: 26,
          height: 26,
          borderRadius: '50%',
          background: '#fff',
          boxShadow: '0 1px 3px rgba(0,0,0,0.25)',
          transition: 'transform 180ms cubic-bezier(0.2,0.8,0.2,1)',
        }}
      />
    </button>
  );
}
