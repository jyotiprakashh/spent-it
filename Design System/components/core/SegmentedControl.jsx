import React from 'react';

/**
 * SegmentedControl — the inline pill toggle (Expense / Income, ranges, etc.).
 * The selected segment lifts onto a white surface; income/expense options can
 * tint their label via the `tone` field. 2–3 options.
 */
export function SegmentedControl({ options, value, onChange, style }) {
  return (
    <div
      style={{
        display: 'inline-flex',
        padding: 4,
        background: 'var(--surface-card)',
        borderRadius: 'var(--radius-md)',
        ...style,
      }}
    >
      {options.map((opt) => {
        const selected = opt.value === value;
        const fg = selected
          ? opt.tone === 'income'
            ? 'var(--income)'
            : opt.tone === 'expense'
              ? 'var(--expense)'
              : 'var(--text-primary)'
          : 'var(--text-secondary)';
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange && onChange(opt.value)}
            aria-pressed={selected}
            style={{
              minWidth: 100,
              padding: '8px 22px',
              border: 'none',
              borderRadius: 'var(--radius-sm)',
              background: selected ? 'var(--surface-raised)' : 'transparent',
              boxShadow: selected ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-body)',
              fontWeight: 'var(--weight-semibold)',
              color: fg,
              cursor: 'pointer',
              transition: 'background 140ms ease, color 140ms ease',
            }}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
