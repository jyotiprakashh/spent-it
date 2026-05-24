import * as Crypto from 'expo-crypto';
import * as SecureStore from 'expo-secure-store';

const KEY_ALIAS = 'spentit_db_key';

export class AuthService {
  static async generateAndStoreKey(): Promise<string> {
    const bytes = await Crypto.getRandomBytesAsync(32);
    const key = Array.from(bytes)
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');
    await SecureStore.setItemAsync(KEY_ALIAS, key);
    return key;
  }

  static async retrieveKey(): Promise<string | null> {
    return SecureStore.getItemAsync(KEY_ALIAS);
  }

  // Returns existing key if found, otherwise generates + stores a new one.
  static async getOrCreateKey(): Promise<string> {
    const existing = await AuthService.retrieveKey();
    if (existing !== null) return existing;
    return AuthService.generateAndStoreKey();
  }
}
