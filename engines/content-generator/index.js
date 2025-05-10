/**
 * Content Generator for Better Within
 *
 * This module handles finding empty content cards, generating lesson content,
 * saving content, and retrieving ready lessons.
 */

// In-memory storage for generated content (would be a database in production)
const contentStore = {}

// Find cards that need content generated
function findEmptyCards(userState) {
  // This would typically query a database for cards without content
  // For this implementation, we'll return mock data based on user state
  const templates = [
    {
      id: "card-anxiety-1",
      template: "anxiety-management",
      title: "Managing Anxiety",
    },
    {
      id: "card-mindfulness-1",
      template: "mindfulness",
      title: "Mindfulness Practice",
    },
    {
      id: "card-gratitude-1",
      template: "gratitude",
      title: "Gratitude Journal",
    },
    {
      id: "card-sleep-1",
      template: "sleep-improvement",
      title: "Better Sleep Habits",
    },
    {
      id: "card-stress-1",
      template: "stress-management",
      title: "Stress Relief Techniques",
    },
    {
      id: "card-mood-1",
      template: "mood-boosting",
      title: "Mood Boosting Activities",
    },
  ]

  // Filter based on user state if available
  let filteredTemplates = templates

  if (userState) {
    // If user has interests, prioritize those
    if (userState.interests && userState.interests.length > 0) {
      const interestMap = {
        anxiety: ["anxiety-management", "stress-management"],
        mindfulness: ["mindfulness", "gratitude"],
        "stress-relief": ["stress-management", "mindfulness"],
        sleep: ["sleep-improvement"],
        mood: ["mood-boosting", "gratitude"],
      }

      const relevantTemplates = userState.interests.flatMap((interest) => interestMap[interest] || [])

      if (relevantTemplates.length > 0) {
        filteredTemplates = templates.filter((t) => relevantTemplates.includes(t.template))
      }
    }

    // If user is in a specific emotional state, prioritize relevant content
    if (userState.emotionalState) {
      const emotionMap = {
        anxious: ["anxiety-management", "mindfulness"],
        stressed: ["stress-management", "mindfulness"],
        sad: ["mood-boosting", "gratitude"],
        tired: ["sleep-improvement", "mood-boosting"],
        neutral: ["mindfulness", "gratitude"],
      }

      const emotionTemplates = emotionMap[userState.emotionalState] || []

      if (emotionTemplates.length > 0) {
        // Boost the priority of these templates but don't exclude others
        filteredTemplates.sort((a, b) => {
          const aRelevance = emotionTemplates.includes(a.template) ? 1 : 0
          const bRelevance = emotionTemplates.includes(b.template) ? 1 : 0
          return bRelevance - aRelevance
        })
      }
    }
  }

  // Filter out cards that already have content
  return filteredTemplates.filter((card) => !contentStore[card.id])
}

