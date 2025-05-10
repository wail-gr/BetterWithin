"use client"

import type React from "react"

import { useState } from "react"
import { useRecommendations } from "@/hooks/use-recommendations"
import { sendFeedback } from "@/utils/recommendation-api"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Bookmark, Heart, Search } from "lucide-react"
import { cn } from "@/lib/utils"

export function LessonRecommendations() {
  const { query, setQuery, recommendations, loading, error } = useRecommendations()
  const [searchInput, setSearchInput] = useState("")
  const [likedLessons, setLikedLessons] = useState<Record<string, boolean>>({})
  const [bookmarkedLessons, setBookmarkedLessons] = useState<Record<string, boolean>>({})

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setQuery(searchInput)
  }

  const handleLike = async (lessonId: string) => {
    const newState = !likedLessons[lessonId]
    setLikedLessons({ ...likedLessons, [lessonId]: newState })
    await sendFeedback("user123", lessonId, "like")
  }

  const handleBookmark = async (lessonId: string) => {
    const newState = !bookmarkedLessons[lessonId]
    setBookmarkedLessons({ ...bookmarkedLessons, [lessonId]: newState })
    await sendFeedback("user123", lessonId, "bookmark")
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <form onSubmit={handleSearch} className="flex gap-2 mb-6">
        <Input
          type="text"
          placeholder="Search for lessons..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="flex-1"
        />
        <Button type="submit" disabled={loading}>
          <Search className="h-4 w-4 mr-2" />
          Search
        </Button>
      </form>

      {error && <div className="bg-red-50 text-red-700 p-4 rounded-md mb-4">{error}</div>}

      {loading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div className="grid gap-6">
          {recommendations.length > 0 ? (
            recommendations.map((lesson) => (
              <Card key={lesson.id} className="overflow-hidden">
                <CardHeader className="pb-3">
                  <CardTitle>{lesson.title}</CardTitle>
                  {lesson.toneTag && (
                    <span className="inline-block px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                      {lesson.toneTag}
                    </span>
                  )}
                </CardHeader>
                <CardContent>
                  <p className="line-clamp-3">{lesson.content}</p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="ghost" size="sm" onClick={() => handleLike(lesson.id)}>
                    <Heart className={cn("h-4 w-4 mr-2", likedLessons[lesson.id] ? "fill-red-500 text-red-500" : "")} />
                    Like
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleBookmark(lesson.id)}>
                    <Bookmark
                      className={cn("h-4 w-4 mr-2", bookmarkedLessons[lesson.id] ? "fill-blue-500 text-blue-500" : "")}
                    />
                    Save
                  </Button>
                </CardFooter>
              </Card>
            ))
          ) : query ? (
            <p className="text-center py-8 text-gray-500">No lessons found for "{query}"</p>
          ) : null}
        </div>
      )}
    </div>
  )
}
