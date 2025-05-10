"use client"

import { CardDescription } from "@/components/ui/card"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsContent, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Chart, ChartTooltip } from "@/components/ui/chart"
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  LineChart,
  Line,
  RadialBarChart,
  RadialBar,
} from "recharts"
import { ArrowLeft, Award, BarChart2, Calendar, CheckCircle, Clock, Target, Trophy } from "lucide-react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"

const moodData = [
  { date: "Apr 1", mood: 3 },
  { date: "Apr 2", mood: 2 },
  { date: "Apr 3", mood: 4 },
  { date: "Apr 4", mood: 3 },
  { date: "Apr 5", mood: 5 },
  { date: "Apr 6", mood: 4 },
  { date: "Apr 7", mood: 3 },
  { date: "Apr 8", mood: 4 },
  { date: "Apr 9", mood: 5 },
  { date: "Apr 10", mood: 4 },
  { date: "Apr 11", mood: 3 },
  { date: "Apr 12", mood: 2 },
  { date: "Apr 13", mood: 3 },
  { date: "Apr 14", mood: 4 },
]

const activityData = [
  { name: "Lessons", completed: 12 },
  { name: "Challenges", completed: 8 },
  { name: "Journal", completed: 5 },
  { name: "Community", completed: 3 },
]

const COLORS = ["#14b8a6", "#0ea5e9", "#8b5cf6", "#f43f5e"]

const achievementData = [
  {
    id: 1,
    title: "Mindfulness Master",
    description: "Completed 7 consecutive days of mindfulness practice",
    date: "April 10, 2023",
    icon: <Award className="h-5 w-5 text-amber-500" />,
  },
  {
    id: 2,
    title: "Emotion Explorer",
    description: "Tracked your mood for 14 days in a row",
    date: "April 14, 2023",
    icon: <Trophy className="h-5 w-5 text-amber-500" />,
  },
  {
    id: 3,
    title: "Community Contributor",
    description: "Made 5 supportive comments in the community",
    date: "April 8, 2023",
    icon: <CheckCircle className="h-5 w-5 text-amber-500" />,
  },
]

