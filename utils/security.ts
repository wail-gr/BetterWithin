"use client"

// Simple encryption utility for client-side data protection
// Note: This is a simplified implementation for demonstration purposes
// In a production app, use a proper encryption library

export const encryption = {
  // Simple encryption key (in a real app, this would be securely generated and stored)
  key: "betterwithin-secure-key-2023",

  // Check if a string is encrypted
  isEncrypted: (text: string): boolean => {
    return text?.startsWith("encrypted:")
  },

  // Encrypt data
  encrypt: (data: any): string => {
    try {
      const jsonString = JSON.stringify(data)
      // Simple XOR encryption (for demonstration only)
      const encrypted = Array.from(jsonString)
        .map((char) => {
          return String.fromCharCode(char.charCodeAt(0) ^ encryption.key.charCodeAt(0))
        })
        .join("")
      return `encrypted:${btoa(encrypted)}`
    } catch (error) {
      console.error("Encryption error:", error)
      return JSON.stringify(data)
    }
  },

  // Decrypt data
  decrypt: (encryptedText: string): any => {
    try {
      if (!encryption.isEncrypted(encryptedText)) {
        return JSON.parse(encryptedText)
      }

      const encryptedData = encryptedText.replace("encrypted:", "")
      const decoded = atob(encryptedData)

      // Reverse the XOR encryption
      const decrypted = Array.from(decoded)
        .map((char) => {
          return String.fromCharCode(char.charCodeAt(0) ^ encryption.key.charCodeAt(0))
        })
        .join("")

      return JSON.parse(decrypted)
    } catch (error) {
      console.error("Decryption error:", error)
      return null
    }
  },

  // Hash a string (e.g., for passwords)
  hash: async (text: string): Promise<string> => {
    try {
      const encoder = new TextEncoder()
      const data = encoder.encode(text)
      const hashBuffer = await crypto.subtle.digest("SHA-256", data)
      const hashArray = Array.from(new Uint8Array(hashBuffer))
      return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("")
    } catch (error) {
      console.error("Hashing error:", error)
      return ""
    }
  },

  // Sanitize input to prevent XSS
  sanitizeInput: (input: string): string => {
    if (!input) return ""
    return input.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;")
  },
}

// Input sanitization utility
export const sanitize = {
  // Sanitize text to prevent XSS
  text: (input: string): string => {
    return encryption.sanitizeInput(input)
  },

  // Sanitize HTML content
  html: (input: string): string => {
    // This is a simplified version - in production, use a proper sanitizer library
    return encryption.sanitizeInput(input)
  },

  // Sanitize SQL queries to prevent injection
  sql: (input: string): string => {
    // Remove SQL injection patterns
    return input.replace(/'/g, "''").replace(/;/g, "").replace(/--/g, "").replace(/\/\*/g, "").replace(/\*\//g, "")
  },
}

// CSRF protection utility
export const csrfProtection = {
  // Generate a CSRF token
  generateToken: (): string => {
    const array = new Uint8Array(16)
    crypto.getRandomValues(array)
    return Array.from(array, (byte) => byte.toString(16).padStart(2, "0")).join("")
  },

  // Store the token in localStorage
  storeToken: (token: string): void => {
    localStorage.setItem("csrf_token", token)
  },

  // Get the stored token
  getToken: (): string => {
    return localStorage.getItem("csrf_token") || ""
  },

  // Validate a token against the stored one
  validateToken: (token: string): boolean => {
    return token === csrfProtection.getToken()
  },
}
