import { NextResponse } from "next/server"
import type { UserState } from "@/utils/ai-engines"

// Import the content generator engine
// In a real implementation, this would be a proper import
// For now, we'll mock the functionality
const contentGenerator = {
  generateLesson: (template: string, userState: UserState, snippets: any[] = []) => {
    // Mock implementation based on the content generator engine
    const content = {
      id: `generated-${template}-${Date.now()}`,
      title: template.charAt(0).toUpperCase() + template.slice(1).replace(/-/g, " "),
      description: `A lesson about ${template.replace(/-/g, " ")}`,
      sections: [
        {
          heading: "Introduction",
          content: `This is an introduction to ${template.replace(/-/g, " ")}.`,
        },
      ],
      timeToComplete: 10,
      tags: [template],
      emotionalStates: ["neutral"],
      type: "content",
      actionUrl: `/lessons/generated-${template}-${Date.now()}`,
    }

    // Personalize if user name is available
    if (userState.name) {
      content.personalizedGreeting = `Hello ${userState.name}, welcome to this lesson.`
    }

    return content
  },
}

export async function POST(request: Request) {
  try {
    const { template, userState, snippets } = await request.json()

    if (!template) {
      return NextResponse.json({ error: "Template is required" }, { status: 400 })
    }

    // Generate content using the content generator
    const content = contentGenerator.generateLesson(template, userState || {}, snippets || [])

    return NextResponse.json(content)
  } catch (error) {
    console.error("Error generating content:", error)
    return NextResponse.json({ error: "Failed to generate content" }, { status: 500 })
  }
}
