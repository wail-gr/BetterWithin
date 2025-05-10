"use client"

import { encryption } from "./security"
import React from "react"

// Interface for offline storage items
export interface OfflineItem {
  id: string | number
  syncStatus: "synced" | "pending" | "failed"
  updatedAt: number
  [key: string]: any
}

// Hook for checking online status
export function useOfflineStatus() {
  const [isOnline, setIsOnline] = React.useState(typeof navigator !== "undefined" ? navigator.onLine : true)

  React.useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [])

  return { isOnline }
}

// Hook for syncing data when reconnecting
export function useSyncOnReconnect(storageKeys: string[]) {
  const { isOnline } = useOfflineStatus()
  const wasOnlineRef = React.useRef(isOnline)

  React.useEffect(() => {
    // If we just came back online
    if (isOnline && !wasOnlineRef.current) {
      storageKeys.forEach((key) => {
        const pendingItems = offlineStorage.getPendingItems(key)
        if (pendingItems.length > 0) {
          // In a real app, this would sync with the server
          console.log(`Syncing ${pendingItems.length} items for ${key}`)

          // Simulate successful sync
          setTimeout(() => {
            offlineStorage.markAsSynced(key)
          }, 1500)
        }
      })
    }

    wasOnlineRef.current = isOnline
  }, [isOnline, storageKeys])
}

// Offline storage utility
export const offlineStorage = {
  // Save items to local storage with encryption for sensitive data
  saveItems: (key: string, items: any[], encrypt = false): void => {
    try {
      const dataToStore = encrypt ? encryption.encrypt(items) : JSON.stringify(items)
      localStorage.setItem(key, dataToStore)
    } catch (error) {
      console.error(`Error saving items to ${key}:`, error)
    }
  },

  // Get items from local storage
  getItems: <T,>(key: string, defaultValue: T[] = []): T[] => {
    try {
      const storedData = localStorage.getItem(key)
      if (!storedData) return defaultValue

      // Check if data is encrypted
      if (encryption.isEncrypted(storedData)) {
        return encryption.decrypt(storedData) || defaultValue
      }

      return JSON.parse(storedData)
    } catch (error) {
      console.error(`Error retrieving items from ${key}:`, error)
      return defaultValue
    }
  },

  // Get items that need to be synced
  getPendingItems: <T extends OfflineItem>(key: string): T[] => {
    const items = offlineStorage.getItems<T>(key)
    return items.filter((item) => item.syncStatus === "pending")
  },

  // Mark all items as synced
  markAsSynced: (key: string): void => {
    try {
      const items = offlineStorage.getItems<OfflineItem>(key)
      const updatedItems = items.map((item) => ({
        ...item,
        syncStatus: "synced",
      }))
      offlineStorage.saveItems(key, updatedItems)
    } catch (error) {
      console.error(`Error marking items as synced in ${key}:`, error)
    }
  },

  // Clear all stored data (for account deletion)
  clearAll: (): void => {
    try {
      localStorage.clear()
    } catch (error) {
      console.error("Error clearing storage:", error)
    }
  },
}

// Hook for using offline storage with a specific key
export function useOfflineStorage<T>(key: string) {
  const saveItem = async (item: T): Promise<void> => {
    try {
      const serializedItem = JSON.stringify(item)
      localStorage.setItem(key, serializedItem)
    } catch (error) {
      console.error("Error saving item:", error)
    }
  }

  const getItem = async (): Promise<T | null> => {
    try {
      const serializedItem = localStorage.getItem(key)
      if (serializedItem === null) {
        return null
      }
      return JSON.parse(serializedItem) as T
    } catch (error) {
      console.error("Error getting item:", error)
      return null
    }
  }

  const removeItem = async (): Promise<void> => {
    try {
      localStorage.removeItem(key)
    } catch (error) {
      console.error("Error removing item:", error)
    }
  }

  return { saveItem, getItem, removeItem }
}
