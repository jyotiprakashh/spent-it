/**
 * Tests for AuthService
 *
 * Mocking strategy:
 *   - expo-crypto: jest.mock() registers the module; getRandomBytesAsync is
 *     re-implemented per test via mockResolvedValue so bytes are deterministic.
 *   - expo-secure-store: jest.mock() registers the module; setItemAsync and
 *     getItemAsync are re-implemented in beforeEach via mockImplementation,
 *     backed by a plain Map that is cleared before every test.  This gives full
 *     isolation without shared mutable state between it() blocks.
 *
 *     The factory functions cannot close over module-level variables because
 *     Babel hoists jest.mock() calls above all declarations.  Keeping the
 *     factories empty (returning jest.fn()) and wiring up implementations in
 *     beforeEach avoids that constraint entirely.
 */

import { AuthService } from '../auth-service';
import * as SecureStore from 'expo-secure-store';
import * as Crypto from 'expo-crypto';

jest.mock('expo-secure-store', () => ({
  setItemAsync: jest.fn(),
  getItemAsync: jest.fn(),
}));

jest.mock('expo-crypto', () => ({
  getRandomBytesAsync: jest.fn(),
}));

// ---------------------------------------------------------------------------
// Typed mock references
// ---------------------------------------------------------------------------

const mockSetItem = SecureStore.setItemAsync as jest.MockedFunction<
  typeof SecureStore.setItemAsync
>;
const mockGetItem = SecureStore.getItemAsync as jest.MockedFunction<
  typeof SecureStore.getItemAsync
>;
const mockGetRandomBytes = Crypto.getRandomBytesAsync as jest.MockedFunction<
  typeof Crypto.getRandomBytesAsync
>;

// ---------------------------------------------------------------------------
// Controlled byte sequence
// ---------------------------------------------------------------------------

// 32 bytes chosen to exercise edge cases:
//   index 0 → 0x00  ("00")
//   index 1 → 0xff  ("ff")
//   index 2 → 0x10  ("10")
//   index 3 → 0x0f  ("0f")
//   indices 4-31 → 0xab ("ab")
const CONTROLLED_BYTES = new Uint8Array([
  0x00, 0xff, 0x10, 0x0f, 0xab, 0xab, 0xab, 0xab, 0xab, 0xab, 0xab, 0xab, 0xab, 0xab, 0xab, 0xab,
  0xab, 0xab, 0xab, 0xab, 0xab, 0xab, 0xab, 0xab, 0xab, 0xab, 0xab, 0xab, 0xab, 0xab, 0xab, 0xab,
]);

const EXPECTED_HEX = Array.from(CONTROLLED_BYTES)
  .map((b) => b.toString(16).padStart(2, '0'))
  .join('');

// ---------------------------------------------------------------------------
// In-memory store wired up in beforeEach
// ---------------------------------------------------------------------------

