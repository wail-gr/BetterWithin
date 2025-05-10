"use client"

import { jwtDecode } from "jwt-decode"
import { encryption } from "./security"

// JWT Token Management
export const tokenManager = {
  // Store JWT token in HttpOnly cookie (in a real app, this would be done server-side)
  storeToken: (token: string): void => {
    // In a real implementation, this would set an HttpOnly cookie
    // For demo purposes, we're using localStorage with encryption
    localStorage.setItem("auth_token", encryption.encrypt(token))
  },

  // Get the stored token
  getToken: (): string | null => {
    const token = localStorage.getItem("auth_token")
    if (!token) return null
    return encryption.isEncrypted(token) ? encryption.decrypt(token) : token
  },

  // Validate token and check if it's expired
  validateToken: (token: string): boolean => {
    try {
      const decoded: any = jwtDecode(token)
      // Check if token is expired
      return decoded.exp * 1000 > Date.now()
    } catch (error) {
      console.error("Token validation error:", error)
      return false
    }
  },

  // Rotate token (would typically be done server-side)
  rotateToken: async (): Promise<string | null> => {
    const currentToken = tokenManager.getToken()
    if (!currentToken) return null

    try {
      // In a real app, this would be an API call to get a new token
      // For demo purposes, we'll just return the current token
      return currentToken
    } catch (error) {
      console.error("Token rotation error:", error)
      return null
    }
  },

  // Clear token on logout
  clearToken: (): void => {
    localStorage.removeItem("auth_token")
  },
}

// Role-based Access Control
export const rbac = {
  // User roles
  roles: {
    GUEST: "guest",
    USER: "user",
    ADMIN: "admin",
  },

  // Get user role from token
  getUserRole: (): string => {
    const token = tokenManager.getToken()
    if (!token) return rbac.roles.GUEST

    try {
      const decoded: any = jwtDecode(token)
      return decoded.role || rbac.roles.GUEST
    } catch (error) {
      console.error("Error getting user role:", error)
      return rbac.roles.GUEST
    }
  },

  // Check if user has required role
  hasRole: (requiredRole: string): boolean => {
    const userRole = rbac.getUserRole()

    // Role hierarchy: ADMIN > USER > GUEST
    if (requiredRole === rbac.roles.GUEST) return true
    if (requiredRole === rbac.roles.USER) return userRole === rbac.roles.USER || userRole === rbac.roles.ADMIN
    if (requiredRole === rbac.roles.ADMIN) return userRole === rbac.roles.ADMIN

    return false
  },

  // Check if user can access a specific resource
  canAccess: (resource: string, action: string): boolean => {
    const userRole = rbac.getUserRole()

    // Define permissions (in a real app, this would be more sophisticated)
    const permissions: Record<string, Record<string, string[]>> = {
      journal: {
        read: [rbac.roles.USER, rbac.roles.ADMIN],
        write: [rbac.roles.USER, rbac.roles.ADMIN],
        delete: [rbac.roles.USER, rbac.roles.ADMIN],
      },
      users: {
        read: [rbac.roles.ADMIN],
        write: [rbac.roles.ADMIN],
        delete: [rbac.roles.ADMIN],
      },
      settings: {
        read: [rbac.roles.USER, rbac.roles.ADMIN],
        write: [rbac.roles.USER, rbac.roles.ADMIN],
      },
    }

    // Check if resource and action exist in permissions
    if (!permissions[resource] || !permissions[resource][action]) return false

    // Check if user role is in the allowed roles for this resource and action
    return permissions[resource][action].includes(userRole)
  },
}

