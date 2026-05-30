import {
  currencySymbol,
  formatCurrency,
  formatDate,
  formatRelativeDate,
  todayIso,
} from '@/utils/format';

describe('currencySymbol', () => {
  it('returns known symbol for INR', () => {
    expect(currencySymbol('INR')).toBe('₹');
  });

  it('falls back to code for unknown currency', () => {
    expect(currencySymbol('XYZ')).toBe('XYZ');
  });
});

describe('formatCurrency', () => {
  it('formats positive value with two decimals and separator', () => {
    expect(formatCurrency(1234.5)).toBe('₹1,234.50');
  });

  it('formats zero', () => {
    expect(formatCurrency(0)).toBe('₹0.00');
  });

  it('formats negative value', () => {
    expect(formatCurrency(-50)).toBe('-₹50.00');
  });

  it('formats large value with multiple thousands separators', () => {
    expect(formatCurrency(1000000)).toBe('₹1,000,000.00');
  });

  it('uses provided currency code', () => {
    expect(formatCurrency(99, 'USD')).toBe('$99.00');
  });
});

describe('formatRelativeDate', () => {
  const now = new Date(2026, 4, 29); // May 29, 2026

  it('returns "Today" for current date', () => {
    expect(formatRelativeDate('2026-05-29', now)).toBe('Today');
  });

  it('returns "Yesterday" for previous date', () => {
    expect(formatRelativeDate('2026-05-28', now)).toBe('Yesterday');
  });

  it('returns short month + day for same year other dates', () => {
    expect(formatRelativeDate('2026-01-15', now)).toBe('15 Jan');
  });

  it('includes year for different year', () => {
    expect(formatRelativeDate('2024-12-25', now)).toBe('25 Dec 2024');
  });
});

describe('formatDate', () => {
  it('returns full readable date', () => {
    expect(formatDate('2026-05-29')).toBe('29 May 2026');
  });
});

describe('todayIso', () => {
  it('matches YYYY-MM-DD pattern', () => {
    expect(todayIso()).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });
});
