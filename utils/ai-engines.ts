/**
 * TypeScript interface for the Better Within AI Engines
 */

// User state interface
export interface UserState {
  id: string
  name?: string
  emotionalState?: string
  completedLessons?: string[]
  completedCards?: string[]
  inProgressCards?: string[]
  interests?: string[]
  journalEntries?: {
    date: Date
    emotion: string
    content: string
  }[]
  goals?: string[]
  activityLevel?: number // 1-10 scale
  recentRecommendations?: string[]
  recentlyViewed?: string[]
  lastViewedTime?: Record<string, number>
  skillLevel?: number
  availableTime?: number
  inCrisis?: boolean
}

// Content item interface
export interface ContentItem {
  id: string
  title: string
  type?: string
  description?: string
  sections?: {
    heading: string
    content: string
    culturalContext?: string
  }[]
  timeToComplete?: number
  tags?: string[]
  emotionalStates?: string[]
  triggerEmotionalStates?: string[]
  difficulty?: number
  popularity?: number
  personalizedGreeting?: string
  additionalResources?: any[]
  culturalContext?: string
  culturalQuote?: string
  minActivityLevel?: number
  suitableForCrisis?: boolean
  actionUrl?: string
  imageUrl?: string
  priority?: string
}

// Recommendation message interface
export interface RecommendationMessage {
  id: string
  title: string
  description: string
  type: string
  actionUrl: string
  imageUrl?: string
  tags?: string[]
  priority?: string
  personalGreeting?: string
  emotionalContext?: string
  timeContext?: string
}

// Cultural context request interface
export interface CulturalContextRequest {
  culturalContext?: "islamic" | "christian" | "jewish" | "buddhist" | "hindu" | "secular"
}

// AI Engines API
export const AIEngines = {
  // Get recommendations for the current user
  async getRecommendations(userState: UserState): Promise<ContentItem[]> {
    try {
      const response = await fetch("/api/recommend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userState }),
      })

      if (!response.ok) {
        throw new Error("Failed to fetch recommendations")
      }

      return await response.json()
    } catch (error) {
      console.error("Error getting recommendations:", error)
      return []
    }
  },

  // Generate content for a specific template
  async generateContent(template: string, userState: UserState, snippets: any[] = []): Promise<ContentItem | null> {
    try {
      const response = await fetch("/api/content", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ template, userState, snippets }),
      })

      if (!response.ok) {
        throw new Error("Failed to generate content")
      }

      return await response.json()
    } catch (error) {
      console.error("Error generating content:", error)
      return null
    }
  },

  // Get culturally adapted content
  async getCulturalContent(content: ContentItem, request: CulturalContextRequest): Promise<ContentItem> {
    try {
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

      return await response.json()
    } catch (error) {
      console.error("Error adapting content:", error)
      return content // Return original content if adaptation fails
    }
  },

  // Run the main orchestration process
  async runOrchestration(userState: UserState): Promise<void> {
    try {
      await fetch("/api/orchestrate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userState }),
      })
    } catch (error) {
      console.error("Error running orchestration:", error)
    }
  },

  // Format a recommendation message
  formatRecommendationMessage(recommendation: ContentItem, userState: UserState): RecommendationMessage | null {
    try {
      // This is a client-side implementation of the formatMessage function
      // for cases where we don't want to make an API call
      if (!recommendation) {
        return null
      }

      // Base message structure
      const message: RecommendationMessage = {
        id: recommendation.id,
        title: recommendation.title,
        description: recommendation.description || "",
        type: recommendation.type || "content",
        actionUrl: recommendation.actionUrl || `/content/${recommendation.id}`,
        imageUrl: recommendation.imageUrl,
        tags: recommendation.tags || [],
        priority: recommendation.priority || "normal",
      }

      // Add personalization if user name is available
      if (userState && userState.name) {
        message.personalGreeting = `${userState.name}, `
      }

      // Add emotional context if available
      if (userState && userState.emotionalState) {
        switch (userState.emotionalState) {
          case "anxious":
            message.emotionalContext = "This might help ease your anxiety."
            break
          case "sad":
            message.emotionalContext = "This could help lift your spirits."
            break
          case "stressed":
            message.emotionalContext = "Take a moment for yourself with this."
            break
          case "angry":
            message.emotionalContext = "This might help you find some calm."
            break
          case "overwhelmed":
            message.emotionalContext = "When you're ready, this simple activity might help."
            break
          default:
            message.emotionalContext = "This might be helpful for you right now."
        }
      }

      // Add time context
      if (recommendation.timeToComplete) {
        message.timeContext = `Takes about ${recommendation.timeToComplete} minutes`
      }

      return message
    } catch (error) {
      console.error("Error formatting recommendation message:", error)
      return null
    }
  },
}
