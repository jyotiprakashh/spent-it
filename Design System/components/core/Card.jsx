import React from 'react';

/**
 * Card — the surface every grouped content block sits on.
 * Flat fill (no shadow), 14px radius, clips its children. Set `padded={false}`
 * when the card hosts full-bleed rows (e.g. a transaction list).
 */
export function Card({ children, padded = true, style, ...rest }) {
  return (
    <div
      style={{
        background: 'var(--surface-card)',
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        padding: padded ? 'var(--space-three)' : 0,
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}
