import { NextResponse } from "next/server"
import type { UserState, ContentItem } from "@/utils/ai-engines"

// Mock database of content items
const contentItems: ContentItem[] = [
  {
    id: "anxiety-1",
    title: "Managing Anxiety",
    description: "Techniques to help manage and reduce anxiety",
    type: "emotional",
    timeToComplete: 10,
    tags: ["anxiety", "stress-relief", "breathing"],
    emotionalStates: ["anxious", "stressed", "overwhelmed"],
    triggerEmotionalStates: ["anxious", "stressed"],
    difficulty: 2,
    suitableForCrisis: true,
    priority: "high",
    actionUrl: "/lessons/anxiety-1",
    imageUrl: "/images/anxiety.jpg",
  },
  {
    id: "mindfulness-1",
    title: "Mindfulness Practice",
    description: "Learn to be present in the moment",
    type: "mindfulness",
    timeToComplete: 15,
    tags: ["mindfulness", "meditation", "awareness"],
    emotionalStates: ["anxious", "stressed", "neutral"],
    triggerEmotionalStates: ["anxious", "stressed", "neutral"],
    difficulty: 3,
    suitableForCrisis: false,
    priority: "normal",
    actionUrl: "/lessons/mindfulness-1",
    imageUrl: "/images/mindfulness.jpg",
  },
  {
    id: "gratitude-1",
    title: "Gratitude Journal",
    description: "Cultivate gratitude for improved well-being",
    type: "emotional",
    timeToComplete: 5,
    tags: ["gratitude", "journaling", "positivity"],
    emotionalStates: ["sad", "neutral", "happy"],
    triggerEmotionalStates: ["sad", "neutral"],
    difficulty: 1,
    suitableForCrisis: false,
    priority: "normal",
    actionUrl: "/lessons/gratitude-1",
    imageUrl: "/images/gratitude.jpg",
  },
  {
    id: "sleep-1",
    title: "Better Sleep Habits",
    description: "Improve your sleep quality with these techniques",
    type: "activity",
    timeToComplete: 8,
    tags: ["sleep", "habits", "health"],
    emotionalStates: ["tired", "stressed", "neutral"],
    triggerEmotionalStates: ["tired"],
    difficulty: 2,
    suitableForCrisis: false,
    priority: "normal",
    actionUrl: "/lessons/sleep-1",
    imageUrl: "/images/sleep.jpg",
  },
  {
    id: "stress-1",
    title: "Stress Relief Techniques",
    description: "Effective ways to manage and reduce stress",
    type: "activity",
    timeToComplete: 12,
    tags: ["stress", "relaxation", "coping"],
    emotionalStates: ["stressed", "overwhelmed", "anxious"],
    triggerEmotionalStates: ["stressed", "overwhelmed"],
    difficulty: 2,
    suitableForCrisis: true,
    priority: "high",
    actionUrl: "/lessons/stress-1",
    imageUrl: "/images/stress.jpg",
  },
  {
    id: "mood-1",
    title: "Mood Boosting Activities",
    description: "Simple activities to improve your mood",
    type: "activity",
    timeToComplete: 10,
    tags: ["mood", "happiness", "activity"],
    emotionalStates: ["sad", "neutral", "tired"],
    triggerEmotionalStates: ["sad"],
    difficulty: 1,
    suitableForCrisis: false,
    priority: "normal",
    actionUrl: "/lessons/mood-1",
    imageUrl: "/images/mood.jpg",
  },
]

// Mock recommendation algorithm
const recommendContent = (userState: UserState): ContentItem[] => {
  // Start with all content
  let recommendations = [...contentItems]

  // Filter out completed lessons
  if (userState.completedLessons && userState.completedLessons.length > 0) {
    recommendations = recommendations.filter((item) => !userState.completedLessons?.includes(item.id))
  }

  // Filter out completed cards
  if (userState.completedCards && userState.completedCards.length > 0) {
    recommendations = recommendations.filter((item) => !userState.completedCards?.includes(item.id))
  }

  // Prioritize based on emotional state
  if (userState.emotionalState) {
    recommendations.sort((a, b) => {
      const aMatches = a.triggerEmotionalStates?.includes(userState.emotionalState || "") ? 1 : 0
      const bMatches = b.triggerEmotionalStates?.includes(userState.emotionalState || "") ? 1 : 0
      return bMatches - aMatches
    })
  }

  // Prioritize based on interests
  if (userState.interests && userState.interests.length > 0) {
    recommendations.sort((a, b) => {
      const aInterestMatches = a.tags?.filter((tag) => userState.interests?.includes(tag)).length || 0
      const bInterestMatches = b.tags?.filter((tag) => userState.interests?.includes(tag)).length || 0
      return bInterestMatches - aInterestMatches
    })
  }

  // Prioritize based on crisis state
  if (userState.inCrisis) {
    recommendations.sort((a, b) => {
      return (b.suitableForCrisis ? 1 : 0) - (a.suitableForCrisis ? 1 : 0)
    })
  }

  // Prioritize based on available time
  if (userState.availableTime) {
    recommendations = recommendations.filter((item) => (item.timeToComplete || 0) <= userState.availableTime!)
  }

  // Prioritize based on skill level
  if (userState.skillLevel !== undefined) {
    recommendations.sort((a, b) => {
      const aSkillDiff = Math.abs((a.difficulty || 2) - (userState.skillLevel || 2))
      const bSkillDiff = Math.abs((b.difficulty || 2) - (userState.skillLevel || 2))
      return aSkillDiff - bSkillDiff
    })
  }

  // Return top recommendations (limit to 5)
  return recommendations.slice(0, 5)
}

export async function POST(request: Request) {
  try {
    const { userState } = await request.json()

    if (!userState) {
      return NextResponse.json({ error: "User state is required" }, { status: 400 })
    }

    // Get recommendations based on user state
    const recommendations = recommendContent(userState)

    return NextResponse.json(recommendations)
  } catch (error) {
    console.error("Error getting recommendations:", error)
    return NextResponse.json({ error: "Failed to get recommendations" }, { status: 500 })
  }
}
