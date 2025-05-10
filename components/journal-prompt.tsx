"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, RefreshCw, Star } from "lucide-react"

interface JournalPromptProps {
  emotion?: string
  prompts?: string[]
  title?: string
  description?: string
  onSelect?: (prompt: string) => void
}

export function JournalPrompt({
  emotion = "neutral",
  prompts: providedPrompts,
  title = "Writing Prompt",
  description = "Use this prompt to inspire your journal entry",
  onSelect,
}: JournalPromptProps) {
  // Define prompts based on emotion
  const getPromptsForEmotion = (emotion: string): string[] => {
    const promptsByEmotion: Record<string, string[]> = {
      happy: [
        "What made you smile today?",
        "Describe a moment of joy you experienced recently.",
        "What are three things you're grateful for right now?",
        "How can you spread your happiness to others?",
      ],
      sad: [
        "What's weighing on your mind today?",
        "When did you start feeling this way?",
        "What usually helps you feel better when you're down?",
        "Is there someone you could reach out to for support?",
      ],
      anxious: [
        "What specific things are making you feel anxious?",
        "What's one small step you could take to address your worries?",
        "What has helped you manage anxiety in the past?",
        "How can you be kinder to yourself during this anxious time?",
      ],
      angry: [
        "What triggered your anger today?",
        "How does your body feel when you're angry?",
        "What would help you release this feeling in a healthy way?",
        "Is there a different perspective you could consider about the situation?",
      ],
      content: [
        "What aspects of your life are making you feel content?",
        "How can you maintain this feeling of contentment?",
        "What wisdom would you share with someone seeking peace?",
        "Describe your ideal peaceful day.",
      ],
      neutral: [
        "What's on your mind today?",
        "Reflect on something you learned recently.",
        "What are you looking forward to in the coming days?",
        "How have you grown in the past year?",
      ],
    }

    return promptsByEmotion[emotion] || promptsByEmotion.neutral
  }

  const defaultPrompts = getPromptsForEmotion(emotion)
  const prompts = providedPrompts || defaultPrompts

  const [currentPrompt, setCurrentPrompt] = useState(prompts[0])
  const [isLoading, setIsLoading] = useState(false)

  const getRandomPrompt = () => {
    setIsLoading(true)

    // Get a new random prompt that's different from the current one
    let newPrompt
    do {
      newPrompt = prompts[Math.floor(Math.random() * prompts.length)]
    } while (newPrompt === currentPrompt && prompts.length > 1)

    setTimeout(() => {
      setCurrentPrompt(newPrompt)
      setIsLoading(false)
    }, 300)
  }

  return (
    <Card className="border border-navy-200">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center text-lg">
          <Star className="mr-2 h-5 w-5 text-amber-500" />
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-navy-700 italic">{currentPrompt}</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="ghost" size="sm" className="text-navy-600" onClick={getRandomPrompt} disabled={isLoading}>
          <RefreshCw className={`h-4 w-4 mr-1 ${isLoading ? "animate-spin" : ""}`} />
          New Prompt
        </Button>
        {onSelect && (
          <Button className="bg-navy-600 hover:bg-navy-700" size="sm" onClick={() => onSelect(currentPrompt)}>
            Use This Prompt
            <ArrowRight className="h-4 w-4 ml-1" />
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
