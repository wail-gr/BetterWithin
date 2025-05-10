"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useAIRecommendations } from "@/hooks/use-ai-recommendations"
import type { ContentItem, UserState } from "@/utils/ai-engines"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Clock, BookOpen, Heart, Brain, Sparkles } from "lucide-react"
import { useLocalStorage } from "react-use"

interface AIRecommendationsProps {
  initialUserState?: Partial<UserState>
  showCulturalOptions?: boolean
  maxRecommendations?: number
}

export function AIRecommendations({
  initialUserState,
  showCulturalOptions = false,
  maxRecommendations = 3,
}: AIRecommendationsProps) {
  const [culturalPreference, setCulturalPreference] = useLocalStorage<string>("cultural-preference", "secular")

  const {
    recommendations,
    formattedRecommendations,
    loading,
    error,
    userState,
    updateUserState,
    adaptContent,
    markAsViewed,
  } = useAIRecommendations(initialUserState)

  const [selectedCulture, setSelectedCulture] = useState<string>(culturalPreference || "secular")
  const [adaptedRecommendations, setAdaptedRecommendations] = useState<ContentItem[]>([])

  // Handle cultural adaptation
  const handleCulturalAdaptation = async (culture: string) => {
    setSelectedCulture(culture)
    setCulturalPreference(culture)

    if (recommendations.length === 0) return

    const adapted = await Promise.all(recommendations.map((rec) => adaptContent(rec, culture)))

    setAdaptedRecommendations(adapted)
  }

  // Apply cultural adaptation on initial load and when recommendations change
  useEffect(() => {
    if (recommendations.length > 0 && selectedCulture) {
      handleCulturalAdaptation(selectedCulture)
    }
  }, [recommendations])

  // Display recommendations to show (adapted or original)
  const displayRecommendations = adaptedRecommendations.length > 0 ? adaptedRecommendations : recommendations
  const displayFormattedRecs = formattedRecommendations.slice(0, maxRecommendations)

  // Get icon for recommendation type
  const getTypeIcon = (type?: string) => {
    switch (type) {
      case "mindfulness":
        return <Brain className="h-4 w-4" />
      case "emotional":
        return <Heart className="h-4 w-4" />
      case "activity":
        return <Sparkles className="h-4 w-4" />
      default:
        return <BookOpen className="h-4 w-4" />
    }
  }

  // Handle recommendation click
  const handleRecommendationClick = (id: string) => {
    markAsViewed(id)
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Personalized Recommendations</h2>

      {showCulturalOptions && (
        <Tabs defaultValue={selectedCulture} value={selectedCulture} onValueChange={handleCulturalAdaptation}>
          <TabsList>
            <TabsTrigger value="secular">Secular</TabsTrigger>
            <TabsTrigger value="islamic">Islamic</TabsTrigger>
            <TabsTrigger value="christian">Christian</TabsTrigger>
            <TabsTrigger value="jewish">Jewish</TabsTrigger>
            <TabsTrigger value="buddhist">Buddhist</TabsTrigger>
            <TabsTrigger value="hindu">Hindu</TabsTrigger>
          </TabsList>
        </Tabs>
      )}

      {loading ? (
        <div className="flex justify-center p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      ) : error ? (
        <div className="text-red-500 p-4 border border-red-300 rounded-md">{error}</div>
      ) : displayFormattedRecs.length === 0 ? (
        <div className="text-gray-500 p-4 border border-gray-300 rounded-md">
          No recommendations available at this time.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {displayFormattedRecs.map((rec) => (
            <Card key={rec.id} className="h-full flex flex-col hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {getTypeIcon(rec.type)}
                    {rec.priority === "high" && (
                      <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">Important</Badge>
                    )}
                  </div>
                  {rec.timeContext && (
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {rec.timeContext}
                    </Badge>
                  )}
                </div>
                <CardTitle className="mt-2">
                  {rec.personalGreeting && <span className="font-normal text-gray-600">{rec.personalGreeting}</span>}
                  {rec.title}
                </CardTitle>
                <CardDescription>{rec.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                {rec.emotionalContext && (
                  <p className="text-sm text-gray-600 dark:text-gray-400 italic mb-4">{rec.emotionalContext}</p>
                )}
                <div className="flex flex-wrap gap-2 mt-2">
                  {rec.tags?.map((tag) => (
                    <span key={tag} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="border-t pt-4">
                <Button
                  className="w-full bg-navy-600 hover:bg-navy-700"
                  onClick={() => {
                    handleRecommendationClick(rec.id)
                    window.location.href = rec.actionUrl
                  }}
                >
                  View Now
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
