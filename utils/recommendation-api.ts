export interface UserProfile {
  id: string
  profileVec?: Record<string, number>
  history?: string[]
  likes?: string[]
  bookmarks?: string[]
}

export interface Lesson {
  id: string
  title: string
  content: string
  toneTag?: string
  imageUrl?: string
}

export interface RecommendationRequest {
  query: string
  profile: UserProfile
}

export interface RecommendationResponse {
  recommendations: Lesson[]
  error?: string
}

export interface FeedbackData {
  userId: string
  interactions: [string, number][] // [chunkId, reward]
}

export async function getRecommendations(query: string, userProfile: UserProfile): Promise<Lesson[]> {
  try {
    const response = await fetch("/api/recommend", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
        profile: userProfile,
      }),
    })

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }

    const data: RecommendationResponse = await response.json()

    if (data.error) {
      throw new Error(data.error)
    }

    return data.recommendations
  } catch (error) {
    console.error("Failed to get recommendations:", error)
    return []
  }
}

export async function sendFeedback(
  userId: string,
  lessonId: string,
  action: "like" | "bookmark" | "view",
): Promise<boolean> {
  try {
    // Convert action to reward value
    const reward = action === "view" ? 0.5 : 1

    const response = await fetch("/api/feedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        interactions: [[lessonId, reward]],
      }),
    })

    return response.ok
  } catch (error) {
    console.error("Failed to send feedback:", error)
    return false
  }
}
