"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function UserGreeting() {
  const [greeting, setGreeting] = useState("")
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date())
    }, 60000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const hour = time.getHours()
    if (hour < 12) {
      setGreeting("Good morning")
    } else if (hour < 18) {
      setGreeting("Good afternoon")
    } else {
      setGreeting("Good evening")
    }
  }, [time])

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Card className="bg-gradient-to-r from-navy-700 to-navy-900 text-white border-none overflow-hidden">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16 border-2 border-white">
              <AvatarImage src="/placeholder.svg?height=64&width=64" alt="User avatar" />
              <AvatarFallback className="bg-white text-navy-700">JD</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-lg font-medium text-navy-100">{greeting},</p>
              <h1 className="text-2xl font-bold">Jamie</h1>
              <p className="text-sm text-navy-200 mt-1">How are you feeling today?</p>
            </div>
          </div>
          <motion.div
            className="absolute -bottom-16 -right-16 w-64 h-64 rounded-full bg-navy-600/20"
            animate={{
              scale: [1, 1.05, 1],
              opacity: [0.2, 0.3, 0.2],
            }}
            transition={{
              duration: 8,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          />
          <motion.div
            className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full bg-navy-500/20"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 6,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              delay: 1,
            }}
          />
        </CardContent>
      </Card>
    </motion.div>
  )
}
