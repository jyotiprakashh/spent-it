import { gcm } from '@noble/ciphers/aes.js';
import { pbkdf2 as noblePbkdf2 } from '@noble/hashes/pbkdf2.js';
import { sha256 } from '@noble/hashes/sha2.js';
import * as ExpoCrypto from 'expo-crypto';

// expo-crypto returns a Uint8Array via getRandomBytesAsync.
// Wraps so callers get the same shape regardless of platform polyfills.
export async function randomBytes(length: number): Promise<Uint8Array> {
  const out = await ExpoCrypto.getRandomBytesAsync(length);
  return new Uint8Array(out);
}

export function pbkdf2(
  passphrase: string,
  salt: Uint8Array,
  iterations: number,
  keyLength: number,
): Uint8Array {
  const passBytes = new TextEncoder().encode(passphrase);
  return noblePbkdf2(sha256, passBytes, salt, { c: iterations, dkLen: keyLength });
}

export function aesGcmEncrypt(key: Uint8Array, iv: Uint8Array, plaintext: Uint8Array): Uint8Array {
  return gcm(key, iv).encrypt(plaintext);
}

export function aesGcmDecrypt(key: Uint8Array, iv: Uint8Array, ciphertext: Uint8Array): Uint8Array {
  // Throws on auth-tag mismatch (wrong key / tampered data).
  return gcm(key, iv).decrypt(ciphertext);
}

// Base64 helpers — RN provides global atob/btoa via Hermes 0.71+, but we use
// a pure-JS roundtrip to stay portable across web/JSC fallbacks.

const BASE64_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

export function toBase64(bytes: Uint8Array): string {
  let out = '';
  let i = 0;
  for (; i + 2 < bytes.length; i += 3) {
    const a = bytes[i];
    const b = bytes[i + 1];
    const c = bytes[i + 2];
    out +=
      BASE64_CHARS[a >> 2] +
      BASE64_CHARS[((a & 0x03) << 4) | (b >> 4)] +
      BASE64_CHARS[((b & 0x0f) << 2) | (c >> 6)] +
      BASE64_CHARS[c & 0x3f];
  }
  if (i < bytes.length) {
    const a = bytes[i];
    const b = i + 1 < bytes.length ? bytes[i + 1] : 0;
    out += BASE64_CHARS[a >> 2];
    out += BASE64_CHARS[((a & 0x03) << 4) | (b >> 4)];
    if (i + 1 < bytes.length) {
      out += BASE64_CHARS[(b & 0x0f) << 2];
      out += '=';
    } else {
      out += '==';
    }
  }
  return out;
}

export function fromBase64(input: string): Uint8Array {
  const clean = input.replace(/[^A-Za-z0-9+/=]/g, '');
  const padded = clean.replace(/=+$/, '');
  const len = padded.length;
  const out = new Uint8Array(Math.floor((len * 3) / 4));
  let outPos = 0;
  for (let i = 0; i < len; i += 4) {
    const a = BASE64_CHARS.indexOf(padded[i]);
    const b = BASE64_CHARS.indexOf(padded[i + 1]);
    const c = i + 2 < len ? BASE64_CHARS.indexOf(padded[i + 2]) : -1;
    const d = i + 3 < len ? BASE64_CHARS.indexOf(padded[i + 3]) : -1;
    out[outPos++] = (a << 2) | (b >> 4);
    if (c !== -1) out[outPos++] = ((b & 0x0f) << 4) | (c >> 2);
    if (d !== -1) out[outPos++] = ((c & 0x03) << 6) | d;
  }
  return out.slice(0, outPos);
}

export function utf8ToBytes(text: string): Uint8Array {
  return new TextEncoder().encode(text);
}

export function bytesToUtf8(bytes: Uint8Array): string {
  return new TextDecoder().decode(bytes);
}

// Wipes a key/byte buffer in place. Useful for `finally {}` blocks so keys
// don't linger in heap memory longer than needed.
export function zeroize(bytes: Uint8Array): void {
  bytes.fill(0);
}
