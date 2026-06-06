import React from 'react';

/**
 * SectionTitle — the uppercase overline that labels every block
 * (THIS MONTH, RECENT, SPENDING). 11px / 700 / +0.6 tracking, secondary ink.
 */
export function SectionTitle({ children, style, ...rest }) {
  return (
    <div
      style={{
        fontFamily: 'var(--font-display)',
        fontSize: 'var(--text-overline)',
        fontWeight: 'var(--weight-bold)',
        textTransform: 'uppercase',
        letterSpacing: 'var(--tracking-overline)',
        color: 'var(--text-secondary)',
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}
