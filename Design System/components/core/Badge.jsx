import React from 'react';

/**
 * Badge — a small status pill. Tones map to the semantic palette; the default
 * uses the neutral card fill. Use for counts, states, and tiny labels.
 */
export function Badge({ children, tone = 'neutral', style, ...rest }) {
  const tones = {
    neutral: { bg: 'var(--surface-card)', fg: 'var(--text-secondary)' },
    primary: { bg: 'var(--color-primary-subtle)', fg: 'var(--color-primary)' },
    income: { bg: 'var(--green-subtle)', fg: 'var(--income)' },
    expense: { bg: '#fdeaec', fg: 'var(--expense)' },
    warning: { bg: '#fdf3e3', fg: 'var(--warning)' },
  }[tone];
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        height: 22,
        padding: '0 10px',
        fontFamily: 'var(--font-display)',
        fontSize: 'var(--text-caption)',
        fontWeight: 'var(--weight-semibold)',
        color: tones.fg,
        background: tones.bg,
        borderRadius: 'var(--radius-pill)',
        ...style,
      }}
      {...rest}
    >
      {children}
    </span>
  );
}
