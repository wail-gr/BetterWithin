"use client"

import { useState, useEffect } from "react"
import { secureApi } from "@/utils/secure-api"
import { securityMonitoring } from "@/utils/security-utils"

interface Recommendation {
  id: string
  title: string
  content: string
  tone_tag: string
}

interface RecommendationResponse {
  recommendations: Recommendation[]
}

export function useRecommendations(query: string, userProfile?: any) {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchRecommendations = async () => {
      if (!query) return

      setIsLoading(true)
      setError(null)

      try {
        // Use secure API to fetch recommendations
        const data = await secureApi.post<RecommendationResponse>(
          "/api/recommend",
          { query, profile: userProfile || { id: "anonymous" } },
          { anonymize: true },
        )

        setRecommendations(data.recommendations)

        // Log successful recommendation fetch
        securityMonitoring.logEvent("RECOMMENDATIONS_FETCHED", {
          query,
          count: data.recommendations.length,
        })
      } catch (err: any) {
        console.error("Error fetching recommendations:", err)
        setError(err.message || "Failed to fetch recommendations")

        // Log error
        securityMonitoring.logEvent("RECOMMENDATIONS_ERROR", {
          query,
          error: err.message,
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchRecommendations()
  }, [query, userProfile])

  return { recommendations, isLoading, error }
}
