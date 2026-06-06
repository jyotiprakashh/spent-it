import React from 'react';
import { Icon } from './Icon';

/**
 * Chip — a pill-shaped filter / selection token. Selected state fills with the
 * primary-subtle wash and switches the label to green. Used in filter rows.
 */
export function Chip({ label, icon, selected = false, onClick, style, ...rest }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        height: 34,
        padding: '0 14px',
        fontFamily: 'var(--font-display)',
        fontSize: 'var(--text-footnote)',
        fontWeight: 'var(--weight-semibold)',
        color: selected ? 'var(--color-primary)' : 'var(--text-secondary)',
        background: selected ? 'var(--color-primary-subtle)' : 'var(--surface-card)',
        border: 'none',
        borderRadius: 'var(--radius-pill)',
        cursor: 'pointer',
        transition: 'background 120ms ease, color 120ms ease',
        ...style,
      }}
      {...rest}
    >
      {icon ? <Icon name={icon} size={15} /> : null}
      {label}
    </button>
  );
}
