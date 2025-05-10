"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft, BookOpen, Search, Video, Youtube } from "lucide-react"
import Link from "next/link"

// Mock YouTube videos data
const mockVideos = [
  {
    id: "video1",
    title: "Finding Your Inner Strength - Motivational Speech",
    channel: "Motivation Daily",
    views: "1.2M views",
    duration: "10:24",
    thumbnail: "/placeholder.svg?height=180&width=320",
  },
  {
    id: "video2",
    title: "Overcoming Anxiety: A Guide for Teens",
    channel: "Mental Health Matters",
    views: "450K views",
    duration: "15:37",
    thumbnail: "/placeholder.svg?height=180&width=320",
  },
  {
    id: "video3",
    title: "Building Resilience in Difficult Times",
    channel: "Life Skills Academy",
    views: "820K views",
    duration: "12:15",
    thumbnail: "/placeholder.svg?height=180&width=320",
  },
  {
    id: "video4",
    title: "The Science of Happiness - What Makes Us Happy?",
    channel: "Psychology Insights",
    views: "1.5M views",
    duration: "18:42",
    thumbnail: "/placeholder.svg?height=180&width=320",
  },
]

// Mock articles data
const mockArticles = [
  {
    id: "article1",
    title: "10 Ways to Boost Your Mental Health Today",
    author: "Dr. Sarah Johnson",
    readTime: "5 min read",
    excerpt: "Simple, practical steps you can take right now to improve your mental wellbeing...",
    image: "/placeholder.svg?height=120&width=200",
  },
  {
    id: "article2",
    title: "Understanding the Teenage Brain: A Parent's Guide",
    author: "Michael Chen, PhD",
    readTime: "8 min read",
    excerpt: "The teenage brain undergoes significant changes that affect behavior and emotions...",
    image: "/placeholder.svg?height=120&width=200",
  },
  {
    id: "article3",
    title: "How to Build Healthy Friendships in High School",
    author: "Lisa Martinez",
    readTime: "6 min read",
    excerpt: "Navigating social relationships during adolescence can be challenging but rewarding...",
    image: "/placeholder.svg?height=120&width=200",
  },
]

export default function MotivationPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="container max-w-6xl mx-auto px-4 py-6 md:py-10">
      <Button variant="ghost" size="sm" asChild className="mb-4">
        <Link href="/" className="flex items-center gap-1">
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Link>
      </Button>

      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Motivation & Inspiration</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Discover content that inspires, motivates, and helps you grow
        </p>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Search for motivational content..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <Tabs defaultValue="videos">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="videos" className="flex items-center gap-2">
            <Video className="h-4 w-4" />
            <span>Videos</span>
          </TabsTrigger>
          <TabsTrigger value="articles" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            <span>Articles</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="videos">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Youtube className="h-5 w-5 text-red-500" />
                <span>Recommended Videos</span>
              </CardTitle>
              <CardDescription>Curated motivational and educational content for your personal growth</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="animate-pulse">
                      <div className="bg-gray-200 dark:bg-gray-800 rounded-lg aspect-video mb-2"></div>
                      <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded mb-2"></div>
                      <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded w-2/3"></div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {mockVideos.map((video) => (
                    <div key={video.id} className="group cursor-pointer">
                      <div className="relative rounded-lg overflow-hidden mb-2">
                        <img
                          src={video.thumbnail || "/placeholder.svg"}
                          alt={video.title}
                          className="w-full aspect-video object-cover transition-transform group-hover:scale-105"
                        />
                        <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-1 py-0.5 rounded">
                          {video.duration}
                        </div>
                      </div>
                      <h3 className="font-medium line-clamp-2 group-hover:text-teal-500">{video.title}</h3>
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-1">
                        <span>{video.channel}</span>
                        <span className="mx-1">•</span>
                        <span>{video.views}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="articles">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-teal-500" />
                <span>Featured Articles</span>
              </CardTitle>
              <CardDescription>Insightful reads to help you understand yourself and grow</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-6">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="animate-pulse flex gap-4">
                      <div className="bg-gray-200 dark:bg-gray-800 rounded-lg w-1/4 aspect-[4/3]"></div>
                      <div className="flex-1 space-y-2">
                        <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-3/4"></div>
                        <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded w-1/2"></div>
                        <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded w-full"></div>
                        <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded w-2/3"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-6">
                  {mockArticles.map((article) => (
                    <div key={article.id} className="flex gap-4 group cursor-pointer">
                      <div className="w-1/4 min-w-[100px]">
                        <img
                          src={article.image || "/placeholder.svg"}
                          alt={article.title}
                          className="rounded-lg w-full aspect-[4/3] object-cover transition-transform group-hover:scale-105"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium group-hover:text-teal-500">{article.title}</h3>
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-1 mb-2">
                          <span>{article.author}</span>
                          <span className="mx-1">•</span>
                          <span>{article.readTime}</span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">{article.excerpt}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
