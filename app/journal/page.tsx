"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PlusCircle, BookOpen, BarChart2, ArrowLeft } from "lucide-react"
import { JournalEntry } from "@/components/journal-entry"
import { EmotionPicker } from "@/components/emotion-picker"
import { InsightReport } from "@/components/insight-report"
import { JournalPrompt } from "@/components/journal-prompt"
import Link from "next/link"
import { motion } from "framer-motion"
import { useToast } from "@/hooks/use-toast"

// Mock data for journal entries
const mockJournalEntries = [
  {
    id: 1,
    date: new Date(),
    title: "Today was a good day",
    content:
      "I woke up feeling refreshed and managed to complete all my tasks for school. Had a nice conversation with my friend Sarah about our upcoming project. I'm feeling proud of myself for staying organized.",
    mood: "happy",
    emotions: ["proud", "calm", "motivated"],
    isLocked: false,
    hasImage: true,
    imageUrl: "/placeholder.svg?height=200&width=300",
    color: "green",
  },
  {
    id: 2,
    date: new Date(Date.now() - 86400000), // Yesterday
    title: "Feeling a bit anxious",
    content:
      "I have a big test coming up and I'm feeling nervous about it. Tried some deep breathing exercises that helped a little. Need to focus on studying more efficiently instead of worrying so much.",
    mood: "anxious",
    emotions: ["worried", "stressed", "hopeful"],
    isLocked: true,
    hasImage: false,
    color: "blue",
  },
  {
    id: 3,
    date: new Date(Date.now() - 86400000 * 2), // 2 days ago
    title: "Family dinner",
    content:
      "Had dinner with my family tonight. It was nice to catch up with everyone. My little brother was being annoying as usual, but I managed to stay patient. Mom made my favorite dessert which was a nice surprise.",
    mood: "content",
    emotions: ["grateful", "relaxed", "loved"],
    isLocked: false,
    hasImage: true,
    imageUrl: "/placeholder.svg?height=200&width=300",
    color: "purple",
  },
  {
    id: 4,
    date: new Date(Date.now() - 86400000 * 5), // 5 days ago
    title: "Feeling down today",
    content:
      "Didn't sleep well last night and felt tired all day. Struggled to focus in class and got a lower grade than expected on my assignment. Trying to remind myself that one bad day doesn't define me.",
    mood: "sad",
    emotions: ["disappointed", "tired", "hopeful"],
    isLocked: false,
    hasImage: false,
    color: "yellow",
  },
]

