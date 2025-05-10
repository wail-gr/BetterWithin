import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, Tag, Heart } from "lucide-react"
import { Badge } from "@/components/ui/badge"

// Mock function to get lesson content
async function getLessonContent(id: string) {
  // In a real app, this would fetch from an API or database
  return {
    id,
    title: "Managing Anxiety",
    description: "Techniques to help manage and reduce anxiety",
    sections: [
      {
        heading: "Understanding Anxiety",
        content:
          "Anxiety is your body's natural response to stress. It's a feeling of fear or apprehension about what's to come. It's normal to feel anxious about moving to a new place, starting a new job, or taking a test. This type of anxiety is unpleasant, but it may motivate you to work harder and do a better job. Ordinary anxiety is a feeling that comes and goes but doesn't interfere with your everyday life.",
      },
      {
        heading: "Breathing Technique",
        content:
          "Try the 4-7-8 breathing technique: Inhale for 4 seconds, hold for 7 seconds, exhale for 8 seconds. This breathing pattern aims to reduce anxiety or help people get to sleep. Some proponents claim that the method helps people get to sleep in 1 minute. Breathing techniques are designed to bring the body into a state of deep relaxation. Specific patterns that involve holding the breath for a period of time allow your body to replenish its oxygen.",
      },
      {
        heading: "Grounding Exercise",
        content:
          "Name 5 things you can see, 4 things you can touch, 3 things you can hear, 2 things you can smell, and 1 thing you can taste. Grounding techniques help control these symptoms by turning attention away from thoughts, memories, or worries, and refocusing on the present moment. This technique can help you feel more centered and in control of your thoughts.",
      },
    ],
    timeToComplete: 10,
    tags: ["anxiety", "stress-relief", "breathing"],
    emotionalStates: ["anxious", "stressed", "overwhelmed"],
    type: "emotional",
  }
}

export default async function LessonPage({ params }: { params: { id: string } }) {
  const content = await getLessonContent(params.id)

  return (
    <div className="container mx-auto px-4 py-8">
      <Button variant="outline" className="mb-4" href="/lessons">
        ← Back to Lessons
      </Button>

      <Card className="mb-8">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-3xl">{content.title}</CardTitle>
              <CardDescription className="text-lg mt-2">{content.description}</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {content.timeToComplete} min
              </Badge>
              <Badge variant="outline" className="flex items-center gap-1">
                <Tag className="h-3 w-3" />
                {content.type}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="prose max-w-none">
          {content.sections.map((section, index) => (
            <div key={index} className="mb-6">
              <h2 className="text-xl font-semibold mb-2">{section.heading}</h2>
              <p>{section.content}</p>
            </div>
          ))}

          <div className="flex flex-wrap gap-2 mt-6">
            {content.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
        <CardFooter className="border-t pt-4 flex justify-between">
          <Button variant="outline" className="flex items-center gap-2">
            <Heart className="h-4 w-4" />
            Save
          </Button>
          <Button>Mark as Complete</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
