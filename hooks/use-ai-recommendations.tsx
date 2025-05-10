"use client"

import { useState, useEffect, useCallback } from "react"
import { AIEngines, type UserState, type ContentItem, type RecommendationMessage } from "@/utils/ai-engines"

export function useAIRecommendations(initialUserState?: Partial<UserState>) {
  const [recommendations, setRecommendations] = useState<ContentItem[]>([])
  const [formattedRecommendations, setFormattedRecommendations] = useState<RecommendationMessage[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [userState, setUserState] = useState<UserState>({
    id: "user-1",
    name: "User",
    emotionalState: "neutral",
    completedLessons: [],
    completedCards: [],
    inProgressCards: [],
    interests: ["mindfulness", "anxiety", "stress-relief"],
    journalEntries: [],
    goals: ["reduce-anxiety", "improve-sleep"],
    activityLevel: 5,
    recentRecommendations: [],
    recentlyViewed: [],
    skillLevel: 2,
    availableTime: 15,
    ...initialUserState,
  })

  // Fetch recommendations based on user state
  const fetchRecommendations = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const recs = await AIEngines.getRecommendations(userState)
      setRecommendations(recs)

      // Format the recommendations
      const formatted = recs
        .map((rec) => AIEngines.formatRecommendationMessage(rec, userState))
        .filter(Boolean) as RecommendationMessage[]

      setFormattedRecommendations(formatted)
    } catch (err) {
      setError("Failed to fetch recommendations")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }, [userState])

  // Update user state and fetch new recommendations
  const updateUserState = useCallback((newState: Partial<UserState>) => {
    setUserState((prev) => ({
      ...prev,
      ...newState,
    }))
  }, [])

  // Generate content for a specific template
  const generateContent = useCallback(
    async (template: string, snippets: any[] = []) => {
      try {
        return await AIEngines.generateContent(template, userState, snippets)
      } catch (err) {
        console.error("Error generating content:", err)
        return null
      }
    },
    [userState],
  )

  // Adapt content to a specific cultural context
  const adaptContent = useCallback(async (content: ContentItem, culturalContext: string) => {
    try {
      return await AIEngines.getCulturalContent(content, { culturalContext })
    } catch (err) {
      console.error("Error adapting content:", err)
      return content
    }
  }, [])

  // Run the orchestration process
  const runOrchestration = useCallback(async () => {
    try {
      await AIEngines.runOrchestration(userState)
    } catch (err) {
      console.error("Error running orchestration:", err)
    }
  }, [userState])

  // Mark a recommendation as viewed
  const markAsViewed = useCallback((recommendationId: string) => {
    setUserState((prev) => {
      const recentlyViewed = [...(prev.recentlyViewed || []), recommendationId]
      const lastViewedTime = { ...(prev.lastViewedTime || {}), [recommendationId]: Date.now() }

      return {
        ...prev,
        recentlyViewed,
        lastViewedTime,
      }
    })
  }, [])

  // Mark a recommendation as completed
  const markAsCompleted = useCallback((recommendationId: string) => {
    setUserState((prev) => {
      const completedCards = [...(prev.completedCards || []), recommendationId]
      // Remove from in-progress if it was there
      const inProgressCards = (prev.inProgressCards || []).filter((id) => id !== recommendationId)

      return {
        ...prev,
        completedCards,
        inProgressCards,
      }
    })
  }, [])

  // Mark a recommendation as in-progress
  const markAsInProgress = useCallback((recommendationId: string) => {
    setUserState((prev) => {
      // Only add if not already completed
      if (prev.completedCards?.includes(recommendationId)) {
        return prev
      }

      const inProgressCards = [...(prev.inProgressCards || []), recommendationId]

      return {
        ...prev,
        inProgressCards,
      }
    })
  }, [])

  // Update emotional state
  const updateEmotionalState = useCallback(
    (emotionalState: string) => {
      updateUserState({ emotionalState })
    },
    [updateUserState],
  )

  // Fetch recommendations when user state changes
  useEffect(() => {
    fetchRecommendations()
  }, [fetchRecommendations])

  return {
    recommendations,
    formattedRecommendations,
    loading,
    error,
    userState,
    updateUserState,
    fetchRecommendations,
    generateContent,
    adaptContent,
    runOrchestration,
    markAsViewed,
    markAsCompleted,
    markAsInProgress,
    updateEmotionalState,
  }
}