const goalData = [
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

export default function ProgressPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [selectedGoal, setSelectedGoal] = useState<number | null>(null)
  const [selectedAchievement, setSelectedAchievement] = useState<number | null>(null)
  const [chartAnimated, setChartAnimated] = useState(false)

  // Trigger chart animations when tab changes
  useEffect(() => {
    setChartAnimated(false)
    const timer = setTimeout(() => {
      setChartAnimated(true)
    }, 100)
    return () => clearTimeout(timer)
  }, [activeTab])

  const handleTabChange = (value: string) => {
    setActiveTab(value)
  }

  return (
    <div className="container max-w-6xl mx-auto px-4 py-6 md:py-10">
      <Button variant="ghost" size="sm" asChild className="mb-4">
        <Link href="/" className="flex items-center gap-1">
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Link>
      </Button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6"
      >
        <h1 className="text-3xl font-bold mb-2">Your Progress</h1>
        <p className="text-gray-500 dark:text-gray-400">Track your journey and celebrate your achievements</p>
      </motion.div>

      <Tabs defaultValue="overview" value={activeTab} onValueChange={handleTabChange}>
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <BarChart2 className="h-4 w-4" />
            <span>Overview</span>
          </TabsTrigger>
          <TabsTrigger value="goals" className="flex items-center gap-2">
            <Target className="h-4 w-4" />
            <span>Goals</span>
          </TabsTrigger>
          <TabsTrigger value="achievements" className="flex items-center gap-2">
            <Trophy className="h-4 w-4" />
            <span>Achievements</span>
          </TabsTrigger>
        </TabsList>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart2 className="h-5 w-5 text-teal-500" />
                      Mood Tracker
                    </CardTitle>
                    <CardDescription>Your emotional journey over the past 14 days</CardDescription>
                  </CardHeader>
                  <CardContent>
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
                            <ChartTooltip />
                            <Area
                              type="monotone"
                              dataKey="mood"
                              stroke="#14b8a6"
                              fillOpacity={1}
                              fill="url(#moodGradient)"
                              strokeWidth={2}
                              animationDuration={1500}
                              animationEasing="ease-in-out"
                              isAnimationActive={chartAnimated}
                            />
                          </AreaChart>
                        </ResponsiveContainer>
                      </Chart>
                    </div>
                    <div className="flex justify-between mt-4 text-sm text-gray-500 dark:text-gray-400">
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
                        <span className="w-3 h-3 rounded-full bg-teal-400 mr-1"></span>
                        <span>Great (5)</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-teal-500" />
                      Activity Breakdown
                    </CardTitle>
                    <CardDescription>Your engagement across different activities</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] w-full">
                      <Chart>
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={activityData}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              outerRadius={100}
                              fill="#8884d8"
                              dataKey="completed"
                              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                              isAnimationActive={chartAnimated}
                              animationDuration={1500}
                              animationEasing="ease-out"
                            >
                              {activityData.map((entry, index) => (
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
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-teal-500" />
                    Weekly Activity
                  </CardTitle>
                  <CardDescription>Your engagement over the past week</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] w-full">
                    <Chart>
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={[
                            { day: "Mon", lessons: 2, challenges: 1, meditation: 1 },
                            { day: "Tue", lessons: 1, challenges: 0, meditation: 1 },
                            { day: "Wed", lessons: 3, challenges: 2, meditation: 1 },
                            { day: "Thu", lessons: 2, challenges: 1, meditation: 0 },
                            { day: "Fri", lessons: 1, challenges: 1, meditation: 1 },
                            { day: "Sat", lessons: 0, challenges: 2, meditation: 1 },
                            { day: "Sun", lessons: 1, challenges: 1, meditation: 1 },
                          ]}
                          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" vertical={false} />
                          <XAxis dataKey="day" />
                          <YAxis />
                          <ChartTooltip />
                          <Legend />
                          <Bar
                            dataKey="lessons"
                            name="Lessons"
                            fill="#14b8a6"
                            isAnimationActive={chartAnimated}
                            animationDuration={1500}
                            animationEasing="ease-out"
                            animationBegin={0}
                          />
                          <Bar
                            dataKey="challenges"
                            name="Challenges"
                            fill="#8b5cf6"
                            isAnimationActive={chartAnimated}
                            animationDuration={1500}
                            animationEasing="ease-out"
                            animationBegin={300}
                          />
                          <Bar
                            dataKey="meditation"
                            name="Meditation"
                            fill="#0ea5e9"
                            isAnimationActive={chartAnimated}
                            animationDuration={1500}
                            animationEasing="ease-out"
                            animationBegin={600}
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </Chart>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </motion.div>

          <motion.div
            key={activeTab === "goals" ? "goals" : ""}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <TabsContent value="goals" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-teal-500" />
                    Active Goals
                  </CardTitle>
                  <CardDescription>Track your progress towards personal goals</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {goalData.map((goal) => (
                      <motion.div
                        key={goal.id}
                        className={`space-y-2 p-4 rounded-lg cursor-pointer transition-all ${
                          selectedGoal === goal.id
                            ? "bg-teal-50 dark:bg-teal-900/20 border border-teal-200 dark:border-teal-800"
                            : "hover:bg-gray-50 dark:hover:bg-gray-900"
                        }`}
                        onClick={() => setSelectedGoal(selectedGoal === goal.id ? null : goal.id)}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                      >
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <Target className="h-4 w-4 text-teal-500" />
                            <span className="font-medium">{goal.title}</span>
                          </div>
                          <Badge variant="outline">{goal.category}</Badge>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{goal.target}</p>
                        <div className="flex items-center gap-2">
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden">
                            <motion.div
                              className="bg-teal-500 h-2.5 rounded-full"
                              initial={{ width: 0 }}
                              animate={{ width: `${goal.progress}%` }}
                              transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                            ></motion.div>
                          </div>
                          <span className="text-sm font-medium">{goal.progress}%</span>
                        </div>

                        <AnimatePresence>
                          {selectedGoal === goal.id && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                              className="mt-4 pt-4 border-t"
                            >
                              <div className="space-y-4">
                                <div>
                                  <h4 className="text-sm font-medium mb-2">Daily Progress</h4>
                                  <div className="h-[200px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                      <LineChart
                                        data={[
                                          { day: "Day 1", progress: 10 },
                                          { day: "Day 2", progress: 15 },
                                          { day: "Day 3", progress: 15 },
                                          { day: "Day 4", progress: 25 },
                                          { day: "Day 5", progress: 30 },
                                          { day: "Day 6", progress: 35 },
                                          { day: "Day 7", progress: 40 },
                                        ]}
                                        margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
                                      >
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                        <XAxis dataKey="day" />
                                        <YAxis />
                                        <Tooltip />
                                        <Line
                                          type="monotone"
                                          dataKey="progress"
                                          stroke="#14b8a6"
                                          strokeWidth={2}
                                          dot={{ fill: "#14b8a6", r: 4 }}
                                          activeDot={{ r: 6 }}
                                          isAnimationActive={true}
                                          animationDuration={1500}
                                        />
                                      </LineChart>
                                    </ResponsiveContainer>
                                  </div>
                                </div>

                                <div className="flex justify-between">
                                  <Button variant="outline" size="sm">
                                    Update Progress
                                  </Button>
                                  <Button variant="outline" size="sm" className="text-red-500 hover:text-red-600">
                                    Delete Goal
                                  </Button>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    ))}
                  </div>

                  <div className="mt-8">
                    <Button className="w-full bg-teal-500 hover:bg-teal-600">Add New Goal</Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    Completed Goals
                  </CardTitle>
                  <CardDescription>Celebrate your achievements</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <motion.div
                      className="p-4 border rounded-lg bg-gray-50 dark:bg-gray-900"
                      whileHover={{ scale: 1.01, boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)" }}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span className="font-medium">Daily Meditation</span>
                        </div>
                        <Badge
                          variant="outline"
                          className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 border-green-200 dark:border-green-800"
                        >
                          Completed
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                        Meditate for 5 minutes daily for 7 days
                      </p>
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <Calendar className="h-3 w-3 mr-1" />
                        <span>Completed on April 5, 2023</span>
                      </div>
                    </motion.div>

                    <motion.div
                      className="p-4 border rounded-lg bg-gray-50 dark:bg-gray-900"
                      whileHover={{ scale: 1.01, boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)" }}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span className="font-medium">Gratitude Journal</span>
                        </div>
                        <Badge
                          variant="outline"
                          className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 border-green-200 dark:border-green-800"
                        >
                          Completed
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                        Write three things you're grateful for daily for 14 days
                      </p>
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <Calendar className="h-3 w-3 mr-1" />
                        <span>Completed on March 22, 2023</span>
                      </div>
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </motion.div>

          <motion.div
            key={activeTab === "achievements" ? "achievements" : ""}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <TabsContent value="achievements" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-amber-500" />
                    Your Achievements
                  </CardTitle>
                  <CardDescription>Badges and milestones you've earned</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {achievementData.map((achievement) => (
                      <motion.div
                        key={achievement.id}
                        className={`border rounded-lg p-4 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950 dark:to-orange-950 border-amber-200 dark:border-amber-800 cursor-pointer ${
                          selectedAchievement === achievement.id ? "ring-2 ring-amber-400 dark:ring-amber-600" : ""
                        }`}
                        whileHover={{ scale: 1.03, boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() =>
                          setSelectedAchievement(selectedAchievement === achievement.id ? null : achievement.id)
                        }
                      >
                        <div className="flex items-center gap-2 mb-2">
                          {achievement.icon}
                          <h3 className="font-medium">{achievement.title}</h3>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{achievement.description}</p>
                        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                          <Calendar className="h-3 w-3 mr-1" />
                          <span>Earned on {achievement.date}</span>
                        </div>

                        <AnimatePresence>
                          {selectedAchievement === achievement.id && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                              className="mt-4 pt-4 border-t border-amber-200 dark:border-amber-800"
                            >
                              <div className="text-sm space-y-2">
                                <p className="font-medium">Achievement Details:</p>
                                <p>
                                  This achievement represents your dedication to personal growth and consistency in your
                                  mental health journey.
                                </p>
                                <Button variant="outline" size="sm" className="w-full mt-2">
                                  Share Achievement
                                </Button>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    ))}
                  </div>

                  <div className="mt-6 p-4 border rounded-lg bg-gray-50 dark:bg-gray-900">
                    <h3 className="font-medium mb-2">Upcoming Achievements</h3>
                    <div className="space-y-3">
                      <motion.div className="flex items-center gap-2" whileHover={{ x: 5 }}>
                        <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                          <Trophy className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                        </div>
                        <div>
                          <p className="font-medium">Consistency Champion</p>
                          <div className="flex items-center gap-2">
                            <div className="w-full max-w-[200px] bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                              <motion.div
                                className="bg-amber-500 h-1.5 rounded-full"
                                initial={{ width: 0 }}
                                animate={{ width: "47%" }}
                                transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
                              ></motion.div>
                            </div>
                            <span className="text-xs text-gray-500 dark:text-gray-400">14/30</span>
                          </div>
                        </div>
                      </motion.div>

                      <motion.div className="flex items-center gap-2" whileHover={{ x: 5 }}>
                        <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                          <Award className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                        </div>
                        <div>
                          <p className="font-medium">Community Mentor</p>
                          <div className="flex items-center gap-2">
                            <div className="w-full max-w-[200px] bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                              <motion.div
                                className="bg-amber-500 h-1.5 rounded-full"
                                initial={{ width: 0 }}
                                animate={{ width: "50%" }}
                                transition={{ duration: 1, ease: "easeOut", delay: 0.7 }}
                              ></motion.div>
                            </div>
                            <span className="text-xs text-gray-500 dark:text-gray-400">5/10</span>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart2 className="h-5 w-5 text-teal-500" />
                    Achievement Statistics
                  </CardTitle>
                  <CardDescription>Your progress across different categories</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] w-full">
                    <Chart>
                      <ResponsiveContainer width="100%" height="100%">
                        <RadialBarChart
                          cx="50%"
                          cy="50%"
                          innerRadius="20%"
                          outerRadius="80%"
                          barSize={20}
                          data={[
                            { name: "Mental Health", value: 62.5, fill: "#14b8a6" },
                            { name: "Social Skills", value: 50, fill: "#0ea5e9" },
                            { name: "Emotional Intelligence", value: 57.1, fill: "#8b5cf6" },
                            { name: "Mindfulness", value: 60, fill: "#f43f5e" },
                            { name: "Self-Care", value: 40, fill: "#22c55e" },
                          ]}
                        >
                          <RadialBar
                            minAngle={15}
                            label={{ position: "insideStart", fill: "#fff", fontWeight: 600 }}
                            background
                            clockWise
                            dataKey="value"
                            isAnimationActive={chartAnimated}
                            animationDuration={2000}
                            animationEasing="ease-out"
                          />
                          <Legend
                            iconSize={10}
                            layout="vertical"
                            verticalAlign="middle"
                            align="right"
                            wrapperStyle={{
                              top: 0,
                              left: 0,
                              lineHeight: "24px",
                            }}
                          />
                          <Tooltip />
                        </RadialBarChart>
                      </ResponsiveContainer>
                    </Chart>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </motion.div>
        </AnimatePresence>
      </Tabs>
    </div>
  )
}
