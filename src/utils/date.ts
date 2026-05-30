const MONTHS_FULL = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export function currentYearMonth(now: Date = new Date()): string {
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  return `${y}-${m}`;
}

export function addMonths(ym: string, delta: number): string {
  const [yStr, mStr] = ym.split('-');
  const y = parseInt(yStr, 10);
  const m = parseInt(mStr, 10);
  const date = new Date(y, m - 1 + delta, 1);
  return currentYearMonth(date);
}

export function isFutureMonth(ym: string, now: Date = new Date()): boolean {
  return ym > currentYearMonth(now);
}

export function formatYearMonth(ym: string): string {
  const [yStr, mStr] = ym.split('-');
  const y = parseInt(yStr, 10);
  const m = parseInt(mStr, 10);
  return `${MONTHS_FULL[m - 1]} ${y}`;
}

export function yearOf(ym: string): number {
  return parseInt(ym.slice(0, 4), 10);
}
