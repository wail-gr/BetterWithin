"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Pause, Play } from "lucide-react"

interface VoiceMessageProps {
  audioUrl: string
  duration: string
  className?: string
}

export function VoiceMessage({ audioUrl, duration, className = "" }: VoiceMessageProps) {
  const [isPlaying, setIsPlaying] = useState(false)

  const togglePlayback = () => {
    // In a real app, this would control actual audio playback
    setIsPlaying(!isPlaying)

    // If playing, simulate automatic stop after duration
    if (!isPlaying) {
      // Extract seconds from duration string (e.g., "0:45" -> 45)
      const [mins, secs] = duration.split(":").map(Number)
      const durationInMs = (mins * 60 + secs) * 1000

      setTimeout(() => {
        setIsPlaying(false)
      }, durationInMs)
    }
  }

  return (
    <div className={`p-3 rounded-2xl bg-secondary ${className}`}>
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          className={`h-8 w-8 rounded-full ${isPlaying ? "bg-navy-600" : "bg-navy-500"} text-white`}
          onClick={togglePlayback}
        >
          {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </Button>
        <div className="flex-1 h-6 relative">
          <div className="absolute inset-0 flex items-center">
            <div className="audio-wave w-full flex items-end justify-around h-full">
              {Array.from({ length: 30 }).map((_, i) => (
                <div
                  key={i}
                  className={`audio-wave-bar w-1 rounded-full ${
                    isPlaying ? "bg-navy-500 dark:bg-navy-400 animate-pulse" : "bg-gray-300 dark:bg-gray-600"
                  }`}
                  style={{
                    height: `${Math.sin(i * 0.5) * 50 + 30}%`,
                    animationDelay: `${i * 30}ms`,
                  }}
                ></div>
              ))}
            </div>
          </div>
        </div>
        <span className="text-xs">{duration}</span>
      </div>
    </div>
  )
}
