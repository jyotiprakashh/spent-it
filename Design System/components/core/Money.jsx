import React from 'react';

const SYMBOLS = { INR: '₹', USD: '$', EUR: '€', GBP: '£', JPY: '¥' };

export function formatCurrency(value, currency = 'INR') {
  const symbol = SYMBOLS[currency] ?? '';
  const abs = Math.abs(value);
  const locale = currency === 'INR' ? 'en-IN' : 'en-US';
  const hasDecimals = abs % 1 !== 0;
  const formatted = abs.toLocaleString(locale, {
    minimumFractionDigits: hasDecimals ? 2 : 0,
    maximumFractionDigits: 2,
  });
  return symbol ? `${symbol}${formatted}` : formatted;
}

/**
 * Money — the typographic treatment for every currency value.
 * Tightened numerals (-0.2 tracking); tone maps to the semantic palette
 * (income green, expense red, muted grey). `signed` prepends + for positives.
 */
export function Money({
  value,
  currency = 'INR',
  tone = 'default',
  size = 16,
  weight = 600,
  signed = false,
  style,
  ...rest
}) {
  const color = {
    default: 'var(--text-primary)',
    income: 'var(--income)',
    expense: 'var(--expense)',
    muted: 'var(--text-secondary)',
  }[tone];

  const prefix = signed ? (value > 0 ? '+ ' : value < 0 ? '− ' : '') : value < 0 ? '− ' : '';

  return (
    <span
      style={{
        fontFamily: 'var(--font-display)',
        fontSize: size,
        fontWeight: weight,
        letterSpacing: 'var(--tracking-money)',
        color,
        whiteSpace: 'nowrap',
        fontVariantNumeric: 'tabular-nums',
        ...style,
      }}
      {...rest}
    >
      {prefix}
      {formatCurrency(value, currency)}
    </span>
  );
}
