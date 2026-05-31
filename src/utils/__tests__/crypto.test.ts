import {
  aesGcmDecrypt,
  aesGcmEncrypt,
  bytesToUtf8,
  fromBase64,
  pbkdf2,
  toBase64,
  utf8ToBytes,
  zeroize,
} from '@/utils/crypto';

// expo-crypto.getRandomBytesAsync is the only host-only call. The tests use a
// fixed salt/IV so randomness isn't exercised here.

describe('base64', () => {
  it('round-trips arbitrary bytes', () => {
    const original = new Uint8Array([0, 1, 2, 3, 254, 255, 128, 64, 32]);
    expect(fromBase64(toBase64(original))).toEqual(original);
  });

  it('handles empty input', () => {
    expect(toBase64(new Uint8Array())).toBe('');
    expect(fromBase64('')).toEqual(new Uint8Array());
  });

  it('handles padding edge case (one byte)', () => {
    const one = new Uint8Array([42]);
    expect(fromBase64(toBase64(one))).toEqual(one);
  });

  it('handles padding edge case (two bytes)', () => {
    const two = new Uint8Array([42, 99]);
    expect(fromBase64(toBase64(two))).toEqual(two);
  });
});

describe('pbkdf2', () => {
  it('is deterministic for the same password + salt', () => {
    const salt = new Uint8Array(16).fill(7);
    const a = pbkdf2('hunter2', salt, 1000, 32);
    const b = pbkdf2('hunter2', salt, 1000, 32);
    expect(a).toEqual(b);
  });

  it('differs for different salts', () => {
    const a = pbkdf2('hunter2', new Uint8Array(16).fill(1), 1000, 32);
    const b = pbkdf2('hunter2', new Uint8Array(16).fill(2), 1000, 32);
    expect(a).not.toEqual(b);
  });

  it('differs for different passphrases', () => {
    const salt = new Uint8Array(16).fill(1);
    const a = pbkdf2('hunter2', salt, 1000, 32);
    const b = pbkdf2('hunter3', salt, 1000, 32);
    expect(a).not.toEqual(b);
  });
});

describe('aes-gcm', () => {
  it('round-trips plaintext', () => {
    const salt = new Uint8Array(16).fill(3);
    const iv = new Uint8Array(12).fill(4);
    const key = pbkdf2('pw', salt, 100, 32);
    const plaintext = utf8ToBytes('hello world');
    const cipher = aesGcmEncrypt(key, iv, plaintext);
    const back = aesGcmDecrypt(key, iv, cipher);
    expect(bytesToUtf8(back)).toBe('hello world');
  });

  it('throws on wrong key (auth tag)', () => {
    const salt = new Uint8Array(16).fill(3);
    const iv = new Uint8Array(12).fill(4);
    const key1 = pbkdf2('pw1', salt, 100, 32);
    const key2 = pbkdf2('pw2', salt, 100, 32);
    const cipher = aesGcmEncrypt(key1, iv, utf8ToBytes('secret'));
    expect(() => aesGcmDecrypt(key2, iv, cipher)).toThrow();
  });

  it('throws on tampered ciphertext', () => {
    const salt = new Uint8Array(16).fill(3);
    const iv = new Uint8Array(12).fill(4);
    const key = pbkdf2('pw', salt, 100, 32);
    const cipher = aesGcmEncrypt(key, iv, utf8ToBytes('secret'));
    cipher[0] ^= 0x01;
    expect(() => aesGcmDecrypt(key, iv, cipher)).toThrow();
  });
});

describe('zeroize', () => {
  it('overwrites all bytes with zero', () => {
    const buf = new Uint8Array([1, 2, 3, 4]);
    zeroize(buf);
    expect(buf).toEqual(new Uint8Array([0, 0, 0, 0]));
  });
});
