import { UserGreeting } from "@/components/user-greeting"
import { DailyLesson } from "@/components/daily-lesson"
import { GoalProgress } from "@/components/goal-progress"
import { MiniChallenge } from "@/components/mini-challenge"
import { DynamicIsland } from "@/components/dynamic-island"
import { DonationsReminder } from "@/components/donations-reminder"
import Link from "next/link"
import { Settings } from "lucide-react"

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8 relative">
      {/* Settings button positioned absolutely in the top right corner */}
      <Link
        href="/settings"
        className="absolute top-4 right-4 p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-all duration-300 z-10"
        aria-label="Settings"
      >
        <Settings className="h-6 w-6 text-navy-600" />
      </Link>

      <DynamicIsland message="Welcome to BetterWithin" icon="👋" />
      <UserGreeting />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <div className="space-y-6">
          <DailyLesson />
        </div>
        <div className="space-y-6">
          <GoalProgress />
          <MiniChallenge />
        </div>
      </div>

      {/* Donations Reminder */}
      <DonationsReminder userName="Jamie" supportUrl="/settings?tab=support" />
    </main>
  )
}
