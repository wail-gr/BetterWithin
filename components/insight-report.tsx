"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Chart, ChartTooltip } from "@/components/ui/chart"
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts"

interface Entry {
  id: number
  date: Date
  title: string
  content: string
  mood: string
  emotions: string[]
  isLocked: boolean
  hasImage: boolean
  imageUrl?: string
}

interface InsightReportProps {
  entries?: Entry[]
}

export function InsightReport({ entries = [] }: InsightReportProps) {
  const [timeRange, setTimeRange] = useState("week")

  // Mock data if no entries are provided
  const mockEntries =
    entries.length > 0
      ? entries
      : [
          {
            id: 1,
            date: new Date(),
            title: "Sample Entry 1",
            content: "This is a sample entry",
            mood: "happy",
            emotions: ["grateful", "excited"],
            isLocked: false,
            hasImage: false,
          },
          {
            id: 2,
            date: new Date(Date.now() - 86400000), // Yesterday
            title: "Sample Entry 2",
            content: "This is another sample entry",
            mood: "content",
            emotions: ["calm", "relaxed"],
            isLocked: false,
            hasImage: false,
          },
          {
            id: 3,
            date: new Date(Date.now() - 86400000 * 2), // 2 days ago
            title: "Sample Entry 3",
            content: "This is yet another sample entry",
            mood: "anxious",
            emotions: ["worried", "stressed"],
            isLocked: false,
            hasImage: false,
          },
        ]

  // Process entries to get mood data over time
  const getMoodData = () => {
    const now = new Date()
    let startDate: Date

    if (timeRange === "week") {
      startDate = new Date(now)
      startDate.setDate(now.getDate() - 7)
    } else if (timeRange === "month") {
      startDate = new Date(now)
      startDate.setMonth(now.getMonth() - 1)
    } else {
      startDate = new Date(now)
      startDate.setMonth(now.getMonth() - 3)
    }

    // Filter entries within the time range
    const filteredEntries = mockEntries.filter((entry) => entry.date >= startDate)

    // Sort by date
    const sortedEntries = [...filteredEntries].sort((a, b) => a.date.getTime() - b.date.getTime())

    // Map mood to numeric value for visualization
    const moodToValue = (mood: string): number => {
      switch (mood.toLowerCase()) {
        case "happy":
          return 5
        case "content":
          return 4
        case "anxious":
          return 3
        case "sad":
          return 2
        case "angry":
          return 1
        default:
          return 3
      }
    }

    // Format date based on time range
    const formatDate = (date: Date): string => {
      if (timeRange === "week") {
        return date.toLocaleDateString(undefined, { weekday: "short" })
      } else if (timeRange === "month") {
        return `${date.getMonth() + 1}/${date.getDate()}`
      } else {
        return `${date.getMonth() + 1}/${date.getDate()}`
      }
    }

    return sortedEntries.map((entry) => ({
      date: formatDate(entry.date),
      mood: moodToValue(entry.mood),
      actualMood: entry.mood,
    }))
  }

  // Get emotion frequency data
  const getEmotionData = () => {
    const emotionCounts: Record<string, number> = {}

    mockEntries.forEach((entry) => {
      entry.emotions.forEach((emotion) => {
        emotionCounts[emotion] = (emotionCounts[emotion] || 0) + 1
      })
    })

    // Sort by frequency and take top 5
    return Object.entries(emotionCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([name, value]) => ({ name, value }))
  }

  // Get mood distribution data
  const getMoodDistributionData = () => {
    const moodCounts: Record<string, number> = {}

    mockEntries.forEach((entry) => {
      moodCounts[entry.mood] = (moodCounts[entry.mood] || 0) + 1
    })

    return Object.entries(moodCounts).map(([name, value]) => ({ name, value }))
  }

  const moodData = getMoodData()
  const emotionData = getEmotionData()
  const moodDistributionData = getMoodDistributionData()

  const COLORS = ["#14b8a6", "#0ea5e9", "#8b5cf6", "#f43f5e", "#eab308"]

  return (
    <div className="space-y-6">
      <Tabs defaultValue="mood" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-4">
          <TabsTrigger value="mood">Mood Over Time</TabsTrigger>
          <TabsTrigger value="emotions">Top Emotions</TabsTrigger>
          <TabsTrigger value="distribution">Mood Distribution</TabsTrigger>
        </TabsList>

        <div className="mb-4">
          <TabsList className="w-auto">
            <TabsTrigger value="week" onClick={() => setTimeRange("week")}>
              Week
            </TabsTrigger>
            <TabsTrigger value="month" onClick={() => setTimeRange("month")}>
              Month
            </TabsTrigger>
            <TabsTrigger value="quarter" onClick={() => setTimeRange("quarter")}>
              3 Months
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="mood" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <div className="h-[300px] w-full">
                <Chart>
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={moodData} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
                      <defs>
                        <linearGradient id="moodGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="#14b8a6" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="date" />
                      <YAxis domain={[1, 5]} ticks={[1, 2, 3, 4, 5]} />
                      <ChartTooltip formatter={(value, name, props) => [props.payload.actualMood, "Mood"]} />
                      <Area type="monotone" dataKey="mood" stroke="#14b8a6" fillOpacity={1} fill="url(#moodGradient)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </Chart>
              </div>
              <div className="flex justify-between mt-4 text-sm text-gray-500">
                <div className="flex items-center">
                  <span className="w-3 h-3 rounded-full bg-red-400 mr-1"></span>
                  <span>Angry (1)</span>
                </div>
                <div className="flex items-center">
                  <span className="w-3 h-3 rounded-full bg-orange-400 mr-1"></span>
                  <span>Sad (2)</span>
                </div>
                <div className="flex items-center">
                  <span className="w-3 h-3 rounded-full bg-yellow-400 mr-1"></span>
                  <span>Anxious (3)</span>
                </div>
                <div className="flex items-center">
                  <span className="w-3 h-3 rounded-full bg-green-400 mr-1"></span>
                  <span>Content (4)</span>
                </div>
                <div className="flex items-center">
                  <span className="w-3 h-3 rounded-full bg-teal-400 mr-1"></span>
                  <span>Happy (5)</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="emotions" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <div className="h-[300px] w-full">
                <Chart>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={emotionData} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <ChartTooltip />
                      <Bar dataKey="value" name="Frequency">
                        {emotionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </Chart>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="distribution" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <div className="h-[300px] w-full">
                <Chart>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={moodDistributionData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {moodDistributionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Legend />
                      <ChartTooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </Chart>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
