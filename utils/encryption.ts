/**
 * Encryption utility for BetterWithin app
 * Implements AES-256 encryption for sensitive user data
 */

// This is a simplified version for demonstration
// In production, use a proper encryption library like crypto-js or node-crypto

export class Encryption {
  private static readonly ALGORITHM = "AES-GCM"
  private static readonly KEY_LENGTH = 256
  private static readonly IV_LENGTH = 12

  /**
   * Generate a new encryption key
   * In a real app, this would be stored securely in the device keychain
   */
  static async generateKey(): Promise<CryptoKey> {
    return window.crypto.subtle.generateKey(
      {
        name: this.ALGORITHM,
        length: this.KEY_LENGTH,
      },
      true,
      ["encrypt", "decrypt"],
    )
  }

  /**
   * Encrypt data using AES-256
   */
  static async encrypt(data: string, key: CryptoKey): Promise<string> {
    try {
      // Generate a random initialization vector
      const iv = window.crypto.getRandomValues(new Uint8Array(this.IV_LENGTH))

      // Convert the data to ArrayBuffer
      const encodedData = new TextEncoder().encode(data)

      // Encrypt the data
      const encryptedData = await window.crypto.subtle.encrypt(
        {
          name: this.ALGORITHM,
          iv,
        },
        key,
        encodedData,
      )

      // Combine IV and encrypted data
      const result = new Uint8Array(iv.length + encryptedData.byteLength)
      result.set(iv)
      result.set(new Uint8Array(encryptedData), iv.length)

      // Convert to base64 for storage
      return btoa(String.fromCharCode(...result))
    } catch (error) {
      console.error("Encryption failed:", error)
      throw new Error("Failed to encrypt data")
    }
  }

  /**
   * Decrypt data using AES-256
   */
  static async decrypt(encryptedData: string, key: CryptoKey): Promise<string> {
    try {
      // Convert from base64
      const data = Uint8Array.from(atob(encryptedData), (c) => c.charCodeAt(0))

      // Extract IV and encrypted data
      const iv = data.slice(0, this.IV_LENGTH)
      const ciphertext = data.slice(this.IV_LENGTH)

      // Decrypt the data
      const decryptedData = await window.crypto.subtle.decrypt(
        {
          name: this.ALGORITHM,
          iv,
        },
        key,
        ciphertext,
      )

      // Convert back to string
      return new TextDecoder().decode(decryptedData)
    } catch (error) {
      console.error("Decryption failed:", error)
      throw new Error("Failed to decrypt data")
    }
  }

  /**
   * Export key for storage
   */
  static async exportKey(key: CryptoKey): Promise<string> {
    const exported = await window.crypto.subtle.exportKey("raw", key)
    return btoa(String.fromCharCode(...new Uint8Array(exported)))
  }

  /**
   * Import key from storage
   */
  static async importKey(keyData: string): Promise<CryptoKey> {
    const rawKey = Uint8Array.from(atob(keyData), (c) => c.charCodeAt(0))
    return window.crypto.subtle.importKey(
      "raw",
      rawKey,
      {
        name: this.ALGORITHM,
        length: this.KEY_LENGTH,
      },
      false,
      ["encrypt", "decrypt"],
    )
  }
}
