"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Bell, X, ChevronDown, ChevronUp } from "lucide-react"

interface DynamicIslandProps {
  message: string | null
  icon?: React.ReactNode
}

export function DynamicIsland({ message, icon }: DynamicIslandProps) {
  const [isVisible, setIsVisible] = useState(true)
  const [isExpanded, setIsExpanded] = useState(false)
  const [notifications, setNotifications] = useState<string[]>([
    "Welcome to BetterWithin",
    "Your daily challenge is ready",
    "New journal prompt available",
  ])

  useEffect(() => {
    if (message && !notifications.includes(message)) {
      setNotifications([message, ...notifications])
    }
  }, [message])

  if (!isVisible || !message) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -100, opacity: 0 }}
        transition={{ type: "spring", damping: 20, stiffness: 100 }}
        className="dynamic-island fixed top-4 left-1/2 transform -translate-x-1/2 z-50"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center">
            <div className="dynamic-island-icon">{icon || <Bell className="h-4 w-4" />}</div>
            <span className="text-sm">{message}</span>
          </div>
          <div className="flex items-center">
            {isExpanded ? <ChevronUp className="h-4 w-4 ml-2" /> : <ChevronDown className="h-4 w-4 ml-2" />}
            <X
              className="h-4 w-4 ml-2 hover:text-red-400"
              onClick={(e) => {
                e.stopPropagation()
                setIsVisible(false)
              }}
            />
          </div>
        </div>

        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-2 pt-2 border-t border-gray-700"
          >
            <p className="text-xs mb-1">Recent Notifications:</p>
            <ul className="text-xs space-y-1">
              {notifications.slice(0, 3).map((notification, index) => (
                <li key={index} className="flex items-center">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                  {notification}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  )
}
