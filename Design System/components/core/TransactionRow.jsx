import React from 'react';
import { Icon } from './Icon';
import { Money } from './Money';

/**
 * TransactionRow — one line in any transaction list. Category glyph in a tinted
 * circle, category name over a note/account subtitle, and the signed amount.
 * 60px tall, full-bleed (lives inside a non-padded Card).
 */
export function TransactionRow({ tx, onClick, style }) {
  const [pressed, setPressed] = React.useState(false);
  const isIncome = tx.type === 'income';
  const signed = isIncome ? tx.amount : -tx.amount;
  const subtitle = tx.note && tx.note.trim() !== '' ? tx.note : tx.account;
  const color = tx.color || 'var(--text-secondary)';
  return (
    <div
      onClick={onClick}
      onPointerDown={() => setPressed(true)}
      onPointerUp={() => setPressed(false)}
      onPointerLeave={() => setPressed(false)}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--space-three)',
        height: 60,
        padding: '0 var(--space-three)',
        background: pressed ? 'var(--surface-accent)' : 'var(--surface-raised)',
        cursor: onClick ? 'pointer' : 'default',
        transition: 'background 120ms ease',
        ...style,
      }}
    >
      <div
        style={{
          width: 'var(--icon-tint-md)',
          height: 'var(--icon-tint-md)',
          borderRadius: 'var(--radius-pill)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: `color-mix(in srgb, ${color} 13%, transparent)`,
          flexShrink: 0,
        }}
      >
        <Icon name={tx.icon} size={20} color={color} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-body)', fontWeight: 'var(--weight-semibold)', color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {tx.category}
        </div>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-footnote)', color: 'var(--text-secondary)', marginTop: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {subtitle}
        </div>
      </div>
      <Money value={signed} currency={tx.currency || 'INR'} tone={isIncome ? 'income' : 'expense'} size={15} signed />
    </div>
  );
}
