const CURRENCY_SYMBOLS: Record<string, string> = {
  INR: '₹',
  USD: '$',
  EUR: '€',
  GBP: '£',
  JPY: '¥',
};

export function currencySymbol(code: string): string {
  return CURRENCY_SYMBOLS[code] ?? code;
}

export function formatCurrency(value: number, code: string = 'INR'): string {
  const sign = value < 0 ? '-' : '';
  const abs = Math.abs(value);
  const [intPart, decPart = ''] = abs.toFixed(2).split('.');
  const withSeparators = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return `${sign}${currencySymbol(code)}${withSeparators}.${decPart}`;
}

const MONTHS_SHORT = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

function ymdToDate(ymd: string): Date {
  const [y, m, d] = ymd.split('-').map(Number);
  return new Date(y, (m ?? 1) - 1, d ?? 1);
}

function isoDateOnly(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

export function todayIso(): string {
  return isoDateOnly(new Date());
}

export function formatRelativeDate(ymd: string, now: Date = new Date()): string {
  const today = isoDateOnly(now);
  if (ymd === today) return 'Today';

  const yesterdayDate = new Date(now);
  yesterdayDate.setDate(yesterdayDate.getDate() - 1);
  if (ymd === isoDateOnly(yesterdayDate)) return 'Yesterday';

  const d = ymdToDate(ymd);
  const sameYear = d.getFullYear() === now.getFullYear();
  const day = d.getDate();
  const month = MONTHS_SHORT[d.getMonth()];
  return sameYear ? `${day} ${month}` : `${day} ${month} ${d.getFullYear()}`;
}

export function formatDate(ymd: string): string {
  const d = ymdToDate(ymd);
  return `${d.getDate()} ${MONTHS_SHORT[d.getMonth()]} ${d.getFullYear()}`;
}
