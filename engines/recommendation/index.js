/**
 * Recommendation Engine
 */

/**
 * Score and select the top N cards based on user state
 * @param {Array} cards - Available content cards
 * @param {Object} userState - Current user state
 * @param {Number} topN - Number of recommendations to return
 * @returns {Array} - Top N recommended cards
 */
const scoreAndSelect = (cards, userState, topN = 3) => {
  if (!cards || !cards.length || !userState) {
    return []
  }

  // Score each card based on relevance to user state
  const scoredCards = cards.map((card) => {
    let score = 0

    // Base score - all cards start with a small positive score
    score += 1

    // Emotional state matching
    if (card.emotionalStates && userState.emotionalState) {
      if (card.emotionalStates.includes(userState.emotionalState)) {
        score += 5
      } else if (card.emotionalStates.some((state) => isRelatedEmotionalState(state, userState.emotionalState))) {
        score += 2
      }
    }

    // Interest matching
    if (card.tags && userState.interests) {
      const matchingInterests = card.tags.filter((tag) => userState.interests.includes(tag)).length
      score += matchingInterests * 2
    }

    // Recency penalty - avoid showing recently viewed content
    if (userState.recentlyViewed && userState.recentlyViewed.includes(card.id)) {
      score -= 10
    }

    // Completion status
    if (userState.completedCards && userState.completedCards.includes(card.id)) {
      score -= 8
    }

    // Progress boost - prioritize in-progress content
    if (userState.inProgressCards && userState.inProgressCards.includes(card.id)) {
      score += 3
    }

    // Difficulty matching
    if (card.difficulty && userState.skillLevel) {
      // Prefer content slightly above user's skill level
      const difficultyDelta = card.difficulty - userState.skillLevel
      if (difficultyDelta >= 0 && difficultyDelta <= 1) {
        score += 2
      } else if (difficultyDelta > 1) {
        score -= difficultyDelta // Penalize content that's too difficult
      }
    }

    // Time availability matching
    if (card.timeToComplete && userState.availableTime) {
      if (card.timeToComplete <= userState.availableTime) {
        score += 2
      } else {
        score -= 1 // Slight penalty for content that takes too long
      }
    }

    // Popularity boost
    if (card.popularity) {
      score += Math.min(card.popularity / 100, 2) // Cap at +2
    }

    return { card, score }
  })

  // Sort by score (descending) and return top N
  return scoredCards
    .sort((a, b) => b.score - a.score)
    .slice(0, topN)
    .map((item) => item.card)
}

/**
 * Determine if a recommendation should be triggered based on user state
 * @param {Object} rec - Recommendation object
 * @param {Object} userState - Current user state
 * @returns {Boolean} - Whether to trigger the recommendation
 */
const shouldTrigger = (rec, userState) => {
  if (!rec || !userState) {
    return false
  }

  // Don't trigger if user has seen this recently
  if (
    userState.recentlyViewed &&
    userState.recentlyViewed.includes(rec.id) &&
    userState.lastViewedTime &&
    Date.now() - userState.lastViewedTime[rec.id] < 24 * 60 * 60 * 1000
  ) {
    return false
  }

  // Don't trigger if user has completed this
  if (userState.completedCards && userState.completedCards.includes(rec.id)) {
    return false
  }

  // Check emotional state triggers
  if (rec.triggerEmotionalStates && userState.emotionalState) {
    if (!rec.triggerEmotionalStates.includes(userState.emotionalState)) {
      return false
    }
  }

  // Check time availability
  if (rec.timeToComplete && userState.availableTime && rec.timeToComplete > userState.availableTime) {
    return false
  }

  // Check activity level threshold
  if (rec.minActivityLevel && userState.activityLevel && rec.minActivityLevel > userState.activityLevel) {
    return false
  }

  // Check if user is in crisis mode
  if (userState.inCrisis && !rec.suitableForCrisis) {
    return false
  }

  return true
}

/**
 * Format a recommendation message based on user state
 * @param {Object} rec - Recommendation object
 * @param {Object} userState - Current user state
 * @returns {Object} - Formatted message
 */
const formatMessage = (rec, userState) => {
  if (!rec) {
    return null
  }

  // Base message structure
  const message = {
    id: rec.id,
    title: rec.title,
    description: rec.description || "",
    type: rec.type || "content",
    actionUrl: rec.actionUrl || `/content/${rec.id}`,
    imageUrl: rec.imageUrl,
    tags: rec.tags || [],
    priority: rec.priority || "normal",
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
  if (rec.timeToComplete) {
    message.timeContext = `Takes about ${rec.timeToComplete} minutes`
  }

  return message
}

/**
 * Helper function to determine if two emotional states are related
 * @param {String} state1 - First emotional state
 * @param {String} state2 - Second emotional state
 * @returns {Boolean} - Whether the states are related
 */
const isRelatedEmotionalState = (state1, state2) => {
  const relatedStates = {
    anxious: ["stressed", "worried", "overwhelmed"],
    sad: ["depressed", "down", "melancholy"],
    angry: ["frustrated", "irritated", "annoyed"],
    happy: ["joyful", "excited", "content"],
    stressed: ["anxious", "overwhelmed", "tense"],
    tired: ["exhausted", "fatigued", "drained"],
  }

  return (
    (relatedStates[state1] && relatedStates[state1].includes(state2)) ||
    (relatedStates[state2] && relatedStates[state2].includes(state1))
  )
}

module.exports = {
  scoreAndSelect,
  shouldTrigger,
  formatMessage,
}
