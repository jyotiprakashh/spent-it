import { toCsv } from '@/utils/csv';

describe('toCsv', () => {
  it('returns header-only output for empty rows', () => {
    expect(toCsv([], ['a', 'b'])).toBe('a,b\r\n');
  });

  it('emits unquoted simple values', () => {
    expect(toCsv([{ a: 'x', b: 1 }], ['a', 'b'])).toBe('a,b\r\nx,1\r\n');
  });

  it('quotes values containing commas', () => {
    expect(toCsv([{ a: 'x,y' }], ['a'])).toBe('a\r\n"x,y"\r\n');
  });

  it('doubles embedded quotes', () => {
    expect(toCsv([{ a: 'he said "hi"' }], ['a'])).toBe('a\r\n"he said ""hi"""\r\n');
  });

  it('quotes values containing newlines', () => {
    expect(toCsv([{ a: 'line1\nline2' }], ['a'])).toBe('a\r\n"line1\nline2"\r\n');
  });

  it('coerces null/undefined to empty', () => {
    expect(toCsv([{ a: null, b: undefined }], ['a', 'b'])).toBe('a,b\r\n,\r\n');
  });

  it('coerces numbers and booleans to strings', () => {
    expect(toCsv([{ a: 3.14, b: true }], ['a', 'b'])).toBe('a,b\r\n3.14,true\r\n');
  });
});
