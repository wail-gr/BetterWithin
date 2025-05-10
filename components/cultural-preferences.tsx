"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useLocalStorage } from "react-use"

interface CulturalPreferencesProps {
  onPreferenceChange?: (preference: string) => void
  className?: string
}

export function CulturalPreferences({ onPreferenceChange, className = "" }: CulturalPreferencesProps) {
  const [culturalPreference, setCulturalPreference] = useLocalStorage("cultural-preference", "secular")
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (culturalPreference && onPreferenceChange) {
      onPreferenceChange(culturalPreference)
    }
  }, [culturalPreference, onPreferenceChange])

  const handlePreferenceChange = (value: string) => {
    setCulturalPreference(value)
    if (onPreferenceChange) {
      onPreferenceChange(value)
    }
  }

  return (
    <div className={className}>
      {isOpen ? (
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Cultural Preferences</CardTitle>
            <CardDescription>
              Choose a cultural perspective to personalize your content. This helps us provide more relevant insights
              and recommendations.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue={culturalPreference} onValueChange={handlePreferenceChange}>
              <TabsList className="grid grid-cols-2 md:grid-cols-3 gap-2">
                <TabsTrigger value="secular">Secular</TabsTrigger>
                <TabsTrigger value="islamic">Islamic</TabsTrigger>
                <TabsTrigger value="christian">Christian</TabsTrigger>
                <TabsTrigger value="jewish">Jewish</TabsTrigger>
                <TabsTrigger value="buddhist">Buddhist</TabsTrigger>
                <TabsTrigger value="hindu">Hindu</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Close
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <Button variant="outline" onClick={() => setIsOpen(true)}>
          Cultural Preferences
        </Button>
      )}
    </div>
  )
}
