"use client"

import { useEffect, useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Heart } from "lucide-react"

const donationQuotes = [
  "Your sadaqah may be small in your eyes, but it may save someone from despair.",
  "The healing you give to others may be the reason Allah heals your own heart.",
  "Better Within is free because of people who gave, quietly and kindly.",
  "You never know whose darkness your small light may brighten.",
  "Charity extinguishes sins like water extinguishes fire. – Prophet Muhammad (صلى الله عليه وسلم)",
]

export default function DonationReminder() {
  const [enabled, setEnabled] = useState(true)
  const [showCard, setShowCard] = useState(false)
  const [quote, setQuote] = useState("")
  const { toast } = useToast()

  useEffect(() => {
    setEnabled(true) // Always enabled

    const last = Number.parseInt(localStorage.getItem("lastDonationReminder") || "0")
    const now = Date.now()
    const twoWeeks = 1000 * 60 * 60 * 24 * 14

    if (enabled && now - last > twoWeeks) {
      const randomQuote = donationQuotes[Math.floor(Math.random() * donationQuotes.length)]
      setQuote(randomQuote)

      // Show the card instead of a browser confirm dialog
      setTimeout(() => {
        setShowCard(true)
      }, 3000)
    }
  }, [enabled])

  const handleDonate = () => {
    window.open("https://payflow-ai-spark.vercel.app", "_blank")
    localStorage.setItem("lastDonationReminder", Date.now().toString())
    setShowCard(false)

    toast({
      title: "Thank you for your support!",
      description: "Your contribution helps us continue our mission.",
    })
  }

  const handleDismiss = () => {
    localStorage.setItem("lastDonationReminder", Date.now().toString())
    setShowCard(false)
  }

  if (!showCard) return null

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-sm">
      <Card className="border-teal-200 shadow-lg">
        <CardContent className="p-4">
          <div className="flex items-start space-x-4">
            <div className="bg-teal-100 p-2 rounded-full">
              <Heart className="h-6 w-6 text-teal-600" />
            </div>
            <div>
              <p className="text-gray-700 mb-3">{quote}</p>
              <div className="flex space-x-2">
                <Button variant="outline" onClick={handleDismiss}>
                  Maybe Later
                </Button>
                <Button onClick={handleDonate} className="bg-teal-500 hover:bg-teal-600">
                  Donate Now
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
