import React from 'react';

/**
 * ProgressBar — budget consumption track. Fill color shifts with thresholds:
 * green under 80%, amber 80–99%, red at/over 100%. Rounded, 8px tall.
 */
export function ProgressBar({ value = 0, max = 100, height = 8, color, style }) {
  const pct = max > 0 ? Math.min(100, (value / max) * 100) : 0;
  const ratio = max > 0 ? value / max : 0;
  const fill = color || (ratio >= 1 ? 'var(--expense)' : ratio >= 0.8 ? 'var(--warning)' : 'var(--color-primary)');
  return (
    <div
      style={{
        width: '100%',
        height,
        background: 'var(--line)',
        borderRadius: 'var(--radius-pill)',
        overflow: 'hidden',
        ...style,
      }}
    >
      <div
        style={{
          width: `${pct}%`,
          height: '100%',
          background: fill,
          borderRadius: 'var(--radius-pill)',
          transition: 'width 320ms cubic-bezier(0.2,0.8,0.2,1)',
        }}
      />
    </div>
  );
}
