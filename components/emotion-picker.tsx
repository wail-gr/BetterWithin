"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface EmotionPickerProps {
  selectedEmotion: string
  onSelectEmotion: (emotion: string) => void
  selectedEmotions?: string[]
  onToggleEmotion?: (emotion: string) => void
}

export function EmotionPicker({
  selectedEmotion,
  onSelectEmotion,
  selectedEmotions = [],
  onToggleEmotion,
}: EmotionPickerProps) {
  const moods = [
    { value: "happy", emoji: "😊", label: "Happy" },
    { value: "sad", emoji: "😔", label: "Sad" },
    { value: "anxious", emoji: "😰", label: "Anxious" },
    { value: "angry", emoji: "😠", label: "Angry" },
    { value: "content", emoji: "😌", label: "Content" },
    { value: "neutral", emoji: "😐", label: "Neutral" },
  ]

  const emotions = [
    // Positive emotions
    "grateful",
    "proud",
    "excited",
    "hopeful",
    "calm",
    "loved",
    "motivated",
    "confident",
    // Negative emotions
    "stressed",
    "worried",
    "disappointed",
    "frustrated",
    "overwhelmed",
    "lonely",
    "tired",
    "confused",
  ]

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap justify-between gap-2 mb-4">
        {moods.map((mood) => (
          <motion.div key={mood.value} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="ghost"
              className={`flex flex-col items-center p-3 ${
                selectedEmotion === mood.value ? "bg-navy-100 text-navy-800" : ""
              }`}
              onClick={() => onSelectEmotion(mood.value)}
            >
              <span className="text-3xl mb-1">{mood.emoji}</span>
              <span className="text-xs">{mood.label}</span>
            </Button>
          </motion.div>
        ))}
      </div>

      {onToggleEmotion && (
        <div>
          <h4 className="text-sm font-medium mb-2">Add specific emotions (optional)</h4>
          <div className="flex flex-wrap gap-2">
            {emotions.map((emotion) => (
              <Badge
                key={emotion}
                variant={selectedEmotions.includes(emotion) ? "default" : "outline"}
                className={`cursor-pointer capitalize ${
                  selectedEmotions.includes(emotion) ? "bg-navy-600 hover:bg-navy-700" : "hover:bg-navy-100"
                }`}
                onClick={() => onToggleEmotion(emotion)}
              >
                {emotion}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
