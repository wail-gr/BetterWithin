"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Chart, ChartTooltip } from "@/components/ui/chart"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { SmilePlus } from "lucide-react"

// Add import for offline utilities
import { offlineStorage, useOfflineStatus, useSyncOnReconnect } from "@/utils/offline-storage"

const moodEmojis = [
  { value: 1, emoji: "😔", label: "Sad" },
  { value: 2, emoji: "😕", label: "Down" },
  { value: 3, emoji: "😐", label: "Neutral" },
  { value: 4, emoji: "🙂", label: "Good" },
  { value: 5, emoji: "😄", label: "Great" },
]

const mockMoodData = [
  { day: "Mon", mood: 3 },
  { day: "Tue", mood: 2 },
  { day: "Wed", mood: 4 },
  { day: "Thu", mood: 3 },
  { day: "Fri", mood: 5 },
  { day: "Sat", mood: 4 },
  { day: "Sun", mood: 3 },
]

export function MoodTracker() {
  const [selectedMood, setSelectedMood] = useState<number | null>(null)
  const [reflection, setReflection] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  // Inside the MoodTracker component, modify the state to include offline support
  const [moods, setMoods] = useState(() => offlineStorage.getItems<any>("mood-tracking") || mockMoodData)
  const { isOnline } = useOfflineStatus()
  useSyncOnReconnect(["mood-tracking"])

  // Modify the handleMoodSubmit function
  const handleMoodSubmit = async () => {
    if (!selectedMood) {
      toast({
        title: "Please select a mood",
        description: "Select how you're feeling today",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    // Create new mood entry
    const today = new Date()
    const dayName = today.toLocaleDateString("en-US", { weekday: "short" }).slice(0, 3)

    const newMoodEntry = {
      id: Date.now(),
      day: dayName,
      mood: selectedMood,
      reflection: reflection,
      timestamp: today.toISOString(),
      syncStatus: isOnline ? "synced" : "pending",
    }

    // Update local state
    const updatedMoods = [newMoodEntry, ...moods.slice(0, 6)]
    setMoods(updatedMoods)

    // Save to localStorage
    offlineStorage.saveItems("mood-tracking", updatedMoods)

    // Simulate API call only if online
    if (isOnline) {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      toast({
        title: "Mood logged successfully",
        description: "Your mood has been recorded for today",
      })
    } else {
      toast({
        title: "Mood saved offline",
        description: "Your mood will sync when you're back online",
      })
    }

    setSelectedMood(null)
    setReflection("")
    setIsSubmitting(false)
  }

  return (
    <div className="space-y-6">
      <Card className="border border-elegant-200 dark:border-elegant-800 shadow-sm overflow-hidden">
        <CardHeader>
          <CardTitle className="flex items-center">
            <SmilePlus className="mr-2 h-5 w-5 text-navy-600 dark:text-navy-400" />
            How are you feeling today?
          </CardTitle>
          <CardDescription>Track your mood to gain insights into your emotional patterns</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between mb-6">
            {moodEmojis.map((mood) => (
              <motion.div key={mood.value} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="ghost"
                  className={`flex flex-col items-center p-3 ${
                    selectedMood === mood.value ? "bg-navy-100 dark:bg-navy-800 text-navy-800 dark:text-navy-100" : ""
                  }`}
                  onClick={() => setSelectedMood(mood.value)}
                >
                  <span className="text-3xl mb-1">{mood.emoji}</span>
                  <span className="text-xs">{mood.label}</span>
                </Button>
              </motion.div>
            ))}
          </div>

          <AnimatePresence>
            {selectedMood && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Textarea
                  placeholder="Reflect on why you feel this way... (optional)"
                  className="mb-4 border-elegant-300 dark:border-elegant-700 focus-visible:ring-navy-500"
                  value={reflection}
                  onChange={(e) => setReflection(e.target.value)}
                />
              </motion.div>
            )}
          </AnimatePresence>

          <Button
            className="w-full bg-navy-600 hover:bg-navy-700 text-white"
            onClick={handleMoodSubmit}
            disabled={!selectedMood || isSubmitting}
          >
            {isSubmitting ? (
              <span className="flex items-center">
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Logging Mood...
              </span>
            ) : (
              "Log Today's Mood"
            )}
          </Button>
          {/* Add a sync status indicator at the bottom of the first Card */}
          <div className="mt-2 text-xs text-gray-500 dark:text-gray-400 flex items-center">
            <span
              className={`inline-block w-2 h-2 rounded-full mr-1 ${isOnline ? "bg-green-500" : "bg-amber-500"}`}
            ></span>
            {isOnline ? "Connected: Data syncs instantly" : "Offline: Data will sync when connection returns"}
          </div>
        </CardContent>
      </Card>

      <Card className="border border-elegant-200 dark:border-elegant-800 shadow-sm">
        <CardHeader>
          <CardTitle>Your Mood This Week</CardTitle>
          <CardDescription>See how your mood has changed over time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[200px] w-full">
            <Chart>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={moods} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="moodGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#1e3a5f" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#1e3a5f" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                  <XAxis dataKey="day" stroke="#6b7280" />
                  <YAxis domain={[1, 5]} ticks={[1, 2, 3, 4, 5]} stroke="#6b7280" />
                  <ChartTooltip />
                  <Area type="monotone" dataKey="mood" stroke="#1e3a5f" fillOpacity={1} fill="url(#moodGradient)" />
                </AreaChart>
              </ResponsiveContainer>
            </Chart>
          </div>
          <div className="flex justify-between mt-4 text-sm text-elegant-600 dark:text-elegant-400">
            <div className="flex items-center">
              <span className="w-3 h-3 rounded-full bg-red-400 mr-1"></span>
              <span>Sad (1)</span>
            </div>
            <div className="flex items-center">
              <span className="w-3 h-3 rounded-full bg-orange-400 mr-1"></span>
              <span>Down (2)</span>
            </div>
            <div className="flex items-center">
              <span className="w-3 h-3 rounded-full bg-yellow-400 mr-1"></span>
              <span>Neutral (3)</span>
            </div>
            <div className="flex items-center">
              <span className="w-3 h-3 rounded-full bg-green-400 mr-1"></span>
              <span>Good (4)</span>
            </div>
            <div className="flex items-center">
              <span className="w-3 h-3 rounded-full bg-navy-400 mr-1"></span>
              <span>Great (5)</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
