"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAIRecommendations } from "@/hooks/use-ai-recommendations"
import type { ContentItem } from "@/utils/ai-engines"

export function ContentGenerationUI() {
  const { generateContent } = useAIRecommendations()
  const [template, setTemplate] = useState("mindfulness")
  const [title, setTitle] = useState("")
  const [snippet, setSnippet] = useState("")
  const [generatedContent, setGeneratedContent] = useState<ContentItem | null>(null)
  const [loading, setLoading] = useState(false)

  const handleGenerate = async () => {
    setLoading(true)
    try {
      const snippets = snippet ? [{ content: snippet }] : []
      const content = await generateContent(template, snippets)
      setGeneratedContent(content)
    } catch (error) {
      console.error("Error generating content:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Generate Content</CardTitle>
          <CardDescription>Create new content for your mental health app</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Content Template</label>
            <Select value={template} onValueChange={setTemplate}>
              <SelectTrigger>
                <SelectValue placeholder="Select a template" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mindfulness">Mindfulness</SelectItem>
                <SelectItem value="anxiety-management">Anxiety Management</SelectItem>
                <SelectItem value="gratitude">Gratitude</SelectItem>
                <SelectItem value="sleep-improvement">Sleep Improvement</SelectItem>
                <SelectItem value="stress-management">Stress Management</SelectItem>
                <SelectItem value="mood-boosting">Mood Boosting</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Custom Title (Optional)</label>
            <Input
              type="text"
              placeholder="Enter a custom title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Additional Content (Optional)</label>
            <Textarea
              placeholder="Enter any additional content or notes"
              value={snippet}
              onChange={(e) => setSnippet(e.target.value)}
              rows={4}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleGenerate} disabled={loading}>
            {loading ? "Generating..." : "Generate Content"}
          </Button>
        </CardFooter>
      </Card>

      {generatedContent && (
        <Card>
          <CardHeader>
            <CardTitle>Generated Content</CardTitle>
            <CardDescription>Preview of your generated content</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <h2 className="text-xl font-bold">{generatedContent.title}</h2>
            <p>{generatedContent.description}</p>

            {generatedContent.sections?.map((section, index) => (
              <div key={index} className="border-t pt-4">
                <h3 className="font-semibold">{section.heading}</h3>
                <p>{section.content}</p>
              </div>
            ))}

            <div className="flex flex-wrap gap-2 mt-4">
              {generatedContent.tags?.map((tag) => (
                <span key={tag} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                  {tag}
                </span>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">Edit</Button>
            <Button>Save Content</Button>
          </CardFooter>
        </Card>
      )}
    </div>
  )
}
