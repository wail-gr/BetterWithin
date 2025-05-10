"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { RefreshCw } from "lucide-react"

const quotes = [
  {
    text: "You don't have to control your thoughts. You just have to stop letting them control you.",
    author: "Dan Millman",
  },
  {
    text: "Mental health problems don't define who you are. They are something you experience.",
    author: "Roy T. Bennett",
  },
  {
    text: "There is hope, even when your brain tells you there isn't.",
    author: "John Green",
  },
  {
    text: "You are not your illness. You have an individual story to tell. You have a name, a history, a personality.",
    author: "Julian Seifter",
  },
  {
    text: "Self-care is how you take your power back.",
    author: "Lalah Delia",
  },
]

export function MotivationalQuote() {
  const [quote, setQuote] = useState(quotes[0])
  const [isLoading, setIsLoading] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  const getRandomQuote = () => {
    setIsLoading(true)

    // Get a new random index that's different from the current one
    let newIndex
    do {
      newIndex = Math.floor(Math.random() * quotes.length)
    } while (newIndex === currentIndex && quotes.length > 1)

    setCurrentIndex(newIndex)

    setTimeout(() => {
      setQuote(quotes[newIndex])
      setIsLoading(false)
    }, 500)
  }

  useEffect(() => {
    getRandomQuote()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      <AnimatePresence mode="wait">
        <motion.div
          key={quote.text}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <blockquote className="italic text-navy-700 dark:text-navy-300">"{quote.text}"</blockquote>
          <footer className="mt-2 text-sm text-navy-600 dark:text-navy-400">— {quote.author}</footer>
        </motion.div>
      </AnimatePresence>
      <Button
        variant="ghost"
        size="sm"
        className="mt-2 p-0 h-auto text-navy-600 dark:text-navy-400 hover:text-navy-800 dark:hover:text-navy-200"
        onClick={getRandomQuote}
        disabled={isLoading}
      >
        <RefreshCw className={`h-3 w-3 mr-1 ${isLoading ? "animate-spin" : ""}`} />
        <span className="text-xs">New quote</span>
      </Button>
    </div>
  )
}
