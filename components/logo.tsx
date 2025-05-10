"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"

interface LogoProps {
  size?: "sm" | "md" | "lg"
}

export function Logo({ size = "md" }: LogoProps) {
  const sizes = {
    sm: { width: 24, height: 24 },
    md: { width: 32, height: 32 },
    lg: { width: 48, height: 48 },
  }

  const { width, height } = sizes[size]

  return (
    <Link href="/">
      <motion.div
        className="logo"
        initial={{ opacity: 0, scale: 0.5, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <Image src="/images/logo.png" alt="BetterWithin Logo" width={width} height={height} className="rounded-md" />
      </motion.div>
    </Link>
  )
}
