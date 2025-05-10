"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { PlusCircle, Target, CheckCircle2 } from "lucide-react"

const mockGoals = [
  {
    id: 1,
    title: "Practice mindfulness",
    target: "10 minutes daily for 30 days",
    progress: 40,
    category: "Mental Health",
  },
  {
    id: 2,
    title: "Improve social connections",
    target: "Reach out to one friend weekly",
    progress: 75,
    category: "Social Skills",
  },
  {
    id: 3,
    title: "Develop emotional awareness",
    target: "Journal emotions daily for 2 weeks",
    progress: 20,
    category: "Emotional Intelligence",
  },
]

export function GoalProgress() {
  const [goals] = useState(mockGoals)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-medium text-elegant-600 dark:text-elegant-300">YOUR ACTIVE GOALS</h3>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 gap-1 text-navy-600 dark:text-navy-400 hover:text-navy-800 dark:hover:text-navy-200"
        >
          <PlusCircle className="h-4 w-4" />
          <span>Add Goal</span>
        </Button>
      </div>

      <div className="space-y-4">
        {goals.map((goal, index) => (
          <motion.div
            key={goal.id}
            className="space-y-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-navy-600 dark:text-navy-400" />
                <span className="font-medium text-navy-800 dark:text-navy-100">{goal.title}</span>
              </div>
              <Badge variant="outline" className="bg-navy-50 dark:bg-navy-900 text-navy-700 dark:text-navy-300">
                {goal.category}
              </Badge>
            </div>
            <p className="text-sm text-elegant-600 dark:text-elegant-300">{goal.target}</p>
            <div className="flex items-center gap-2">
              <div className="flex-1 relative">
                <Progress value={goal.progress} className="h-2" />
                <motion.div
                  className="absolute top-0 left-0 h-full bg-navy-600 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${goal.progress}%` }}
                  transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 + index * 0.1 }}
                  style={{ width: `${goal.progress}%` }}
                />
              </div>
              <span className="text-sm font-medium text-navy-700 dark:text-navy-300">{goal.progress}%</span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="pt-4 border-t border-elegant-200 dark:border-elegant-800">
        <Button
          variant="outline"
          className="w-full flex items-center gap-2 text-navy-700 dark:text-navy-300 hover:bg-navy-50 dark:hover:bg-navy-900"
        >
          <CheckCircle2 className="h-4 w-4" />
          <span>View All Goals</span>
        </Button>
      </div>
    </div>
  )
}
