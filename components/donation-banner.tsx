"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import { motion } from "framer-motion"

export function DonationBanner() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Show the banner after 30 seconds
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 30000)

    return () => clearTimeout(timer)
  }, [])

  if (!isVisible) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed bottom-20 left-0 right-0 mx-auto w-11/12 max-w-md p-4 rounded-lg bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-lg z-50 frosted-glass"
    >
      <button
        onClick={() => setIsVisible(false)}
        className="absolute top-2 right-2 text-white hover:text-gray-200"
        aria-label="Close donation banner"
      >
        <X size={18} />
      </button>
      <h3 className="font-bold text-lg mb-2">Support BetterWithin</h3>
      <p className="text-sm mb-3">
        Your donation helps us provide mental health resources to those who need them most.
      </p>
      <div className="flex justify-center">
        <Button
          className="bg-white text-purple-600 hover:bg-gray-100"
          onClick={() => window.open("https://example.com/donate", "_blank")}
        >
          Donate Now
        </Button>
      </div>
    </motion.div>
  )
}