export default function JournalPage() {
  const [activeTab, setActiveTab] = useState("entries")
  const [isWriting, setIsWriting] = useState(false)
  const [selectedMood, setSelectedMood] = useState("neutral")
  const [selectedEmotions, setSelectedEmotions] = useState<string[]>([])
  const [journalEntries, setJournalEntries] = useState(mockJournalEntries)
  const [journalContent, setJournalContent] = useState("")
  const [journalTitle, setJournalTitle] = useState("")
  const [selectedColor, setSelectedColor] = useState("")
  const { toast } = useToast()

  const handleViewEntry = (id: number) => {
    const entry = journalEntries.find((entry) => entry.id === id)
    if (entry) {
      toast({
        title: entry.title,
        description: entry.isLocked
          ? "This entry is locked. Unlock to view content."
          : entry.content.substring(0, 100) + "...",
      })
    }
  }

  const handleEditEntry = (id: number) => {
    const entry = journalEntries.find((entry) => entry.id === id)
    if (entry && !entry.isLocked) {
      setJournalTitle(entry.title)
      setJournalContent(entry.content)
      setSelectedMood(entry.mood)
      setSelectedEmotions(entry.emotions)
      setSelectedColor(entry.color || "")
      setIsWriting(true)

      // Remove the entry that's being edited
      setJournalEntries(journalEntries.filter((e) => e.id !== id))
    } else {
      toast({
        title: "Cannot edit",
        description: "This entry is locked. Please unlock it first.",
        variant: "destructive",
      })
    }
  }

  const handleDeleteEntry = (id: number) => {
    setJournalEntries(journalEntries.filter((entry) => entry.id !== id))
    toast({
      title: "Entry deleted",
      description: "Your journal entry has been deleted.",
    })
  }

  const handleToggleLock = (id: number) => {
    setJournalEntries(
      journalEntries.map((entry) => {
        if (entry.id === id) {
          const newState = !entry.isLocked
          toast({
            title: newState ? "Entry locked" : "Entry unlocked",
            description: newState ? "Your journal entry is now private." : "Your journal entry is now visible.",
          })
          return { ...entry, isLocked: newState }
        }
        return entry
      }),
    )
  }

  const handleChangeColor = (id: number, color: string) => {
    setJournalEntries(
      journalEntries.map((entry) => {
        if (entry.id === id) {
          return { ...entry, color }
        }
        return entry
      }),
    )
    toast({
      title: "Color changed",
      description: "Your journal entry color has been updated.",
    })
  }

  const handleToggleEmotion = (emotion: string) => {
    setSelectedEmotions((prev) => (prev.includes(emotion) ? prev.filter((e) => e !== emotion) : [...prev, emotion]))
  }

  const handleSaveEntry = () => {
    if (!journalTitle.trim() || !journalContent.trim()) {
      toast({
        title: "Cannot save",
        description: "Please add a title and content to your journal entry.",
        variant: "destructive",
      })
      return
    }

    const newEntry = {
      id: Date.now(),
      date: new Date(),
      title: journalTitle,
      content: journalContent,
      mood: selectedMood,
      emotions: selectedEmotions.length > 0 ? selectedEmotions : ["reflective"], // Default emotion
      isLocked: false,
      hasImage: false,
      color: selectedColor,
    }

    setJournalEntries([newEntry, ...journalEntries])
    setJournalTitle("")
    setJournalContent("")
    setSelectedMood("neutral")
    setSelectedEmotions([])
    setSelectedColor("")
    setIsWriting(false)

    toast({
      title: "Entry saved",
      description: "Your journal entry has been saved successfully.",
    })
  }

  const colorOptions = [
    { name: "Default", value: "" },
    { name: "Rich Red", value: "red", color: "#D44A4A" },
    { name: "Vibrant Purple", value: "purple", color: "#9C5EF7" },
    { name: "Spring Green", value: "green", color: "#A5D6A7" },
    { name: "Sky Blue", value: "blue", color: "#90CAF9" },
    { name: "Golden Yellow", value: "yellow", color: "#FFF176" },
    { name: "Soft Orange", value: "orange", color: "#FFCC80" },
  ]

  return (
    <main className="container mx-auto px-4 py-8 pb-20">
      <div className="flex justify-between items-center mb-6">
        <div>
          <Button variant="ghost" size="sm" asChild className="mb-2">
            <Link href="/" className="flex items-center gap-1">
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Link>
          </Button>
          <h1 className="text-3xl font-bold typing-animation">Journal</h1>
        </div>
      </div>

      <Tabs defaultValue="entries" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="entries" className="flex items-center gap-2">
            <BookOpen size={16} />
            <span>Entries</span>
          </TabsTrigger>
          <TabsTrigger value="insights" className="flex items-center gap-2">
            <BarChart2 size={16} />
            <span>Insights</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="entries" className="space-y-6">
          {!isWriting ? (
            <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
              <Button
                onClick={() => setIsWriting(true)}
                className="w-full py-8 text-lg flex items-center justify-center gap-2 bg-navy-600 hover:bg-navy-700 text-white"
              >
                <PlusCircle size={24} />
                <span>New Journal Entry</span>
              </Button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`bg-white rounded-lg shadow-md p-6 mb-6 ${selectedColor ? `card-${selectedColor}` : ""}`}
            >
              <h2 className="text-xl font-semibold mb-4">How are you feeling today?</h2>

              <EmotionPicker
                selectedEmotion={selectedMood}
                onSelectEmotion={setSelectedMood}
                selectedEmotions={selectedEmotions}
                onToggleEmotion={handleToggleEmotion}
              />

              <div className="mt-6">
                <label htmlFor="journal-title" className="block text-sm font-medium text-gray-700 mb-2">
                  Title
                </label>
                <input
                  id="journal-title"
                  type="text"
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-navy-500 focus:border-transparent"
                  placeholder="Give your entry a title"
                  value={journalTitle}
                  onChange={(e) => setJournalTitle(e.target.value)}
                />
              </div>

              <div className="mt-4">
                <label htmlFor="journal-content" className="block text-sm font-medium text-gray-700 mb-2">
                  Write your thoughts
                </label>
                <textarea
                  id="journal-content"
                  rows={6}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-navy-500 focus:border-transparent"
                  placeholder="What's on your mind today?"
                  value={journalContent}
                  onChange={(e) => setJournalContent(e.target.value)}
                ></textarea>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Card Color</label>
                <div className="flex flex-wrap gap-2">
                  {colorOptions.map((color) => (
                    <div
                      key={color.value}
                      className={`w-8 h-8 rounded-full cursor-pointer border ${
                        color.value === selectedColor ? "ring-2 ring-navy-500 ring-offset-2" : ""
                      } ${color.value === "" ? "bg-white border-gray-300" : ""}`}
                      style={color.value ? { backgroundColor: color.color } : {}}
                      title={color.name}
                      onClick={() => setSelectedColor(color.value)}
                    />
                  ))}
                </div>
              </div>

              <div className="mt-4">
                <JournalPrompt emotion={selectedMood} />
              </div>

              <div className="flex justify-end mt-6 space-x-3">
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsWriting(false)
                    setJournalTitle("")
                    setJournalContent("")
                    setSelectedMood("neutral")
                    setSelectedEmotions([])
                    setSelectedColor("")
                  }}
                >
                  Cancel
                </Button>
                <Button onClick={handleSaveEntry}>Save Entry</Button>
              </div>
            </motion.div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {journalEntries.map((entry) => (
              <JournalEntry
                key={entry.id}
                entry={entry}
                onView={() => handleViewEntry(entry.id)}
                onEdit={() => handleEditEntry(entry.id)}
                onDelete={() => handleDeleteEntry(entry.id)}
                onToggleLock={() => handleToggleLock(entry.id)}
                onChangeColor={handleChangeColor}
              />
            ))}
          </div>

          {journalEntries.length === 0 && !isWriting && (
            <div className="text-center py-12 text-gray-500">
              <p>No journal entries yet. Start writing to track your thoughts and feelings.</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="insights">
          <InsightReport entries={journalEntries} />
        </TabsContent>
      </Tabs>
    </main>
  )
}
