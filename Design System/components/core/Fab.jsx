import React from 'react';
import { Icon } from './Icon';

/**
 * Fab — the floating add button. 56px green circle, the only element in the
 * system that carries a drop shadow. Shrinks on press.
 */
export function Fab({ icon = 'add', onClick, 'aria-label': ariaLabel = 'Add', style }) {
  const [pressed, setPressed] = React.useState(false);
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      onClick={onClick}
      onPointerDown={() => setPressed(true)}
      onPointerUp={() => setPressed(false)}
      onPointerLeave={() => setPressed(false)}
      style={{
        width: 'var(--control-fab)',
        height: 'var(--control-fab)',
        borderRadius: 'var(--radius-pill)',
        background: 'var(--color-primary)',
        color: 'var(--text-on-primary)',
        border: 'none',
        boxShadow: 'var(--shadow-fab)',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        transform: pressed ? 'scale(0.92)' : 'scale(1)',
        transition: 'transform 140ms cubic-bezier(0.2,0.8,0.2,1)',
        ...style,
      }}
    >
      <Icon name={icon} size={28} strokeWidth={2.4} />
    </button>
  );
}
