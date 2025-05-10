"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { tokenManager, securityMonitoring } from "@/utils/security-utils"
import { useRouter } from "next/navigation"

interface User {
  id: string
  email: string
  name: string
  role: string
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<boolean>
  register: (email: string, password: string, donationAmount?: number) => Promise<boolean>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  // Check if user is authenticated on mount
  useEffect(() => {
    const checkAuth = async () => {
      const token = tokenManager.getToken()

      if (token && tokenManager.validateToken(token)) {
        try {
          // In a real app, you would validate the token with the server
          // For demo purposes, we'll just decode it
          const decoded: any = await import("jwt-decode").then((module) => module.jwtDecode(token))

          setUser({
            id: decoded.id || "user_123",
            email: decoded.email || "user@example.com",
            name: decoded.name || "User",
            role: decoded.role || "user",
          })
        } catch (error) {
          console.error("Token validation error:", error)
          tokenManager.clearToken()
        }
      }

      setIsLoading(false)
    }

    checkAuth()
  }, [])

  // Login function
  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)

    try {
      // Generate CSRF token
      const csrfToken = Math.random().toString(36).substring(2)

      // Make API request
      const response = await fetch("/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-csrf-token": csrfToken,
        },
        body: JSON.stringify({ action: "sign-in", email, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        securityMonitoring.trackLoginAttempt(email, false)
        throw new Error(data.error || "Authentication failed")
      }

      // Store token
      tokenManager.storeToken(data.token)

      // Set user
      setUser(data.user)

      // Log successful login
      securityMonitoring.trackLoginAttempt(email, true)
      securityMonitoring.logEvent("USER_LOGIN_SUCCESS", { email })

      setIsLoading(false)
      return true
    } catch (error) {
      console.error("Login error:", error)
      securityMonitoring.logEvent("USER_LOGIN_FAILURE", { email, error })
      setIsLoading(false)
      return false
    }
  }

  // Register function
  const register = async (email: string, password: string, donationAmount?: number): Promise<boolean> => {
    setIsLoading(true)

    try {
      // Generate CSRF token
      const csrfToken = Math.random().toString(36).substring(2)

      // Make API request
      const response = await fetch("/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-csrf-token": csrfToken,
        },
        body: JSON.stringify({ action: "sign-up", email, password, donationAmount }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Registration failed")
      }

      // Store token
      tokenManager.storeToken(data.token)

      // Set user
      setUser(data.user)

      // Log successful registration
      securityMonitoring.logEvent("USER_REGISTRATION_SUCCESS", { email })

      setIsLoading(false)
      return true
    } catch (error) {
      console.error("Registration error:", error)
      securityMonitoring.logEvent("USER_REGISTRATION_FAILURE", { email, error })
      setIsLoading(false)
      return false
    }
  }

  // Logout function
  const logout = () => {
    tokenManager.clearToken()
    setUser(null)
    securityMonitoring.logEvent("USER_LOGOUT", { userId: user?.id })
    router.push("/auth")
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }

  return context
}
