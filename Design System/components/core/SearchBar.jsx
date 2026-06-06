import React from 'react';
import { Icon } from './Icon';

/**
 * SearchBar — the transactions search field: search glyph, live input, clear.
 * Sits on the neutral card fill with a pill-soft 12px radius.
 */
export function SearchBar({ value, onChange, onClose, placeholder = 'Search notes or categories', style }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--space-two)',
        height: 44,
        padding: '0 var(--space-three)',
        background: 'var(--surface-card)',
        borderRadius: 'var(--radius-md)',
        ...style,
      }}
    >
      <Icon name="search" size={18} color="var(--text-secondary)" />
      <input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoFocus
        style={{
          flex: 1,
          border: 'none',
          outline: 'none',
          background: 'transparent',
          fontFamily: 'var(--font-display)',
          fontSize: 'var(--text-body)',
          color: 'var(--text-primary)',
          minWidth: 0,
        }}
      />
      {onClose ? (
        <button
          type="button"
          onClick={onClose}
          aria-label="Close search"
          style={{ display: 'flex', border: 'none', background: 'transparent', cursor: 'pointer', padding: 2 }}
        >
          <Icon name="close" size={18} color="var(--text-secondary)" />
        </button>
      ) : null}
    </div>
  );
}
