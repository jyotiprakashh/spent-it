// RFC-4180 CSV. Quotes only when necessary; doubles embedded quotes; CRLF line ends.

function needsQuoting(value: string): boolean {
  return value.includes(',') || value.includes('"') || value.includes('\n') || value.includes('\r');
}

function quote(value: string): string {
  return `"${value.replace(/"/g, '""')}"`;
}

function escape(cell: unknown): string {
  if (cell === null || cell === undefined) return '';
  const str = typeof cell === 'string' ? cell : String(cell);
  return needsQuoting(str) ? quote(str) : str;
}

export function toCsv<T extends Record<string, unknown>>(
  rows: T[],
  columns: readonly (keyof T & string)[],
): string {
  const header = columns.map(escape).join(',');
  if (rows.length === 0) return header + '\r\n';
  const body = rows.map((row) => columns.map((col) => escape(row[col])).join(',')).join('\r\n');
  return header + '\r\n' + body + '\r\n';
}
