"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, Video, Headphones, Clock } from "lucide-react"

interface LessonFiltersProps {
  selectedTypes: string[]
  toggleTypeFilter: (type: string) => void
  selectedLevels: string[]
  toggleLevelFilter: (level: string) => void
  selectedDuration: string | null
  setSelectedDuration: (duration: string | null) => void
}

export function LessonFilters({
  selectedTypes,
  toggleTypeFilter,
  selectedLevels,
  toggleLevelFilter,
  selectedDuration,
  setSelectedDuration,
}: LessonFiltersProps) {
  return (
    <Card className="mb-6 border border-navy-200 dark:border-navy-800">
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h3 className="text-sm font-medium mb-3">Lesson Type</h3>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedTypes.includes("text") ? "default" : "outline"}
                size="sm"
                className="flex items-center gap-1"
                onClick={() => toggleTypeFilter("text")}
              >
                <BookOpen className="h-4 w-4" />
                Text
              </Button>
              <Button
                variant={selectedTypes.includes("video") ? "default" : "outline"}
                size="sm"
                className="flex items-center gap-1"
                onClick={() => toggleTypeFilter("video")}
              >
                <Video className="h-4 w-4" />
                Video
              </Button>
              <Button
                variant={selectedTypes.includes("audio") ? "default" : "outline"}
                size="sm"
                className="flex items-center gap-1"
                onClick={() => toggleTypeFilter("audio")}
              >
                <Headphones className="h-4 w-4" />
                Audio
              </Button>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-3">Difficulty Level</h3>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedLevels.includes("Beginner") ? "default" : "outline"}
                size="sm"
                onClick={() => toggleLevelFilter("Beginner")}
              >
                Beginner
              </Button>
              <Button
                variant={selectedLevels.includes("Intermediate") ? "default" : "outline"}
                size="sm"
                onClick={() => toggleLevelFilter("Intermediate")}
              >
                Intermediate
              </Button>
              <Button
                variant={selectedLevels.includes("Advanced") ? "default" : "outline"}
                size="sm"
                onClick={() => toggleLevelFilter("Advanced")}
              >
                Advanced
              </Button>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-3">Duration</h3>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedDuration === "short" ? "default" : "outline"}
                size="sm"
                className="flex items-center gap-1"
                onClick={() => setSelectedDuration(selectedDuration === "short" ? null : "short")}
              >
                <Clock className="h-4 w-4" />
                Short (&lt;10 min)
              </Button>
              <Button
                variant={selectedDuration === "medium" ? "default" : "outline"}
                size="sm"
                className="flex items-center gap-1"
                onClick={() => setSelectedDuration(selectedDuration === "medium" ? null : "medium")}
              >
                <Clock className="h-4 w-4" />
                Medium (10-20 min)
              </Button>
              <Button
                variant={selectedDuration === "long" ? "default" : "outline"}
                size="sm"
                className="flex items-center gap-1"
                onClick={() => setSelectedDuration(selectedDuration === "long" ? null : "long")}
              >
                <Clock className="h-4 w-4" />
                Long (&gt;20 min)
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
