"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { format } from "date-fns"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Edit, ImageIcon, Lock, MoreHorizontal, Trash, Unlock, Palette } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface JournalEntryProps {
  entry: {
    id: number
    date: Date
    title: string
    content: string
    mood: string
    emotions: string[]
    isLocked: boolean
    hasImage: boolean
    imageUrl?: string
    hasVoice?: boolean
    voiceUrl?: string
    voiceDuration?: string
    color?: string
  }
  onView: () => void
  onEdit: () => void
  onDelete: () => void
  onToggleLock: () => void
  onChangeColor?: (id: number, color: string) => void
}

export function JournalEntry({
  entry,
  onView,
  onEdit,
  onDelete,
  onToggleLock,
  onChangeColor = () => {},
}: JournalEntryProps) {
  const [isColorMenuOpen, setIsColorMenuOpen] = useState(false)

  const truncateContent = (content: string, maxLength = 150) => {
    if (content.length <= maxLength) return content
    return content.substring(0, maxLength) + "..."
  }

  const getMoodEmoji = (mood: string) => {
    switch (mood.toLowerCase()) {
      case "happy":
        return "😊"
      case "sad":
        return "😔"
      case "anxious":
        return "😰"
      case "angry":
        return "😠"
      case "content":
        return "😌"
      default:
        return "😐"
    }
  }

  const getCardColorClass = () => {
    switch (entry.color) {
      case "red":
        return "card-red"
      case "purple":
        return "card-purple"
      case "green":
        return "card-green"
      case "blue":
        return "card-blue"
      case "yellow":
        return "card-yellow"
      case "orange":
        return "card-orange"
      default:
        return ""
    }
  }

  const colorOptions = [
    { name: "Default", value: "" },
    { name: "Rich Red", value: "red", color: "#D44A4A" },
    { name: "Vibrant Purple", value: "purple", color: "#9C5EF7" },
    { name: "Spring Green", value: "green", color: "#A5D6A7" },
    { name: "Sky Blue", value: "blue", color: "#90CAF9" },
    { name: "Golden Yellow", value: "yellow", color: "#FFF176" },
    { name: "Soft Orange", value: "orange", color: "#FFCC80" },
  ]

  const textColorClass = entry.color === "red" || entry.color === "purple" ? "text-white" : ""

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
      className="h-full"
    >
      <Card
        className={`h-full border ${
          entry.isLocked ? "border-amber-200 dark:border-amber-800" : "border-navy-200 dark:border-navy-800"
        } hover:shadow-md transition-shadow cursor-pointer ${getCardColorClass()}`}
        onClick={onView}
      >
        <CardHeader className="pb-2 flex flex-row items-start justify-between">
          <div>
            <h3 className={`font-medium text-lg flex items-center ${textColorClass}`}>
              {entry.isLocked && <Lock className="h-4 w-4 mr-1 text-amber-500" />}
              {entry.title}
            </h3>
            <p className={`text-sm ${textColorClass || "text-gray-500 dark:text-gray-400"} flex items-center`}>
              <Calendar className="h-3 w-3 mr-1" />
              {format(entry.date, "PPP")}
            </p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation()
                  onEdit()
                }}
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation()
                  onToggleLock()
                }}
              >
                {entry.isLocked ? (
                  <>
                    <Unlock className="h-4 w-4 mr-2" />
                    Unlock
                  </>
                ) : (
                  <>
                    <Lock className="h-4 w-4 mr-2" />
                    Lock
                  </>
                )}
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation()
                  setIsColorMenuOpen(!isColorMenuOpen)
                }}
              >
                <Palette className="h-4 w-4 mr-2" />
                Change Color
              </DropdownMenuItem>
              {isColorMenuOpen && (
                <div className="px-2 py-1.5">
                  <div className="grid grid-cols-4 gap-1 mb-1">
                    {colorOptions.map((color) => (
                      <div
                        key={color.value}
                        className={`w-6 h-6 rounded-full cursor-pointer border ${
                          color.value === "" ? "bg-white border-gray-300" : ""
                        }`}
                        style={color.value ? { backgroundColor: color.color } : {}}
                        title={color.name}
                        onClick={(e) => {
                          e.stopPropagation()
                          onChangeColor(entry.id, color.value)
                          setIsColorMenuOpen(false)
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-red-500 focus:text-red-500"
                onClick={(e) => {
                  e.stopPropagation()
                  onDelete()
                }}
              >
                <Trash className="h-4 w-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardHeader>
        <CardContent className="pb-2">
          <div className="flex items-center mb-2">
            <span className="text-xl mr-2">{getMoodEmoji(entry.mood)}</span>
            <Badge
              className={`${
                entry.color === "red" || entry.color === "purple"
                  ? "bg-white text-gray-800"
                  : "bg-navy-100 dark:bg-navy-800 text-navy-700 dark:text-navy-300"
              }`}
            >
              {entry.mood}
            </Badge>
          </div>
          <p
            className={`text-sm ${
              textColorClass || "text-gray-600 dark:text-gray-300"
            } line-clamp-3 whitespace-pre-wrap`}
          >
            {entry.isLocked ? "This entry is private. Click to view." : truncateContent(entry.content)}
          </p>
        </CardContent>
        <CardFooter className="pt-2 flex justify-between">
          <div className="flex flex-wrap gap-1">
            {entry.emotions.slice(0, 2).map((emotion) => (
              <Badge
                key={emotion}
                variant="outline"
                className={`text-xs ${
                  entry.color === "red" || entry.color === "purple"
                    ? "bg-transparent text-white border-white"
                    : "bg-navy-50 dark:bg-navy-900 text-navy-700 dark:text-navy-300"
                }`}
              >
                {emotion}
              </Badge>
            ))}
            {entry.emotions.length > 2 && (
              <Badge
                variant="outline"
                className={`text-xs ${
                  entry.color === "red" || entry.color === "purple"
                    ? "bg-transparent text-white border-white"
                    : "bg-navy-50 dark:bg-navy-900 text-navy-700 dark:text-navy-300"
                }`}
              >
                +{entry.emotions.length - 2}
              </Badge>
            )}
          </div>
          {entry.hasImage && <ImageIcon className={`h-4 w-4 ${textColorClass || "text-gray-400"}`} />}
        </CardFooter>
      </Card>
    </motion.div>
  )
}
