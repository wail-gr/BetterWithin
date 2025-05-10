// BetterWithin Recommendation Algorithm
// This algorithm suggests content based on user behavior, preferences, and emotional state

interface UserData {
  id: string
  emotionalState?: string
  completedLessons: string[]
  interests: string[]
  journalEntries: {
    date: Date
    emotion: string
    content: string
  }[]
  goals: string[]
  activityLevel: number // 1-10 scale
}

interface ContentItem {
  id: string
  type: "lesson" | "exercise" | "meditation" | "article" | "challenge"
  title: string
  description: string
  tags: string[]
  emotionalStates: string[]
  difficulty: number // 1-10 scale
  popularity: number // 1-10 scale
  timeToComplete: number // in minutes
}

export class RecommendationEngine {
  private contentLibrary: ContentItem[] = []

  constructor(contentItems: ContentItem[]) {
    this.contentLibrary = contentItems
  }

  // Main recommendation function
  public getRecommendations(user: UserData, count = 3): ContentItem[] {
    // Get current emotional state from most recent journal entry
    const currentEmotion =
      user.journalEntries.length > 0
        ? user.journalEntries[user.journalEntries.length - 1].emotion
        : user.emotionalState || "neutral"

    // Calculate scores for each content item
    const scoredContent = this.contentLibrary.map((item) => {
      let score = 0

      // Emotional state match
      if (item.emotionalStates.includes(currentEmotion)) {
        score += 3
      }

      // Interest match
      const interestMatches = item.tags.filter((tag) => user.interests.includes(tag)).length
      score += interestMatches * 2

      // Avoid recommending completed lessons
      if (user.completedLessons.includes(item.id)) {
        score -= 10
      }

      // Adjust for user activity level
      if (user.activityLevel <= 3 && item.timeToComplete <= 10) {
        score += 2 // Short activities for less active users
      } else if (user.activityLevel >= 7 && item.timeToComplete >= 15) {
        score += 1 // Longer activities for more active users
      }

      // Goal alignment
      const goalMatches = item.tags.filter((tag) => user.goals.includes(tag)).length
      score += goalMatches * 3

      // Popularity boost (small factor)
      score += item.popularity * 0.2

      return { item, score }
    })

    // Sort by score and return top recommendations
    return scoredContent
      .sort((a, b) => b.score - a.score)
      .slice(0, count)
      .map((scored) => scored.item)
  }

  // Get recommendations specifically for improving current emotional state
  public getEmotionalSupportRecommendations(emotion: string, count = 2): ContentItem[] {
    // Map emotions to helpful content types
    const emotionContentMap: Record<string, string[]> = {
      sad: ["meditation", "exercise", "positive-thinking"],
      anxious: ["breathing", "meditation", "grounding"],
      angry: ["meditation", "exercise", "reflection"],
      stressed: ["relaxation", "breathing", "meditation"],
      overwhelmed: ["simplification", "prioritization", "breathing"],
      happy: ["gratitude", "connection", "creativity"],
      neutral: ["growth", "learning", "exploration"],
    }

    // Get relevant tags for the emotion
    const relevantTags = emotionContentMap[emotion] || emotionContentMap["neutral"]

    // Filter and score content
    const supportContent = this.contentLibrary
      .map((item) => {
        const tagMatches = item.tags.filter((tag) => relevantTags.includes(tag)).length
        return { item, score: tagMatches * 2 + item.popularity * 0.5 }
      })
      .filter(({ score }) => score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, count)
      .map((scored) => scored.item)

    return supportContent
  }
}

// Export a singleton instance with mock data
const mockContentLibrary: ContentItem[] = [
  {
    id: "lesson-1",
    type: "lesson",
    title: "Understanding Anxiety",
    description: "Learn about the root causes of anxiety and effective coping mechanisms",
    tags: ["anxiety", "mental-health", "coping", "education"],
    emotionalStates: ["anxious", "stressed", "overwhelmed"],
    difficulty: 3,
    popularity: 8,
    timeToComplete: 15,
  },
  {
    id: "meditation-1",
    type: "meditation",
    title: "5-Minute Calming Breath",
    description: "A quick breathing exercise to center yourself during stressful moments",
    tags: ["breathing", "meditation", "quick", "stress-relief"],
    emotionalStates: ["anxious", "stressed", "angry", "overwhelmed"],
    difficulty: 1,
    popularity: 9,
    timeToComplete: 5,
  },
  {
    id: "exercise-1",
    type: "exercise",
    title: "Mood-Boosting Movement",
    description: "Simple physical exercises that release endorphins and improve mood",
    tags: ["exercise", "mood", "physical", "energy"],
    emotionalStates: ["sad", "lethargic", "stressed"],
    difficulty: 4,
    popularity: 7,
    timeToComplete: 20,
  },
  {
    id: "article-1",
    type: "article",
    title: "The Science of Happiness",
    description: "Research-backed ways to increase your happiness baseline",
    tags: ["happiness", "science", "positive-thinking", "growth"],
    emotionalStates: ["neutral", "curious", "happy"],
    difficulty: 2,
    popularity: 8,
    timeToComplete: 10,
  },
  {
    id: "challenge-1",
    type: "challenge",
    title: "7 Days of Gratitude",
    description: "A week-long practice to develop gratitude as a daily habit",
    tags: ["gratitude", "habit-formation", "positivity", "challenge"],
    emotionalStates: ["neutral", "sad", "happy"],
    difficulty: 2,
    popularity: 9,
    timeToComplete: 5,
  },
]

export const recommendationEngine = new RecommendationEngine(mockContentLibrary)
