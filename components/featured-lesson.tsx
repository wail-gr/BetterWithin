"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { BookOpen, Video, Headphones, Clock, Play, ArrowRight } from "lucide-react"
import Link from "next/link"

interface FeaturedLessonProps {
  lesson: {
    id: number
    title: string
    description: string
    type: string
    duration: string
    category: string
    level: string
    image: string
    author: {
      name: string
      role: string
      avatar: string
    }
    tags: string[]
  }
}

export function FeaturedLesson({ lesson }: FeaturedLessonProps) {
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
        return "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300"
      case "Emotional Intelligence":
        return "bg-rose-100 text-rose-700 dark:bg-rose-900 dark:text-rose-300"
      case "Social Skills":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
      case "Self-Care":
        return "bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300"
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  return (
    <Card className="border border-navy-200 dark:border-navy-800 overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="relative aspect-video md:aspect-auto">
          <img src={lesson.image || "/placeholder.svg"} alt={lesson.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-center justify-center">
            <Button size="icon" className="h-16 w-16 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30">
              <Play className="h-8 w-8 text-white" />
            </Button>
          </div>
          <Badge className={`absolute top-2 left-2 ${getCategoryColor(lesson.category)}`}>{lesson.category}</Badge>
        </div>
        <div className="p-6">
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="outline" className="flex items-center gap-1">
              {getTypeIcon(lesson.type)}
              <span className="capitalize">{lesson.type} Lesson</span>
            </Badge>
            <Badge variant="outline" className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {lesson.duration}
            </Badge>
          </div>
          <h2 className="text-2xl font-bold mb-2">{lesson.title}</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-4">{lesson.description}</p>
          <div className="flex items-center gap-3 mb-4">
            <Avatar>
              <AvatarImage src={lesson.author.avatar || "/placeholder.svg"} alt={lesson.author.name} />
              <AvatarFallback>{lesson.author.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{lesson.author.name}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{lesson.author.role}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mb-4">
            {lesson.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                #{tag}
              </Badge>
            ))}
          </div>
          <Button asChild className="w-full bg-navy-600 hover:bg-navy-700">
            <Link href={`/lessons/${lesson.id}`} className="flex items-center justify-center">
              Start Featured Lesson
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </Card>
  )
}
