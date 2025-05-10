import { NextResponse } from "next/server"
import type { ContentItem, CulturalContextRequest } from "@/utils/ai-engines"

// Cultural quotes by context
const CULTURAL_QUOTES = {
  islamic: [
    "Verily, with hardship comes ease. (Quran 94:5)",
    "The strongest among you is the one who controls his anger. (Prophet Muhammad)",
    "Allah does not burden a soul beyond that it can bear. (Quran 2:286)",
    "Indeed, Allah is with the patient. (Quran 2:153)",
    "Whoever believes in Allah and the Last Day should speak a good word or remain silent. (Prophet Muhammad)",
  ],
  christian: [
    "Cast all your anxiety on him because he cares for you. (1 Peter 5:7)",
    "I can do all things through Christ who strengthens me. (Philippians 4:13)",
    "For God has not given us a spirit of fear, but of power and of love and of a sound mind. (2 Timothy 1:7)",
    "Come to me, all you who are weary and burdened, and I will give you rest. (Matthew 11:28)",
    "The Lord is my shepherd; I shall not want. (Psalm 23:1)",
  ],
  jewish: [
    "Who is strong? One who overpowers their inclinations. (Pirkei Avot 4:1)",
    "This too shall pass. (Jewish proverb)",
    "The highest form of wisdom is kindness. (Talmud)",
    "If I am not for myself, who will be for me? If I am only for myself, what am I? (Hillel)",
    "It is not your responsibility to finish the work, but you are not free to desist from it. (Pirkei Avot 2:16)",
  ],
  buddhist: [
    "Peace comes from within. Do not seek it without. (Buddha)",
    "The mind is everything. What you think you become. (Buddha)",
    "You yourself, as much as anybody in the entire universe, deserve your love and affection. (Buddha)",
    "Holding on to anger is like grasping a hot coal with the intent of throwing it at someone else; you are the one who gets burned. (Buddha)",
    "The root of suffering is attachment. (Buddha)",
  ],
  hindu: [
    "Yoga is the journey of the self, through the self, to the self. (Bhagavad Gita)",
    "The wise grieve neither for the living nor for the dead. (Bhagavad Gita 2:11)",
    "You have the right to work, but never to the fruit of work. (Bhagavad Gita 2:47)",
    "When meditation is mastered, the mind is unwavering like the flame of a lamp in a windless place. (Bhagavad Gita 6:19)",
    "The self-controlled soul, who moves amongst sense objects, free from either attachment or repulsion, attains peace. (Bhagavad Gita 2:64)",
  ],
  secular: [
    "The greatest glory in living lies not in never falling, but in rising every time we fall. (Nelson Mandela)",
    "Life is what happens when you're busy making other plans. (John Lennon)",
    "The way to get started is to quit talking and begin doing. (Walt Disney)",
    "Your time is limited, so don't waste it living someone else's life. (Steve Jobs)",
    "Happiness is not something ready-made. It comes from your own actions. (Dalai Lama)",
  ],
}

// Cultural adaptation function
const adaptContent = (content: ContentItem, culturalContext: string): ContentItem => {
  // Create a copy of the content to modify
  const adaptedContent = { ...content }

  // Add cultural context based on the requested context
  if (culturalContext && CULTURAL_QUOTES[culturalContext]) {
    const quotes = CULTURAL_QUOTES[culturalContext]
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)]
    adaptedContent.culturalQuote = randomQuote
  }

  // Set the cultural context
  adaptedContent.culturalContext = culturalContext

  // Adapt section content if needed
  if (adaptedContent.sections) {
    adaptedContent.sections = adaptedContent.sections.map((section) => {
      const updatedSection = { ...section }

      // Only add cultural context to the first section
      if (adaptedContent.sections?.indexOf(section) === 0) {
        switch (culturalContext) {
          case "islamic":
            updatedSection.culturalContext =
              "Islamic perspective: This practice aligns with the Islamic concept of mindfulness (khushoo) during prayer and daily activities."
            break
          case "christian":
            updatedSection.culturalContext =
              "Christian perspective: This practice resonates with the Christian tradition of contemplative prayer and being present with God."
            break
          case "jewish":
            updatedSection.culturalContext =
              "Jewish perspective: This practice connects with the Jewish concept of kavanah (intention and mindful presence) during prayer and daily life."
            break
          case "buddhist":
            updatedSection.culturalContext =
              "Buddhist perspective: This practice aligns with Buddhist mindfulness meditation techniques that have been practiced for thousands of years."
            break
          case "hindu":
            updatedSection.culturalContext =
              "Hindu perspective: This practice resonates with Hindu meditation traditions and the concept of dharana (concentration)."
            break
        }
      }

      return updatedSection
    })
  }

  return adaptedContent
}

export async function POST(request: Request) {
  try {
    const { content, request: culturalRequest } = await request.json()

    if (!content) {
      return NextResponse.json({ error: "Content is required" }, { status: 400 })
    }

    // Get the cultural context from the request
    const culturalContext = (culturalRequest as CulturalContextRequest)?.culturalContext || "secular"

    // Adapt the content to the requested cultural context
    const adaptedContent = adaptContent(content, culturalContext)

    return NextResponse.json(adaptedContent)
  } catch (error) {
    console.error("Error adapting content:", error)
    return NextResponse.json({ error: "Failed to adapt content" }, { status: 500 })
  }
}
