"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { PhoneCall, MessageSquare, Sparkles } from "lucide-react"

export function CrisisSupport() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <motion.div className="space-y-3" variants={container} initial="hidden" animate="show">
      <p className="text-sm text-rose-700 dark:text-rose-300">
        If you're feeling overwhelmed or in crisis, help is available 24/7.
      </p>

      <motion.div variants={item}>
        <Button
          variant="outline"
          className="w-full justify-start gap-2 border-rose-200 dark:border-rose-800 hover:bg-rose-50 dark:hover:bg-rose-900 text-rose-700 dark:text-rose-300"
        >
          <PhoneCall className="h-4 w-4 text-rose-500" />
          <div className="flex flex-col items-start">
            <span className="text-sm font-medium">Crisis Helpline</span>
            <span className="text-xs text-rose-600 dark:text-rose-400">988</span>
          </div>
        </Button>
      </motion.div>

      <motion.div variants={item}>
        <Button
          variant="outline"
          className="w-full justify-start gap-2 border-rose-200 dark:border-rose-800 hover:bg-rose-50 dark:hover:bg-rose-900 text-rose-700 dark:text-rose-300"
        >
          <MessageSquare className="h-4 w-4 text-rose-500" />
          <div className="flex flex-col items-start">
            <span className="text-sm font-medium">Text Support</span>
            <span className="text-xs text-rose-600 dark:text-rose-400">Text HOME to 741741</span>
          </div>
        </Button>
      </motion.div>

      <motion.div variants={item}>
        <Button
          variant="outline"
          className="w-full justify-start gap-2 border-rose-200 dark:border-rose-800 hover:bg-rose-50 dark:hover:bg-rose-900 text-rose-700 dark:text-rose-300"
        >
          <Sparkles className="h-4 w-4 text-rose-500" />
          <div className="flex flex-col items-start">
            <span className="text-sm font-medium">Calm Down</span>
            <span className="text-xs text-rose-600 dark:text-rose-400">Guided breathing exercise</span>
          </div>
        </Button>
      </motion.div>
    </motion.div>
  )
}
