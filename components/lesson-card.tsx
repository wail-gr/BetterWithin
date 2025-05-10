"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { BookOpen, Video, Headphones, BookmarkPlus, Play } from "lucide-react"
import Link from "next/link"

interface LessonCardProps {
  lesson: {
    id: number
    title: string
    description: string
    type: string
    duration: string
    category: string
    level: string
    completed: boolean
    progress: number
    image: string
    author: {
      name: string
      role: string
      avatar: string
    }
    tags: string[]
  }
}

export function LessonCard({ lesson }: LessonCardProps) {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case "text":
        return <BookOpen className="h-4 w-4" />
      case "video":
        return <Video className="h-4 w-4" />
      case "audio":
        return <Headphones className="h-4 w-4" />
      default:
        return <BookOpen className="h-4 w-4" />
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Mental Health":
        return "bg-purple-100 text-purple-700"
      case "Emotional Intelligence":
        return "bg-rose-100 text-rose-700"
      case "Social Skills":
        return "bg-blue-100 text-blue-700"
      case "Self-Care":
        return "bg-amber-100 text-amber-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  return (
    <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }} className="floating-card">
      <Card className="h-full border border-navy-200 hover:shadow-md transition-shadow overflow-hidden">
        <div className="aspect-video relative overflow-hidden">
          <img src={lesson.image || "/placeholder.svg"} alt={lesson.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
            <Button size="icon" className="rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30">
              <Play className="h-5 w-5 text-white" />
            </Button>
          </div>
          <Badge className={`absolute top-2 left-2 ${getCategoryColor(lesson.category)}`}>{lesson.category}</Badge>
          <Badge className="absolute top-2 right-2 flex items-center gap-1" variant="outline">
            {getTypeIcon(lesson.type)}
            {lesson.duration}
          </Badge>
        </div>
        <CardHeader className="pb-2">
          <CardTitle className="line-clamp-1">{lesson.title}</CardTitle>
        </CardHeader>
        <CardContent className="pb-2">
          <p className="text-sm text-gray-500 line-clamp-2 mb-3">{lesson.description}</p>
          <div className="flex items-center justify-between text-xs mb-2">
            <Badge variant="outline">{lesson.level}</Badge>
            <div className="flex items-center">
              <img
                src={lesson.author.avatar || "/placeholder.svg"}
                alt={lesson.author.name}
                className="h-5 w-5 rounded-full mr-1"
              />
              <span className="text-gray-500">{lesson.author.name}</span>
            </div>
          </div>
          {lesson.progress > 0 && (
            <div className="mt-2">
              <div className="flex items-center justify-between mb-1 text-xs">
                <span className="text-gray-500">Progress</span>
                <span className="font-medium">{lesson.progress}%</span>
              </div>
              <Progress value={lesson.progress} className="h-1" />
            </div>
          )}
        </CardContent>
        <CardFooter className="pt-2 flex justify-between">
          <Button variant="ghost" size="sm" className="p-0">
            <BookmarkPlus className="h-4 w-4" />
          </Button>
          <Button asChild>
            <Link href={`/lessons/${lesson.id}`}>Start Lesson</Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
