"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/hooks/use-toast"
import { BookOpen, Video, Headphones, CheckCircle, Clock, Award, ArrowRight, Play, Bookmark } from "lucide-react"

const mockLessons = [
  {
    id: 1,
    title: "Understanding Your Emotions",
    description: "Learn to identify and process your emotions in a healthy way",
    type: "text",
    duration: "5 min",
    category: "Emotional Intelligence",
    completed: false,
    progress: 0,
    content:
      "Emotions are signals that help us understand our internal state and navigate our external world. In this lesson, we'll explore how to identify different emotions, understand their triggers, and develop healthy coping mechanisms.",
    steps: [
      "Recognize the physical sensations associated with emotions",
      "Identify common triggers for different emotional responses",
      "Learn techniques to process emotions without judgment",
      "Practice expressing emotions in constructive ways",
    ],
  },
  {
    id: 2,
    title: "Mindfulness Meditation Basics",
    description: "A simple guide to starting a mindfulness practice",
    type: "audio",
    duration: "8 min",
    category: "Mental Health",
    completed: true,
    progress: 100,
    content:
      "Mindfulness meditation is a powerful practice that helps you stay present and engaged with your current experience. This guided session will introduce you to the fundamentals of mindfulness meditation.",
    steps: [
      "Find a comfortable seated position",
      "Focus on your breath as an anchor",
      "Notice thoughts without judgment",
      "Gently return to your breath when your mind wanders",
    ],
  },
  {
    id: 3,
    title: "Building Healthy Relationships",
    description: "Tips for creating and maintaining positive connections",
    type: "video",
    duration: "12 min",
    category: "Social Skills",
    completed: false,
    progress: 45,
    content:
      "Healthy relationships are essential for our wellbeing. This video explores the foundations of positive relationships, including communication, boundaries, and mutual respect.",
    steps: [
      "Understand the components of healthy relationships",
      "Learn effective communication techniques",
      "Practice setting and respecting boundaries",
      "Develop conflict resolution skills",
    ],
  },
  {
    id: 4,
    title: "Stress Management Techniques",
    description: "Practical strategies to reduce and manage stress",
    type: "text",
    duration: "7 min",
    category: "Mental Health",
    completed: false,
    progress: 0,
    content:
      "Stress is a natural response to challenging situations, but chronic stress can impact your health. This lesson provides practical techniques to manage stress effectively.",
    steps: [
      "Identify your personal stress triggers",
      "Learn quick stress-reduction techniques",
      "Develop a long-term stress management plan",
      "Practice preventative self-care",
    ],
  },
  {
    id: 5,
    title: "Positive Self-Talk",
    description: "Transform your inner dialogue for better mental health",
    type: "audio",
    duration: "10 min",
    category: "Emotional Intelligence",
    completed: false,
    progress: 0,
    content:
      "The way we talk to ourselves shapes our perception and experiences. This guided audio will help you recognize negative self-talk patterns and replace them with positive, supportive inner dialogue.",
    steps: [
      "Recognize negative thought patterns",
      "Challenge unhelpful thoughts",
      "Create positive affirmations",
      "Practice compassionate self-talk",
    ],
  },
]

