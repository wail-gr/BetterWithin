"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { Award, CheckCircle, Clock, Trophy, Zap, ArrowRight } from "lucide-react"

const mockChallenges = [
  {
    id: 1,
    title: "Gratitude Journal",
    description: "Write down three things you're grateful for today",
    category: "Mindfulness",
    points: 50,
    duration: "5 min",
    completed: false,
    content:
      "Practicing gratitude has been shown to increase happiness and reduce depression. Take a few minutes to reflect on the positive aspects of your life.",
    steps: [
      "Find a quiet moment in your day to reflect",
      "Think about three things that made you feel grateful today",
      "Write them down in your journal or in the app",
      "Take a moment to really feel the gratitude for each item",
    ],
  },
  {
    id: 2,
    title: "Digital Detox",
    description: "Spend 1 hour without using any digital devices",
    category: "Self-Care",
    points: 100,
    duration: "60 min",
    completed: false,
    content:
      "Constant digital stimulation can increase stress and anxiety. Taking a break from screens can help you reconnect with yourself and the world around you.",
    steps: [
      "Set aside a specific time for your digital detox",
      "Turn off notifications or put devices in another room",
      "Engage in an alternative activity like reading or walking",
      "Reflect on how you feel before and after the detox",
    ],
  },
  {
    id: 3,
    title: "Random Act of Kindness",
    description: "Do something nice for someone without expecting anything in return",
    category: "Social",
    points: 75,
    duration: "Varies",
    completed: false,
    content:
      "Acts of kindness benefit both the giver and receiver. They can reduce stress, improve emotional wellbeing, and create a sense of connection.",
    steps: [
      "Think of someone who might need a boost",
      "Consider what might be meaningful to them",
      "Perform your act of kindness anonymously if possible",
      "Reflect on how it made you feel afterward",
    ],
  },
]

export function MiniChallenge() {
  const [challenges, setChallenges] = useState(mockChallenges)
  const [activeChallenge, setActiveChallenge] = useState(mockChallenges[0])
  const [isCompleting, setIsCompleting] = useState(false)
  const { toast } = useToast()

  const completeChallenge = async (id: number) => {
    setIsCompleting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setChallenges(challenges.map((challenge) => (challenge.id === id ? { ...challenge, completed: true } : challenge)))

    toast({
      title: "Challenge completed!",
      description: `You earned ${activeChallenge.points} points`,
      variant: "default",
    })

    setIsCompleting(false)
  }

  return (
    <div className="space-y-6">
      <Card className="border border-elegant-200 dark:border-elegant-800 shadow-sm overflow-hidden">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="flex items-center">
                <Zap className="mr-2 h-5 w-5 text-amber-500" />
                Daily Challenge
              </CardTitle>
              <CardDescription>Complete challenges to earn points and grow</CardDescription>
            </div>
            <Badge className="bg-amber-500 hover:bg-amber-600 flex items-center gap-1">
              <Trophy className="h-3 w-3" />
              {activeChallenge.points} points
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeChallenge.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-xl font-semibold mb-2 text-navy-800 dark:text-navy-100">{activeChallenge.title}</h3>
              <p className="text-elegant-600 dark:text-elegant-300 mb-4">{activeChallenge.description}</p>

              <div className="flex items-center justify-between mb-2 text-sm">
                <span className="flex items-center text-elegant-500 dark:text-elegant-400">
                  <Clock className="h-4 w-4 mr-1" />
                  {activeChallenge.duration}
                </span>
                <Badge variant="outline" className="bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-300">
                  {activeChallenge.category}
                </Badge>
              </div>

              <div className="bg-amber-50 dark:bg-amber-950/50 p-4 rounded-lg mb-4 border border-amber-100 dark:border-amber-900">
                <p className="text-sm text-amber-800 dark:text-amber-200 mb-3">{activeChallenge.content}</p>
                <h4 className="font-medium mb-2 flex items-center text-amber-800 dark:text-amber-200">
                  <Award className="h-4 w-4 mr-1 text-amber-500" />
                  How to complete this challenge:
                </h4>
                <ol className="list-decimal list-inside text-sm space-y-2 text-amber-700 dark:text-amber-300">
                  {activeChallenge.steps.map((step, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 * index }}
                    >
                      {step}
                    </motion.li>
                  ))}
                </ol>
              </div>
            </motion.div>
          </AnimatePresence>
        </CardContent>
        <CardFooter>
          <Button
            className="w-full bg-amber-500 hover:bg-amber-600 text-white"
            onClick={() => completeChallenge(activeChallenge.id)}
            disabled={isCompleting}
          >
            {isCompleting ? (
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
                Completing...
              </span>
            ) : (
              "Complete Challenge"
            )}
          </Button>
        </CardFooter>
      </Card>

      <Card className="border border-elegant-200 dark:border-elegant-800 shadow-sm">
        <CardHeader>
          <CardTitle>Weekly Progress</CardTitle>
          <CardDescription>You've completed 2 of 7 challenges this week</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative h-2 mb-4">
            <Progress value={28} className="h-2" />
            <motion.div
              className="absolute top-0 left-0 h-full bg-amber-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: "28%" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </div>

          <div className="space-y-4">
            {challenges.map((challenge, index) => (
              <motion.div
                key={challenge.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="flex items-start gap-3 p-3 rounded-lg border border-elegant-200 dark:border-elegant-800 cursor-pointer hover:bg-elegant-50 dark:hover:bg-elegant-900 transition-colors"
                onClick={() => setActiveChallenge(challenge)}
              >
                <div
                  className={`p-2 rounded-md ${challenge.completed ? "bg-green-100 dark:bg-green-900" : "bg-amber-100 dark:bg-amber-900"}`}
                >
                  {challenge.completed ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : (
                    <Zap className="h-4 w-4 text-amber-500" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <h4 className="font-medium text-navy-800 dark:text-navy-100">{challenge.title}</h4>
                    <span className="text-xs font-medium flex items-center text-amber-600 dark:text-amber-400">
                      <Trophy className="h-3 w-3 mr-1" />
                      {challenge.points}
                    </span>
                  </div>
                  <p className="text-sm text-elegant-600 dark:text-elegant-300">{challenge.description}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="secondary" className="text-xs">
                      {challenge.category}
                    </Badge>
                    <span className="text-xs text-elegant-500 dark:text-elegant-400 flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {challenge.duration}
                    </span>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-elegant-400 self-center" />
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
