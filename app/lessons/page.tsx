"use client"

import type React from "react"

import { useState, Suspense } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  ArrowLeft,
  BookOpen,
  Search,
  Clock,
  Filter,
  Star,
  ArrowRight,
  Award,
  Sparkles,
  Brain,
  Heart,
  Users,
} from "lucide-react"
import Link from "next/link"
import { LessonCard } from "@/components/lesson-card"
import { FeaturedLesson } from "@/components/featured-lesson"
import { LessonFilters } from "@/components/lesson-filters"
import DonationReminder from "@/components/donation-reminder"
import { AIRecommendations } from "@/components/ai-recommendations"
import { useAIRecommendations } from "@/hooks/use-ai-recommendations"

// Mock data for lessons
const mockLessons = [
  {
    id: "1",
    title: "Understanding Your Emotions",
    description: "Learn to identify and process your emotions in a healthy way",
    type: "text",
    duration: "15 min",
    category: "Emotional Intelligence",
    level: "Beginner",
    completed: false,
    progress: 0,
    image: "/placeholder.svg?height=200&width=400",
    author: {
      name: "Dr. Sarah Johnson",
      role: "Clinical Psychologist",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    tags: ["emotions", "self-awareness", "mental health"],
    featured: true,
    popular: true,
  },
  {
    id: "2",
    title: "Mindfulness Meditation Basics",
    description: "A simple guide to starting a mindfulness practice",
    type: "audio",
    duration: "8 min",
    category: "Mental Health",
    level: "Beginner",
    completed: true,
    progress: 100,
    image: "/placeholder.svg?height=200&width=400",
    author: {
      name: "Michael Chen",
      role: "Meditation Instructor",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    tags: ["mindfulness", "meditation", "stress-relief"],
    featured: false,
    popular: true,
  },
  {
    id: "3",
    title: "Building Healthy Relationships",
    description: "Tips for creating and maintaining positive connections",
    type: "video",
    duration: "12 min",
    category: "Social Skills",
    level: "Intermediate",
    completed: false,
    progress: 45,
    image: "/placeholder.svg?height=200&width=400",
    author: {
      name: "Lisa Martinez",
      role: "Relationship Counselor",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    tags: ["relationships", "communication", "boundaries"],
    featured: true,
    popular: false,
  },
  {
    id: "4",
    title: "Stress Management Techniques",
    description: "Practical strategies to reduce and manage stress",
    type: "text",
    duration: "20 min",
    category: "Mental Health",
    level: "Beginner",
    completed: false,
    progress: 0,
    image: "/placeholder.svg?height=200&width=400",
    author: {
      name: "Dr. James Wilson",
      role: "Stress Management Specialist",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    tags: ["stress", "coping", "relaxation"],
    featured: false,
    popular: true,
  },
  {
    id: "5",
    title: "Positive Self-Talk",
    description: "Transform your inner dialogue for better mental health",
    type: "audio",
    duration: "10 min",
    category: "Emotional Intelligence",
    level: "Intermediate",
    completed: false,
    progress: 0,
    image: "/placeholder.svg?height=200&width=400",
    author: {
      name: "Emma Thompson",
      role: "Cognitive Behavioral Therapist",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    tags: ["self-talk", "positivity", "cognitive"],
    featured: false,
    popular: false,
  },
  {
    id: "6",
    title: "Understanding Anxiety",
    description: "Learn about anxiety triggers and coping mechanisms",
    type: "video",
    duration: "18 min",
    category: "Mental Health",
    level: "Intermediate",
    completed: false,
    progress: 0,
    image: "/placeholder.svg?height=200&width=400",
    author: {
      name: "Dr. Robert Kim",
      role: "Psychiatrist",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    tags: ["anxiety", "mental health", "coping"],
    featured: false,
    popular: true,
  },
  {
    id: "7",
    title: "Conflict Resolution Skills",
    description: "Effective strategies for resolving interpersonal conflicts",
    type: "text",
    duration: "25 min",
    category: "Social Skills",
    level: "Advanced",
    completed: false,
    progress: 0,
    image: "/placeholder.svg?height=200&width=400",
    author: {
      name: "David Patel",
      role: "Communication Specialist",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    tags: ["conflict", "communication", "relationships"],
    featured: false,
    popular: false,
  },
  {
    id: "8",
    title: "Sleep Hygiene Fundamentals",
    description: "Improve your sleep quality with these evidence-based practices",
    type: "audio",
    duration: "15 min",
    category: "Self-Care",
    level: "Beginner",
    completed: false,
    progress: 0,
    image: "/placeholder.svg?height=200&width=400",
    author: {
      name: "Dr. Sophia Lee",
      role: "Sleep Specialist",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    tags: ["sleep", "health", "habits"],
    featured: true,
    popular: true,
  },
  {
    id: "9",
    title: "Developing Emotional Resilience",
    description: "Build your capacity to adapt to stress and adversity",
    type: "video",
    duration: "22 min",
    category: "Emotional Intelligence",
    level: "Advanced",
    completed: false,
    progress: 0,
    image: "/placeholder.svg?height=200&width=400",
    author: {
      name: "Dr. Marcus Johnson",
      role: "Resilience Researcher",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    tags: ["resilience", "emotional health", "stress"],
    featured: false,
    popular: false,
  },
  {
    id: "10",
    title: "Practicing Gratitude",
    description: "Simple exercises to cultivate gratitude in daily life",
    type: "text",
    duration: "10 min",
    category: "Self-Care",
    level: "Beginner",
    completed: false,
    progress: 0,
    image: "/placeholder.svg?height=200&width=400",
    author: {
      name: "Olivia Garcia",
      role: "Positive Psychology Coach",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    tags: ["gratitude", "positivity", "wellbeing"],
    featured: false,
    popular: true,
  },
  {
    id: "11",
    title: "Setting Healthy Boundaries",
    description: "Learn to establish and maintain personal boundaries",
    type: "video",
    duration: "16 min",
    category: "Social Skills",
    level: "Intermediate",
    completed: false,
    progress: 0,
    image: "/placeholder.svg?height=200&width=400",
    author: {
      name: "Natalie Wong",
      role: "Therapist",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    tags: ["boundaries", "relationships", "self-care"],
    featured: false,
    popular: false,
  },
  {
    id: "12",
    title: "Overcoming Negative Thought Patterns",
    description: "Techniques to identify and challenge negative thinking",
    type: "audio",
    duration: "14 min",
    category: "Emotional Intelligence",
    level: "Intermediate",
    completed: false,
    progress: 0,
    image: "/placeholder.svg?height=200&width=400",
    author: {
      name: "Dr. Thomas Brown",
      role: "Cognitive Psychologist",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    tags: ["thoughts", "cognitive", "mental health"],
    featured: true,
    popular: false,
  },
]

// Categories with icons
const categories = [
  {
    name: "Mental Health",
    icon: <Brain className="h-4 w-4" />,
    color: "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300",
  },
  {
    name: "Emotional Intelligence",
    icon: <Heart className="h-4 w-4" />,
    color: "bg-rose-100 text-rose-700 dark:bg-rose-900 dark:text-rose-300",
  },
  {
    name: "Social Skills",
    icon: <Users className="h-4 w-4" />,
    color: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
  },
  {
    name: "Self-Care",
    icon: <Sparkles className="h-4 w-4" />,
    color: "bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300",
  },
  {
    name: "All Categories",
    icon: <BookOpen className="h-4 w-4" />,
    color: "bg-navy-100 text-navy-700 dark:bg-navy-900 dark:text-navy-300",
  },
]

export default function LessonsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("All Categories")
  const [showFilters, setShowFilters] = useState(false)
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [selectedLevels, setSelectedLevels] = useState<string[]>([])
  const [selectedDuration, setSelectedDuration] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("all")

  // Use the AI recommendation hook
  const {
    recommendations,
    loading: aiLoading,
    error: aiError,
    updateUserState,
    updateEmotionalState,
  } = useAIRecommendations({
    interests: ["mindfulness", "anxiety", "stress-relief"],
    emotionalState: "neutral",
    activityLevel: 5,
    availableTime: 20,
  })

  // Get recommendations when search query changes
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value
    setSearchQuery(query)

    if (query.length > 2) {
      // Update interests in user state to get better recommendations
      updateUserState({
        interests: [query, ...query.split(" ")],
      })
    }
  }

  // Filter lessons based on search query, category, and filters
  const filteredLessons = mockLessons.filter((lesson) => {
    // Search filter
    const matchesSearch =
      lesson.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lesson.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lesson.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    // Category filter
    const matchesCategory = activeCategory === "All Categories" || lesson.category === activeCategory

    // Type filter
    const matchesType = selectedTypes.length === 0 || selectedTypes.includes(lesson.type)

    // Level filter
    const matchesLevel = selectedLevels.length === 0 || selectedLevels.includes(lesson.level)

    // Duration filter
    let matchesDuration = true
    if (selectedDuration) {
      const duration = Number.parseInt(lesson.duration)
      if (selectedDuration === "short") {
        matchesDuration = duration <= 10
      } else if (selectedDuration === "medium") {
        matchesDuration = duration > 10 && duration <= 20
      } else if (selectedDuration === "long") {
        matchesDuration = duration > 20
      }
    }

    // Tab filter
    if (activeTab === "featured") {
      return matchesSearch && matchesCategory && matchesType && matchesLevel && matchesDuration && lesson.featured
    } else if (activeTab === "popular") {
      return matchesSearch && matchesCategory && matchesType && matchesLevel && matchesDuration && lesson.popular
    } else if (activeTab === "completed") {
      return matchesSearch && matchesCategory && matchesType && matchesLevel && matchesDuration && lesson.completed
    } else if (activeTab === "in-progress") {
      return (
        matchesSearch &&
        matchesCategory &&
        matchesType &&
        matchesLevel &&
        matchesDuration &&
        lesson.progress > 0 &&
        lesson.progress < 100
      )
    }

    return matchesSearch && matchesCategory && matchesType && matchesLevel && matchesDuration
  })

  // Featured lessons
  const featuredLessons = mockLessons.filter((lesson) => lesson.featured)

  // Toggle filter for types
  const toggleTypeFilter = (type: string) => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes(selectedTypes.filter((t) => t !== type))
    } else {
      setSelectedTypes([...selectedTypes, type])
    }
  }

  // Toggle filter for levels
  const toggleLevelFilter = (level: string) => {
    if (selectedLevels.includes(level)) {
      setSelectedLevels(selectedLevels.filter((l) => l !== level))
    } else {
      setSelectedLevels([...selectedLevels, level])
    }
  }

  // Update category and emotional state
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category)

    // Map category to emotional state for better recommendations
    let emotionalState = "neutral"
    switch (category) {
      case "Mental Health":
        emotionalState = "anxious"
        break
      case "Emotional Intelligence":
        emotionalState = "reflective"
        break
      case "Social Skills":
        emotionalState = "social"
        break
      case "Self-Care":
        emotionalState = "calm"
        break
    }

    updateEmotionalState(emotionalState)
  }

  return (
    <div className="container max-w-6xl mx-auto px-4 py-6 md:py-10">
      <Button variant="ghost" size="sm" asChild className="mb-4">
        <Link href="/" className="flex items-center gap-1">
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Link>
      </Button>

      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2 flex items-center">
          <BookOpen className="mr-2 h-6 w-6 text-navy-600 dark:text-navy-400" />
          Lessons
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          Explore our collection of lessons designed to help you grow and improve your mental wellbeing
        </p>
      </div>

      {/* Featured Lesson */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <Star className="mr-2 h-5 w-5 text-amber-500" />
          Featured Lesson
        </h2>
        <FeaturedLesson lesson={featuredLessons[0]} />
      </div>

      {/* Search and Filters */}
      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input placeholder="Search lessons..." className="pl-10" value={searchQuery} onChange={handleSearch} />
          {aiLoading && searchQuery.length > 2 && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <div className="animate-spin h-4 w-4 border-2 border-navy-600 border-t-transparent rounded-full"></div>
            </div>
          )}
        </div>
        <Button variant="outline" className="flex items-center gap-2" onClick={() => setShowFilters(!showFilters)}>
          <Filter className="h-4 w-4" />
          Filters
          {(selectedTypes.length > 0 || selectedLevels.length > 0 || selectedDuration) && (
            <Badge className="ml-1 bg-navy-600">
              {selectedTypes.length + selectedLevels.length + (selectedDuration ? 1 : 0)}
            </Badge>
          )}
        </Button>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((category) => (
          <Button
            key={category.name}
            variant="outline"
            size="sm"
            className={`flex items-center gap-1 ${
              activeCategory === category.name ? "bg-navy-100 dark:bg-navy-800 text-navy-700 dark:text-navy-300" : ""
            }`}
            onClick={() => handleCategoryChange(category.name)}
          >
            <span className={`p-1 rounded-full ${category.color}`}>{category.icon}</span>
            {category.name}
          </Button>
        ))}
      </div>

      {/* Filters */}
      {showFilters && (
        <LessonFilters
          selectedTypes={selectedTypes}
          toggleTypeFilter={toggleTypeFilter}
          selectedLevels={selectedLevels}
          toggleLevelFilter={toggleLevelFilter}
          selectedDuration={selectedDuration}
          setSelectedDuration={setSelectedDuration}
        />
      )}

      {/* Tabs */}
      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList>
          <TabsTrigger value="all">All Lessons</TabsTrigger>
          <TabsTrigger value="featured">Featured</TabsTrigger>
          <TabsTrigger value="popular">Popular</TabsTrigger>
          <TabsTrigger value="in-progress">In Progress</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Lessons Grid */}
      {filteredLessons.length === 0 ? (
        <div className="text-center py-12">
          <BookOpen className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-medium mb-2">No lessons found</h3>
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            Try adjusting your search or filters to find what you're looking for
          </p>
          <Button
            variant="outline"
            onClick={() => {
              setSearchQuery("")
              setActiveCategory("All Categories")
              setSelectedTypes([])
              setSelectedLevels([])
              setSelectedDuration(null)
              setActiveTab("all")
            }}
          >
            Clear all filters
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLessons.map((lesson) => (
            <LessonCard key={lesson.id} lesson={lesson} />
          ))}
        </div>
      )}

      {/* Learning Path Section */}
      <div className="mt-12">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <Award className="mr-2 h-5 w-5 text-navy-600" />
          Learning Paths
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border border-navy-200 dark:border-navy-800 hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle>Emotional Intelligence Mastery</CardTitle>
              <CardDescription>A structured path to understand and manage emotions effectively</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <Badge className="bg-rose-100 text-rose-700 dark:bg-rose-900 dark:text-rose-300 mr-2">
                    5 Lessons
                  </Badge>
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />2 hours total
                  </Badge>
                </div>
                <Badge variant="outline" className="bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-300">
                  Beginner
                </Badge>
              </div>
              <Progress value={20} className="h-2 mb-2" />
              <p className="text-sm text-gray-500 dark:text-gray-400">1 of 5 lessons completed</p>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-navy-600 hover:bg-navy-700">
                Continue Path
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>

          <Card className="border border-navy-200 dark:border-navy-800 hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle>Anxiety Management</CardTitle>
              <CardDescription>Learn effective techniques to manage and reduce anxiety</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <Badge className="bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300 mr-2">
                    7 Lessons
                  </Badge>
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />3 hours total
                  </Badge>
                </div>
                <Badge variant="outline" className="bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-300">
                  Intermediate
                </Badge>
              </div>
              <Progress value={0} className="h-2 mb-2" />
              <p className="text-sm text-gray-500 dark:text-gray-400">Not started yet</p>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-navy-600 hover:bg-navy-700">
                Start Path
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </div>
        <div className="mt-4 text-center">
          <Button variant="outline" className="mt-2">
            View All Learning Paths
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* AI Recommendations */}
      <div className="mt-12">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <Sparkles className="mr-2 h-5 w-5 text-amber-500" />
          Personalized For You
        </h2>
        <Suspense fallback={<div>Loading recommendations...</div>}>
          <AIRecommendations showCulturalOptions={true} maxRecommendations={3} />
        </Suspense>
      </div>

      {/* Add the donation reminder */}
      <DonationReminder />
    </div>
  )
}
