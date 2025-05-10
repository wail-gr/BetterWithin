"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, X } from "lucide-react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"

interface DonationsReminderProps {
  userName?: string
  supportUrl: string // Changed from onDonate function to supportUrl string
  dismissDuration?: number // Days until reminder appears again after dismissal
}

export function DonationsReminder({ userName, supportUrl, dismissDuration = 30 }: DonationsReminderProps) {
  const [isVisible, setIsVisible] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Check if user has dismissed the reminder recently
    const lastDismissed = localStorage.getItem("donationReminderDismissed")
    const hasDonated = localStorage.getItem("hasDonated") === "true"

    if (hasDonated) {
      return // Don't show reminder if user has donated
    }

    if (lastDismissed) {
      const dismissDate = new Date(lastDismissed)
      const currentDate = new Date()
      const daysSinceDismissed = Math.floor((currentDate.getTime() - dismissDate.getTime()) / (1000 * 60 * 60 * 24))

      if (daysSinceDismissed < dismissDuration) {
        return // Don't show reminder if dismissed recently
      }
    }

    // Show reminder after 2 minutes
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 120000) // 2 minutes

    return () => clearTimeout(timer)
  }, [dismissDuration])

  const handleDismiss = () => {
    setIsVisible(false)
    localStorage.setItem("donationReminderDismissed", new Date().toISOString())
  }

  const handleDonate = () => {
    // Navigate to the support page instead of calling a function
    router.push(supportUrl)
  }

  if (!isVisible) return null

  return (
    <motion.div
      className="fixed bottom-4 right-4 z-50 max-w-sm"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="border-teal-200 shadow-lg">
        <CardContent className="p-4">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2"
            onClick={handleDismiss}
            aria-label="Dismiss donation reminder"
          >
            <X className="h-4 w-4" />
          </Button>

          <div className="flex items-start space-x-4">
            <div className="bg-teal-100 p-2 rounded-full">
              <Heart className="h-6 w-6 text-teal-600" />
            </div>
            <div>
              <h3 className="font-medium text-lg">{userName ? `${userName}, help` : "Help"} support BetterWithin</h3>
              <p className="text-sm text-gray-600 mt-1 mb-3">
                Your contribution helps us provide mental health resources to those in need.
              </p>
              <Button onClick={handleDonate} className="bg-teal-500 hover:bg-teal-600">
                Support Us
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