// Declared at module scope so tests can also read / pre-populate it directly.
let mockStore: Map<string, string>;

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('AuthService', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    mockStore = new Map<string, string>();

    mockSetItem.mockImplementation(async (key: string, value: string): Promise<void> => {
      mockStore.set(key, value);
    });

    mockGetItem.mockImplementation(async (key: string): Promise<string | null> => {
      return mockStore.get(key) ?? null;
    });

    mockGetRandomBytes.mockResolvedValue(CONTROLLED_BYTES);
  });

  // -------------------------------------------------------------------------
  describe('generateAndStoreKey', () => {
    it('calls getRandomBytesAsync with 32 as the size argument', async () => {
      // Arrange — mocks ready from beforeEach

      // Act
      await AuthService.generateAndStoreKey();

      // Assert
      expect(mockGetRandomBytes).toHaveBeenCalledTimes(1);
      expect(mockGetRandomBytes).toHaveBeenCalledWith(32);
    });

    it('stores the generated key in SecureStore under the spentit_db_key alias', async () => {
      // Act
      await AuthService.generateAndStoreKey();

      // Assert
      expect(mockSetItem).toHaveBeenCalledTimes(1);
      expect(mockSetItem).toHaveBeenCalledWith('spentit_db_key', EXPECTED_HEX);
    });

    it('returns a 64-character lowercase hex string', async () => {
      // Act
      const key = await AuthService.generateAndStoreKey();

      // Assert
      expect(key).toHaveLength(64);
      expect(key).toMatch(/^[0-9a-f]{64}$/);
    });

    it('hex-encodes byte 0x00 as "00", 0xff as "ff", 0x10 as "10", and 0x0f as "0f"', async () => {
      // Arrange — CONTROLLED_BYTES[0]=0x00, [1]=0xff, [2]=0x10, [3]=0x0f

      // Act
      const key = await AuthService.generateAndStoreKey();

      // Assert
      expect(key.slice(0, 2)).toBe('00');
      expect(key.slice(2, 4)).toBe('ff');
      expect(key.slice(4, 6)).toBe('10');
      expect(key.slice(6, 8)).toBe('0f');
    });

    it('returns the exact deterministic hex derived from the controlled bytes', async () => {
      // Act
      const key = await AuthService.generateAndStoreKey();

      // Assert
      expect(key).toBe(EXPECTED_HEX);
    });
  });

  // -------------------------------------------------------------------------
  describe('retrieveKey', () => {
    it('returns the stored value when a key exists in SecureStore', async () => {
      // Arrange
      mockStore.set('spentit_db_key', EXPECTED_HEX);

      // Act
      const result = await AuthService.retrieveKey();

      // Assert
      expect(result).toBe(EXPECTED_HEX);
    });

    it('returns null when no key has been stored', async () => {
      // Arrange — mockStore is empty (reset in beforeEach)

      // Act
      const result = await AuthService.retrieveKey();

      // Assert
      expect(result).toBeNull();
    });

    it('delegates to SecureStore.getItemAsync with the correct alias', async () => {
      // Arrange
      mockStore.set('spentit_db_key', EXPECTED_HEX);

      // Act
      await AuthService.retrieveKey();

      // Assert
      expect(mockGetItem).toHaveBeenCalledTimes(1);
      expect(mockGetItem).toHaveBeenCalledWith('spentit_db_key');
    });
  });

  // -------------------------------------------------------------------------
  describe('getOrCreateKey', () => {
    it('returns the existing key without calling getRandomBytesAsync when a key already exists', async () => {
      // Arrange
      mockStore.set('spentit_db_key', EXPECTED_HEX);

      // Act
      const key = await AuthService.getOrCreateKey();

      // Assert
      expect(key).toBe(EXPECTED_HEX);
      expect(mockGetRandomBytes).not.toHaveBeenCalled();
    });

    it('does not write to SecureStore again when a key already exists', async () => {
      // Arrange
      mockStore.set('spentit_db_key', EXPECTED_HEX);

      // Act
      await AuthService.getOrCreateKey();

      // Assert
      expect(mockSetItem).not.toHaveBeenCalled();
    });

    it('generates and stores a new key when no key exists', async () => {
      // Arrange — store is empty

      // Act
      const key = await AuthService.getOrCreateKey();

      // Assert
      expect(mockGetRandomBytes).toHaveBeenCalledTimes(1);
      expect(mockSetItem).toHaveBeenCalledTimes(1);
      expect(key).toBe(EXPECTED_HEX);
    });

    it('returns a 64-character lowercase hex string when a new key is generated', async () => {
      // Arrange — store is empty

      // Act
      const key = await AuthService.getOrCreateKey();

      // Assert
      expect(key).toHaveLength(64);
      expect(key).toMatch(/^[0-9a-f]{64}$/);
    });

    it('persists the newly generated key so a subsequent call reads from the store without regenerating', async () => {
      // Arrange — first call generates and stores
      await AuthService.getOrCreateKey();

      // Reset call counters only; leave mockStore intact so second call hits it
      jest.clearAllMocks();
      // Re-wire implementations because clearAllMocks resets them
      mockSetItem.mockImplementation(async (key: string, value: string): Promise<void> => {
        mockStore.set(key, value);
      });
      mockGetItem.mockImplementation(async (key: string): Promise<string | null> => {
        return mockStore.get(key) ?? null;
      });

      // Act
      const secondKey = await AuthService.getOrCreateKey();

      // Assert — crypto must NOT have been invoked again
      expect(mockGetRandomBytes).not.toHaveBeenCalled();
      expect(secondKey).toBe(EXPECTED_HEX);
    });
  });
});