// Generate lesson content based on template and user state
function generateLesson(template, userState, snippets = []) {
  // In a real implementation, this might call an LLM API
  // For now, we'll return mock content based on the template

  let content = {}

  switch (template) {
    case "anxiety-management":
      content = {
        title: "Managing Anxiety",
        description: "Techniques to help manage and reduce anxiety",
        sections: [
          {
            heading: "Understanding Anxiety",
            content:
              "Anxiety is your body's natural response to stress. It's a feeling of fear or apprehension about what's to come.",
          },
          {
            heading: "Breathing Technique",
            content:
              "Try the 4-7-8 breathing technique: Inhale for 4 seconds, hold for 7 seconds, exhale for 8 seconds.",
          },
          {
            heading: "Grounding Exercise",
            content:
              "Name 5 things you can see, 4 things you can touch, 3 things you can hear, 2 things you can smell, and 1 thing you can taste.",
          },
        ],
        timeToComplete: 10,
        tags: ["anxiety", "stress-relief", "breathing"],
        emotionalStates: ["anxious", "stressed", "overwhelmed"],
        triggerEmotionalStates: ["anxious", "stressed"],
        difficulty: 2,
        type: "emotional",
        suitableForCrisis: true,
        priority: "high",
      }
      break
    case "mindfulness":
      content = {
        title: "Mindfulness Practice",
        description: "Learn to be present in the moment",
        sections: [
          {
            heading: "What is Mindfulness?",
            content:
              "Mindfulness is the practice of being fully present and engaged in the moment, aware of your thoughts and feelings without distraction or judgment.",
          },
          {
            heading: "Body Scan Meditation",
            content:
              "Start at your toes and work your way up to your head, paying attention to each part of your body and how it feels.",
          },
          {
            heading: "Mindful Eating",
            content:
              "Try eating a meal without distractions. Notice the colors, smells, textures, and flavors of your food.",
          },
        ],
        timeToComplete: 15,
        tags: ["mindfulness", "meditation", "awareness"],
        emotionalStates: ["anxious", "stressed", "neutral"],
        triggerEmotionalStates: ["anxious", "stressed", "neutral"],
        difficulty: 3,
        type: "mindfulness",
        suitableForCrisis: false,
        priority: "normal",
      }
      break
    case "gratitude":
      content = {
        title: "Gratitude Journal",
        description: "Cultivate gratitude for improved well-being",
        sections: [
          {
            heading: "The Power of Gratitude",
            content: "Practicing gratitude can increase happiness, reduce depression, and improve overall well-being.",
          },
          {
            heading: "Daily Practice",
            content: "Each day, write down three things you're grateful for. They can be big or small.",
          },
          {
            heading: "Gratitude Letter",
            content:
              "Write a letter to someone who has positively impacted your life, expressing your gratitude for their influence.",
          },
        ],
        timeToComplete: 5,
        tags: ["gratitude", "journaling", "positivity"],
        emotionalStates: ["sad", "neutral", "happy"],
        triggerEmotionalStates: ["sad", "neutral"],
        difficulty: 1,
        type: "emotional",
        suitableForCrisis: false,
        priority: "normal",
      }
      break
    case "sleep-improvement":
      content = {
        title: "Better Sleep Habits",
        description: "Improve your sleep quality with these techniques",
        sections: [
          {
            heading: "Sleep Environment",
            content: "Create a cool, dark, and quiet environment. Remove electronic devices from your bedroom.",
          },
          {
            heading: "Bedtime Routine",
            content: "Establish a relaxing bedtime routine. Try reading, gentle stretching, or meditation.",
          },
          {
            heading: "Sleep Schedule",
            content: "Go to bed and wake up at the same time every day, even on weekends.",
          },
        ],
        timeToComplete: 8,
        tags: ["sleep", "habits", "health"],
        emotionalStates: ["tired", "stressed", "neutral"],
        triggerEmotionalStates: ["tired"],
        difficulty: 2,
        type: "activity",
        suitableForCrisis: false,
        priority: "normal",
      }
      break
    case "stress-management":
      content = {
        title: "Stress Relief Techniques",
        description: "Effective ways to manage and reduce stress",
        sections: [
          {
            heading: "Progressive Muscle Relaxation",
            content: "Tense and then relax each muscle group in your body, starting from your toes and working upward.",
          },
          {
            heading: "Visualization",
            content: "Close your eyes and imagine a peaceful scene, like a beach or forest.",
          },
          {
            heading: "Time Management",
            content: "Prioritize tasks, break large projects into smaller steps, and learn to say no.",
          },
        ],
        timeToComplete: 12,
        tags: ["stress", "relaxation", "coping"],
        emotionalStates: ["stressed", "overwhelmed", "anxious"],
        triggerEmotionalStates: ["stressed", "overwhelmed"],
        difficulty: 2,
        type: "activity",
        suitableForCrisis: true,
        priority: "high",
      }
      break
    case "mood-boosting":
      content = {
        title: "Mood Boosting Activities",
        description: "Simple activities to improve your mood",
        sections: [
          {
            heading: "Physical Activity",
            content: "Even a short walk can release endorphins and improve your mood.",
          },
          {
            heading: "Social Connection",
            content: "Reach out to a friend or family member for a chat.",
          },
          {
            heading: "Acts of Kindness",
            content: "Doing something nice for someone else can boost your own happiness.",
          },
        ],
        timeToComplete: 10,
        tags: ["mood", "happiness", "activity"],
        emotionalStates: ["sad", "neutral", "tired"],
        triggerEmotionalStates: ["sad"],
        difficulty: 1,
        type: "activity",
        suitableForCrisis: false,
        priority: "normal",
      }
      break
    default:
      content = {
        title: "Generic Lesson",
        description: "A general wellness lesson",
        sections: [
          {
            heading: "Introduction",
            content: "This is a generic lesson template.",
          },
        ],
        timeToComplete: 5,
        tags: ["general"],
        emotionalStates: ["neutral"],
        triggerEmotionalStates: ["neutral"],
        difficulty: 1,
        type: "content",
        suitableForCrisis: false,
        priority: "low",
      }
  }

  // Add an ID if not present
  if (!content.id) {
    content.id = `generated-${template}-${Date.now()}`
  }

  // Add action URL if not present
  if (!content.actionUrl) {
    content.actionUrl = `/lessons/${content.id}`
  }

  // Add image URL if not present
  if (!content.imageUrl) {
    // Use placeholder images based on type
    const typeImageMap = {
      emotional: "/images/emotional.jpg",
      mindfulness: "/images/mindfulness.jpg",
      activity: "/images/activity.jpg",
      content: "/images/content.jpg",
    }
    content.imageUrl = typeImageMap[content.type] || "/images/default.jpg"
  }

  // Personalize content based on user state if available
  if (userState && userState.name) {
    content.personalizedGreeting = `Hello ${userState.name}, welcome to this lesson.`
  }

  // Add any provided content snippets
  if (snippets && snippets.length > 0) {
    content.additionalResources = snippets
  }

  return content
}

// Save generated content
function saveContent(cardId, content) {
  // In a real implementation, this would save to a database
  contentStore[cardId] = content
  return true
}

// Get lessons that are ready to be recommended
function getReadyLessons() {
  // In a real implementation, this would query a database
  // For now, we'll return all generated content
  return Object.entries(contentStore).map(([id, content]) => ({
    id,
    ...content,
  }))
}

module.exports = {
  findEmptyCards,
  generateLesson,
  saveContent,
  getReadyLessons,
}
