import { addMonths, currentYearMonth, formatYearMonth, isFutureMonth, yearOf } from '@/utils/date';

describe('currentYearMonth', () => {
  it('formats Date as YYYY-MM', () => {
    expect(currentYearMonth(new Date(2026, 4, 30))).toBe('2026-05');
  });

  it('zero-pads single-digit months', () => {
    expect(currentYearMonth(new Date(2026, 0, 15))).toBe('2026-01');
  });
});

describe('addMonths', () => {
  it('advances forward within a year', () => {
    expect(addMonths('2026-03', 2)).toBe('2026-05');
  });

  it('rolls across year boundary forward', () => {
    expect(addMonths('2026-12', 1)).toBe('2027-01');
  });

  it('rolls across year boundary backward', () => {
    expect(addMonths('2026-01', -1)).toBe('2025-12');
  });

  it('delta of zero is identity', () => {
    expect(addMonths('2026-05', 0)).toBe('2026-05');
  });
});

describe('isFutureMonth', () => {
  const now = new Date(2026, 4, 30); // May 2026

  it('returns false for current month', () => {
    expect(isFutureMonth('2026-05', now)).toBe(false);
  });

  it('returns false for past month', () => {
    expect(isFutureMonth('2026-04', now)).toBe(false);
  });

  it('returns true for future month', () => {
    expect(isFutureMonth('2026-06', now)).toBe(true);
  });

  it('returns true for future year', () => {
    expect(isFutureMonth('2027-01', now)).toBe(true);
  });
});

describe('formatYearMonth', () => {
  it('uses full month name + year', () => {
    expect(formatYearMonth('2026-05')).toBe('May 2026');
  });

  it('handles January correctly', () => {
    expect(formatYearMonth('2025-01')).toBe('January 2025');
  });
});

describe('yearOf', () => {
  it('extracts the year', () => {
    expect(yearOf('2026-05')).toBe(2026);
  });
});
