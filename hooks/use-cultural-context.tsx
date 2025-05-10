"use client"

import { useState, useCallback } from "react"
import { useLocalStorage } from "react-use"
import type { ContentItem, CulturalContextRequest } from "@/utils/ai-engines"

export function useCulturalContext() {
  const [culturalPreference, setCulturalPreference] = useLocalStorage<string>("cultural-preference", "secular")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Adapt content to the current cultural preference
  const adaptContent = useCallback(
    async (content: ContentItem): Promise<ContentItem> => {
      if (!content) return content

      try {
        setIsLoading(true)
        setError(null)

        const request: CulturalContextRequest = {
          culturalContext: culturalPreference as any,
        }

        const response = await fetch("/api/culture", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ content, request }),
        })

        if (!response.ok) {
          throw new Error("Failed to adapt content")
        }

        const adaptedContent = await response.json()
        return adaptedContent
      } catch (err) {
        setError("Error adapting content to cultural preference")
        console.error("Error adapting content:", err)
        return content // Return original content if adaptation fails
      } finally {
        setIsLoading(false)
      }
    },
    [culturalPreference],
  )

  // Update the cultural preference
  const updatePreference = useCallback(
    (preference: string) => {
      setCulturalPreference(preference)
    },
    [setCulturalPreference],
  )

  return {
    culturalPreference,
    updatePreference,
    adaptContent,
    isLoading,
    error,
  }
}
