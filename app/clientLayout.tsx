"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import Navigation from "@/components/navigation"
import { DynamicIsland } from "@/components/dynamic-island"
import { SecurityProvider } from "@/contexts/security-context"
import AppLock from "@/components/app-lock"
import DonationReminder from "@/components/donation-reminder"

interface ClientLayoutProps {
  children: React.ReactNode
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  const pathname = usePathname()
  const [notification, setNotification] = useState<string | null>(null)
  const isAuthPage = pathname?.includes("/auth")

  // Simulate occasional notifications
  useEffect(() => {
    const showRandomNotification = () => {
      const notifications = [
        "New voice message in Community",
        "Daily reflection reminder",
        "New lesson available: Mindfulness",
        "Your friend posted in Community",
      ]
      setNotification(notifications[Math.floor(Math.random() * notifications.length)])

      // Clear notification after 5 seconds
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }

    // Show a notification after 3 seconds
    const timer = setTimeout(showRandomNotification, 3000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <SecurityProvider>
      <AppLock>
        <div className="flex flex-col min-h-screen">
          {notification && <DynamicIsland message={notification} />}
          <main className="flex-1 pb-16 md:pb-0 md:pl-64">
            {children}
            <DonationReminder />
          </main>
          {!isAuthPage && <Navigation />}
        </div>
      </AppLock>
    </SecurityProvider>
  )
}
