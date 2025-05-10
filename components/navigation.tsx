"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { Book, Home, Users, BookOpen, BarChart } from "lucide-react"
import { cn } from "@/lib/utils"
import { useMobile } from "@/hooks/use-mobile"

export default function Navigation() {
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)
  const isMobile = useMobile()

  useEffect(() => {
    setMounted(true)
  }, [])

  const links = [
    { href: "/", label: "Home", icon: Home },
    { href: "/lessons", label: "Lessons", icon: BookOpen },
    { href: "/community", label: "Community", icon: Users },
    { href: "/progress", label: "Progress", icon: BarChart },
    { href: "/journal", label: "Journal", icon: Book },
  ]

  if (!mounted) return null

  return (
    <>
      {/* Desktop sidebar */}
      <motion.div
        initial={{ x: -280 }}
        animate={{ x: 0 }}
        transition={{ type: "spring", damping: 20, stiffness: 100 }}
        className="fixed left-0 top-0 bottom-0 hidden md:flex flex-col w-64 p-4 border-r border-elegant-200 bg-background"
      >
        <div className="mb-8 flex justify-center">
          <span className="font-bold text-xl" style={{ color: "#000080" }}>
            BetterWithin
          </span>
        </div>

        <nav className="space-y-1 flex-1">
          {links.map((link) => {
            const Icon = link.icon
            const isActive = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors",
                  isActive ? "bg-navy-100 text-navy-700" : "text-gray-600 hover:bg-gray-100",
                )}
              >
                <Icon className="h-5 w-5" />
                <span>{link.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute left-0 w-1 h-8 bg-navy-600 rounded-r-full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                )}
              </Link>
            )
          })}
        </nav>
      </motion.div>

      {/* Mobile bottom navigation - frosted glass style */}
      {isMobile && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", damping: 20, stiffness: 100 }}
          className="fixed bottom-0 left-0 right-0 z-50 backdrop-blur-lg bg-white/80 border-t border-elegant-200 frosted-glass"
        >
          <div className="flex justify-around items-center h-16">
            {links.map((link) => {
              const Icon = link.icon
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "flex flex-col items-center justify-center w-full h-full text-xs",
                    isActive ? "text-navy-700" : "text-gray-600",
                  )}
                >
                  <Icon className="h-5 w-5 mb-1" />
                  <span>{link.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="mobile-nav-indicator"
                      className="absolute bottom-0 h-0.5 w-10 bg-navy-600 rounded-full"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                </Link>
              )
            })}
          </div>
        </motion.div>
      )}
    </>
  )
}
