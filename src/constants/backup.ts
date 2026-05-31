// Single source of truth for backup file format + crypto parameters.
// Bumping FORMAT_VERSION requires writing a v2 importer that handles older files.

export const FORMAT_VERSION = 1 as const;

export const PBKDF2_ITERATIONS = 150_000;
export const KEY_LENGTH_BYTES = 32; // AES-256
export const SALT_LENGTH_BYTES = 16;
export const IV_LENGTH_BYTES = 12; // AES-GCM standard nonce size

export const EXT_SPENTIT = '.spentit';
export const EXT_JSON = '.json';
export const EXT_ZIP = '.zip';

export const MIME_SPENTIT = 'application/octet-stream';
export const MIME_JSON = 'application/json';
export const MIME_ZIP = 'application/zip';
