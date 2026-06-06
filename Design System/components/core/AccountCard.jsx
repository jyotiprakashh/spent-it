import React from 'react';
import { Icon } from './Icon';
import { Money } from './Money';

/**
 * AccountCard — the horizontally-scrolled balance card on the dashboard.
 * 130px wide; selecting it draws a 2px border in the account's accent color.
 * Pass `account=null` to render the "All" rollup.
 */
export function AccountCard({ account, totalNetWorth = 0, selected = false, onClick, style }) {
  const isAll = account == null;
  const name = isAll ? 'All' : account.name;
  const balance = isAll ? totalNetWorth : account.balance;
  const accent = isAll ? 'var(--color-primary)' : account.color || 'var(--color-primary)';
  const icon = isAll ? 'layout-grid' : account.icon || 'wallet';
  return (
    <div
      onClick={onClick}
      style={{
        width: 130,
        flexShrink: 0,
        padding: 'var(--space-three)',
        borderRadius: 'var(--radius-lg)',
        background: 'var(--surface-card)',
        border: `2px solid ${selected ? accent : 'transparent'}`,
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-one)',
        cursor: onClick ? 'pointer' : 'default',
        transition: 'border-color 140ms ease',
        ...style,
      }}
    >
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 'var(--radius-pill)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: `color-mix(in srgb, ${accent} 13%, transparent)`,
          marginBottom: 'var(--space-one)',
        }}
      >
        <Icon name={icon} size={18} color={accent} />
      </div>
      <span style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-footnote)', fontWeight: 'var(--weight-semibold)', color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
        {name}
      </span>
      <Money value={balance} currency={isAll ? 'INR' : account.currency || 'INR'} tone={balance < 0 ? 'expense' : 'default'} size={13} weight={600} />
    </div>
  );
}
