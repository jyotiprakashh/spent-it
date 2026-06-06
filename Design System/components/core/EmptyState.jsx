import React from 'react';
import { Icon } from './Icon';

/**
 * EmptyState — the centered placeholder for empty lists and charts. Quiet icon
 * in a neutral circle, a title, and an optional one-line hint.
 */
export function EmptyState({ icon = 'receipt', title, subtitle, style }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 'var(--space-two)',
        padding: 'var(--space-four)',
        textAlign: 'center',
        ...style,
      }}
    >
      <div
        style={{
          width: 'var(--icon-tint-lg)',
          height: 'var(--icon-tint-lg)',
          borderRadius: 'var(--radius-pill)',
          background: 'var(--surface-card)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 'var(--space-two)',
        }}
      >
        <Icon name={icon} size={32} color="var(--text-secondary)" />
      </div>
      <div style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-callout)', fontWeight: 'var(--weight-semibold)', color: 'var(--text-primary)' }}>
        {title}
      </div>
      {subtitle ? (
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-footnote)', color: 'var(--text-secondary)', maxWidth: 260, lineHeight: 1.45 }}>
          {subtitle}
        </div>
      ) : null}
    </div>
  );
}