// AI Safety & Ethical Filters
export const aiSafety = {
  // Check if text contains profanity or toxic content
  // This is a simplified implementation - in a real app, use a proper content moderation API
  checkContent: (text: string): { safe: boolean; reason?: string } => {
    const toxicWords = ["hate", "kill", "violent", "suicide", "harm", "attack"]
    const lowercaseText = text.toLowerCase()

    for (const word of toxicWords) {
      if (lowercaseText.includes(word)) {
        return { safe: false, reason: `Content contains potentially harmful word: ${word}` }
      }
    }

    return { safe: true }
  },

  // Anonymize user data before sending to AI
  anonymizePrompt: (prompt: string, userData: any): string => {
    let anonymized = prompt

    // Replace user identifiable information with placeholders
    if (userData.name) {
      anonymized = anonymized.replace(new RegExp(userData.name, "gi"), "USER")
    }

    if (userData.email) {
      anonymized = anonymized.replace(new RegExp(userData.email, "gi"), "USER_EMAIL")
    }

    return anonymized
  },

  // Filter AI response to ensure it's safe and appropriate
  filterResponse: (response: string): string => {
    const safetyCheck = aiSafety.checkContent(response)

    if (!safetyCheck.safe) {
      // In a real app, you might want to log this and generate a new response
      return "I apologize, but I cannot provide that information. Let me try a different approach to help you."
    }

    return response
  },
}

// Security Headers (for server-side implementation)
export const securityHeaders = {
  // Content Security Policy
  csp: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; font-src 'self'; connect-src 'self' https://api.openai.com;",

  // HTTP Strict Transport Security
  hsts: "max-age=63072000; includeSubDomains; preload",

  // X-Content-Type-Options
  contentTypeOptions: "nosniff",

  // X-Frame-Options
  frameOptions: "DENY",

  // Referrer-Policy
  referrerPolicy: "strict-origin-when-cross-origin",

  // Get all headers as an object
  getAll: (): Record<string, string> => {
    return {
      "Content-Security-Policy": securityHeaders.csp,
      "Strict-Transport-Security": securityHeaders.hsts,
      "X-Content-Type-Options": securityHeaders.contentTypeOptions,
      "X-Frame-Options": securityHeaders.frameOptions,
      "Referrer-Policy": securityHeaders.referrerPolicy,
    }
  },
}

// Logging and Monitoring
export const securityMonitoring = {
  // Log security events
  logEvent: (eventType: string, details: any): void => {
    // In a real app, this would send logs to a server or monitoring service
    console.log(`[SECURITY EVENT] ${eventType}:`, details)

    // For critical events, you might want to alert immediately
    if (eventType.startsWith("CRITICAL")) {
      securityMonitoring.sendAlert(eventType, details)
    }
  },

  // Send security alert
  sendAlert: (alertType: string, details: any): void => {
    // In a real app, this would send an alert to administrators
    console.error(`[SECURITY ALERT] ${alertType}:`, details)
  },

  // Track failed login attempts
  trackLoginAttempt: (email: string, success: boolean): void => {
    // In a real app, this would track login attempts in a database
    // For demo purposes, we'll just log it
    if (!success) {
      const failedAttempts = JSON.parse(localStorage.getItem(`failed_login_${email}`) || "0") + 1
      localStorage.setItem(`failed_login_${email}`, JSON.stringify(failedAttempts))

      // If too many failed attempts, lock the account
      if (failedAttempts >= 5) {
        securityMonitoring.logEvent("CRITICAL_ACCOUNT_LOCKOUT", { email, attempts: failedAttempts })
      }
    } else {
      // Reset failed attempts on successful login
      localStorage.removeItem(`failed_login_${email}`)
    }
  },
}

// Local data protection
export const localDataProtection = {
  // Store sensitive data locally with encryption
  storeLocalData: (key: string, data: any): void => {
    localStorage.setItem(key, encryption.encrypt(data))
  },

  // Get encrypted local data
  getLocalData: (key: string): any => {
    const data = localStorage.getItem(key)
    if (!data) return null

    return encryption.isEncrypted(data) ? encryption.decrypt(data) : data
  },

  // Clear all local data
  clearAllData: (): void => {
    localStorage.clear()
  },

  // Check if data should be synced based on user preferences
  shouldSyncData: (dataType: string): boolean => {
    // Get user preferences from local storage
    const syncPreferences = localDataProtection.getLocalData("sync_preferences") || {}
    return syncPreferences[dataType] === true
  },
}