export function DailyLesson() {
  const [activeLesson, setActiveLesson] = useState(mockLessons[0])
  const [activeTab, setActiveTab] = useState("all")
  const [isCompleting, setIsCompleting] = useState(false)
  const { toast } = useToast()

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

  const getTypeMedia = (type: string) => {
    switch (type) {
      case "text":
        return (
          <div className="bg-navy-50 dark:bg-navy-900 rounded-lg p-6 mb-4">
            <p className="text-navy-800 dark:text-navy-100">{activeLesson.content}</p>
            <ul className="mt-4 space-y-2">
              {activeLesson.steps.map((step, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-navy-100 dark:bg-navy-800 text-navy-800 dark:text-navy-100 text-xs font-medium">
                    {index + 1}
                  </span>
                  <span className="text-navy-700 dark:text-navy-200">{step}</span>
                </li>
              ))}
            </ul>
          </div>
        )
      case "video":
        return (
          <div className="aspect-video bg-navy-900 rounded-lg flex items-center justify-center mb-4 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-navy-800/50 to-navy-950/80 flex items-center justify-center">
              <Button
                size="icon"
                className="h-16 w-16 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all"
              >
                <Play className="h-8 w-8 text-white" />
              </Button>
            </div>
            <Video className="h-12 w-12 text-navy-400 opacity-0" />
          </div>
        )
      case "audio":
        return (
          <div className="bg-navy-50 dark:bg-navy-900 rounded-lg p-6 mb-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Button size="icon" className="h-12 w-12 rounded-full bg-navy-600 hover:bg-navy-700">
                  <Play className="h-6 w-6 text-white" />
                </Button>
                <div>
                  <p className="font-medium text-navy-800 dark:text-navy-100">Guided Meditation</p>
                  <p className="text-sm text-navy-600 dark:text-navy-300">{activeLesson.duration}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Bookmark className="h-5 w-5" />
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <div className="relative h-2 w-full rounded-full bg-navy-200 dark:bg-navy-700">
                <div
                  className="absolute h-full rounded-full bg-navy-600"
                  style={{ width: `${activeLesson.progress}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-xs text-navy-600 dark:text-navy-300">
                <span>0:00</span>
                <span>{activeLesson.duration}</span>
              </div>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  const handleMarkComplete = async () => {
    setIsCompleting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Update the lesson
    const updatedLessons = mockLessons.map((lesson) =>
      lesson.id === activeLesson.id ? { ...lesson, completed: true, progress: 100 } : lesson,
    )

    // Update the active lesson
    setActiveLesson({ ...activeLesson, completed: true, progress: 100 })

    toast({
      title: "Lesson completed!",
      description: "Your progress has been saved.",
    })

    setIsCompleting(false)
  }

  const filteredLessons =
    activeTab === "all"
      ? mockLessons
      : mockLessons.filter((lesson) => lesson.category.toLowerCase() === activeTab.toLowerCase())

  return (
    <div className="space-y-6">
      <Card className="border border-elegant-200 dark:border-elegant-800 shadow-sm overflow-hidden">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="flex items-center">
                <BookOpen className="mr-2 h-5 w-5 text-navy-600 dark:text-navy-400" />
                Today's Lesson
              </CardTitle>
              <CardDescription>Daily wisdom to help you grow</CardDescription>
            </div>
            <Badge
              variant="outline"
              className="flex items-center gap-1 bg-navy-50 dark:bg-navy-900 text-navy-700 dark:text-navy-300"
            >
              <Clock className="h-3 w-3" />
              {activeLesson.duration}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            key={activeLesson.id}
          >
            <h3 className="text-xl font-semibold mb-2 text-navy-800 dark:text-navy-100">{activeLesson.title}</h3>
            <p className="text-elegant-600 dark:text-elegant-300 mb-4">{activeLesson.description}</p>

            {getTypeMedia(activeLesson.type)}

            <div className="flex items-center justify-between mb-4">
              <Badge className="bg-navy-100 dark:bg-navy-800 text-navy-700 dark:text-navy-300 hover:bg-navy-200 dark:hover:bg-navy-700">
                {activeLesson.category}
              </Badge>

              <div className="flex items-center gap-2">
                <span className="text-sm text-elegant-600 dark:text-elegant-300">Progress:</span>
                <div className="w-32 h-2 bg-elegant-200 dark:bg-elegant-700 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-navy-600 dark:bg-navy-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${activeLesson.progress}%` }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </CardContent>
        <CardFooter className="border-t border-elegant-200 dark:border-elegant-800 pt-4">
          <Button
            className="w-full bg-navy-600 hover:bg-navy-700 text-white"
            onClick={handleMarkComplete}
            disabled={activeLesson.completed || isCompleting}
          >
            {isCompleting ? (
              <span className="flex items-center">
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Completing...
              </span>
            ) : activeLesson.completed ? (
              <span className="flex items-center">
                <CheckCircle className="mr-2 h-4 w-4" />
                Completed
              </span>
            ) : (
              "Mark as Complete"
            )}
          </Button>
        </CardFooter>
      </Card>

      <Card className="border border-elegant-200 dark:border-elegant-800 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Award className="mr-2 h-5 w-5 text-navy-600 dark:text-navy-400" />
            More Lessons
          </CardTitle>
          <CardDescription>Continue your learning journey</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3 mb-4">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="Mental Health">Mental Health</TabsTrigger>
              <TabsTrigger value="Emotional Intelligence">Emotional</TabsTrigger>
            </TabsList>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <TabsContent value={activeTab} className="space-y-4 mt-0">
                  {filteredLessons.map((lesson) => (
                    <motion.div
                      key={lesson.id}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      className="flex items-start gap-3 p-3 rounded-lg border border-elegant-200 dark:border-elegant-800 cursor-pointer hover:bg-elegant-50 dark:hover:bg-elegant-900 transition-colors"
                      onClick={() => setActiveLesson(lesson)}
                    >
                      <div
                        className={`${
                          lesson.type === "text"
                            ? "bg-navy-100 dark:bg-navy-800 text-navy-700 dark:text-navy-300"
                            : lesson.type === "video"
                              ? "bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300"
                              : "bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300"
                        } p-2 rounded-md`}
                      >
                        {getTypeIcon(lesson.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h4 className="font-medium text-navy-800 dark:text-navy-100">{lesson.title}</h4>
                          {lesson.completed && <CheckCircle className="h-4 w-4 text-green-500" />}
                        </div>
                        <p className="text-sm text-elegant-600 dark:text-elegant-300">{lesson.description}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="secondary" className="text-xs">
                            {lesson.category}
                          </Badge>
                          <span className="text-xs text-elegant-500 dark:text-elegant-400 flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {lesson.duration}
                          </span>
                        </div>
                        {lesson.progress > 0 && lesson.progress < 100 && (
                          <div className="mt-2">
                            <Progress value={lesson.progress} className="h-1" />
                          </div>
                        )}
                      </div>
                      <ArrowRight className="h-4 w-4 text-elegant-400 self-center" />
                    </motion.div>
                  ))}
                </TabsContent>
              </motion.div>
            </AnimatePresence>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
