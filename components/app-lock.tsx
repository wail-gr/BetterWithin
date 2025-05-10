"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { LockKeyhole } from "lucide-react"
import { useSecurity } from "@/contexts/security-context"

interface AppLockProps {
  children: React.ReactNode
}

export default function AppLock({ children }: AppLockProps) {
  const [loading, setLoading] = useState(true)
  const { unlock } = useSecurity()

  // Automatically unlock after a brief delay
  useEffect(() => {
    const timer = setTimeout(() => {
      unlock()
      setLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [unlock])

  if (!loading) {
    return <>{children}</>
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-gradient-to-b from-navy-900 to-navy-950 flex flex-col items-center justify-center p-4 z-50"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-center"
      >
        <div className="flex justify-center mb-6">
          <div className="h-20 w-20 rounded-full bg-navy-800 flex items-center justify-center">
            <LockKeyhole className="h-10 w-10 text-white" />
          </div>
        </div>
        <h1 className="text-2xl font-bold text-white mb-2">BetterWithin</h1>
        <p className="text-navy-300 mb-8">Your mental health companion</p>

        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 1.5 }}
          className="h-1 bg-blue-500 rounded-full"
        />

        <p className="text-navy-400 text-sm mt-4">Loading your secure environment...</p>
      </motion.div>
    </motion.div>
  )
}
