"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

interface SecurityContextType {
  isLocked: boolean
  unlock: () => void
  lock: () => void
  encryptData: (data: string) => string
  decryptData: (encryptedData: string) => string
}

const SecurityContext = createContext<SecurityContextType | undefined>(undefined)

export function SecurityProvider({ children }: { children: ReactNode }) {
  const [isLocked, setIsLocked] = useState(true)

  // Simple mock encryption/decryption functions
  // In a real app, use a proper encryption library
  const encryptData = (data: string): string => {
    return btoa(data) // Base64 encoding (NOT secure, just for demo)
  }

  const decryptData = (encryptedData: string): string => {
    try {
      return atob(encryptedData) // Base64 decoding
    } catch (error) {
      console.error("Failed to decrypt data:", error)
      return ""
    }
  }

  const unlock = () => {
    setIsLocked(false)
  }

  const lock = () => {
    setIsLocked(true)
  }

  return (
    <SecurityContext.Provider value={{ isLocked, unlock, lock, encryptData, decryptData }}>
      {children}
    </SecurityContext.Provider>
  )
}

export function useSecurity() {
  const context = useContext(SecurityContext)
  if (context === undefined) {
    throw new Error("useSecurity must be used within a SecurityProvider")
  }
  return context
}
