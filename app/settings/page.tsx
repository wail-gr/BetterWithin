"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsList, TabsContent, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useToast } from "@/hooks/use-toast"
import { ArrowLeft, Bell, Camera, Globe, Lock, LogOut, Moon, Save, Shield, UserCircle, Heart } from "lucide-react"
import Link from "next/link"
import { motion } from "@/components/ui/motion"
import { PaymentSystem } from "@/components/payment-system"

export default function SettingsPage() {
  const [name, setName] = useState("Jamie Smith")
  const [email, setEmail] = useState("jamie.smith@example.com")
  const [emailVisibility, setEmailVisibility] = useState("friends")
  const [notifications, setNotifications] = useState({
    dailyLessons: true,
    challenges: true,
    communityActivity: false,
    directMessages: true,
  })
  const [language, setLanguage] = useState("english")
  const [theme, setTheme] = useState("light")
  const [isLoading, setIsLoading] = useState(false)
  const [showPaymentSystem, setShowPaymentSystem] = useState(false)
  const { toast } = useToast()

  const handleSaveProfile = async () => {
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "Profile updated",
        description: "Your profile information has been saved",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem updating your profile",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSaveNotifications = async () => {
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "Notification preferences saved",
        description: "Your notification settings have been updated",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem updating your notification settings",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSaveAppearance = async () => {
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "Appearance settings saved",
        description: "Your theme preferences have been updated",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem updating your appearance settings",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDonationSuccess = (amount: number) => {
    setShowPaymentSystem(false)
    toast({
      title: "Thank you for your support!",
      description: `Your donation of $${amount.toFixed(2)} helps us continue our mission.`,
    })
  }

  return (
    <div className="container max-w-4xl mx-auto px-4 py-6 md:py-10">
      <Button variant="ghost" size="sm" asChild className="mb-4">
        <Link href="/" className="flex items-center gap-1">
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Link>
      </Button>

      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Settings</h1>
        <p className="text-gray-500">Manage your account preferences and settings</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5 mb-6">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <UserCircle className="h-4 w-4" />
            <span>Profile</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            <span>Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="appearance" className="flex items-center gap-2">
            <Moon className="h-4 w-4" />
            <span>Appearance</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Lock className="h-4 w-4" />
            <span>Security</span>
          </TabsTrigger>
          <TabsTrigger value="support" className="flex items-center gap-2">
            <Heart className="h-4 w-4" />
            <span>Support</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Update your personal information and public profile</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col items-center sm:flex-row sm:items-start gap-6">
                <div className="relative">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src="/placeholder.svg?height=96&width=96" alt="Profile picture" />
                    <AvatarFallback className="text-xl">JS</AvatarFallback>
                  </Avatar>
                  <Button size="icon" variant="secondary" className="absolute bottom-0 right-0 h-8 w-8 rounded-full">
                    <Camera className="h-4 w-4" />
                  </Button>
                </div>
                <div className="space-y-4 flex-1">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email-visibility">Email Visibility</Label>
                    <Select value={emailVisibility} onValueChange={setEmailVisibility}>
                      <SelectTrigger id="email-visibility">
                        <SelectValue placeholder="Select who can see your email" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="public">Public</SelectItem>
                        <SelectItem value="friends">Friends Only</SelectItem>
                        <SelectItem value="private">Private</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-gray-500">Control who can see your email address</p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Cancel</Button>
              <Button className="bg-teal-500 hover:bg-teal-600" onClick={handleSaveProfile} disabled={isLoading}>
                {isLoading ? (
                  <span className="flex items-center gap-1">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    Saving...
                  </span>
                ) : (
                  <span className="flex items-center gap-1">
                    <Save className="h-4 w-4" />
                    Save Changes
                  </span>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Manage how and when you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Reminders for daily reflections</Label>
                    <p className="text-sm text-gray-500">Get gentle reminders to complete your daily reflection</p>
                  </div>
                  <motion.div whileTap={{ scale: 0.9 }}>
                    <Switch
                      checked={notifications.dailyLessons}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, dailyLessons: checked })}
                    />
                  </motion.div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">New life lesson available</Label>
                    <p className="text-sm text-gray-500">Be notified when new lessons are ready for you</p>
                  </div>
                  <motion.div whileTap={{ scale: 0.9 }}>
                    <Switch
                      checked={notifications.challenges}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, challenges: checked })}
                    />
                  </motion.div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Community interactions</Label>
                    <p className="text-sm text-gray-500">
                      Notifications for replies, likes, and mentions in the community
                    </p>
                  </div>
                  <motion.div whileTap={{ scale: 0.9 }}>
                    <Switch
                      checked={notifications.communityActivity}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, communityActivity: checked })}
                    />
                  </motion.div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Personal messages</Label>
                    <p className="text-sm text-gray-500">Get notified when someone sends you a direct message</p>
                  </div>
                  <motion.div whileTap={{ scale: 0.9 }}>
                    <Switch
                      checked={notifications.directMessages}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, directMessages: checked })}
                    />
                  </motion.div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Reset to Default</Button>
              <Button className="bg-teal-500 hover:bg-teal-600" onClick={handleSaveNotifications} disabled={isLoading}>
                {isLoading ? "Saving..." : "Save Preferences"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle>Appearance Settings</CardTitle>
              <CardDescription>Customize how the app looks and feels</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="theme">Theme</Label>
                <Select value={theme} onValueChange={setTheme}>
                  <SelectTrigger id="theme">
                    <SelectValue placeholder="Select a theme" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-gray-500">Choose how the app appears to you</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="language" className="flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  Language
                </Label>
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger id="language">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="arabic">العربية (Arabic)</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-gray-500">Choose your preferred language</p>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Animations</Label>
                  <p className="text-sm text-gray-500">Enable or disable animations throughout the app</p>
                </div>
                <motion.div whileTap={{ scale: 0.9 }}>
                  <Switch defaultChecked />
                </motion.div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Reset to Default</Button>
              <Button className="bg-teal-500 hover:bg-teal-600" onClick={handleSaveAppearance} disabled={isLoading}>
                {isLoading ? "Saving..." : "Save Preferences"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Manage your account security and privacy</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Change Password</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input id="current-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input id="new-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                    <Input id="confirm-password" type="password" />
                  </div>
                  <Button className="bg-teal-500 hover:bg-teal-600">Update Password</Button>
                </div>
              </div>

              <div className="pt-6 border-t">
                <h3 className="text-lg font-medium mb-4">Privacy Settings</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Profile Visibility</Label>
                      <p className="text-sm text-gray-500">Control who can see your profile information</p>
                    </div>
                    <Select defaultValue="friends">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select visibility" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="public">Public</SelectItem>
                        <SelectItem value="friends">Friends Only</SelectItem>
                        <SelectItem value="private">Private</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Data Collection</Label>
                      <p className="text-sm text-gray-500">Allow anonymous usage data to improve the app</p>
                    </div>
                    <motion.div whileTap={{ scale: 0.9 }}>
                      <Switch defaultChecked />
                    </motion.div>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t">
                <h3 className="text-lg font-medium flex items-center text-red-500 mb-4">
                  <Shield className="h-5 w-5 mr-2" />
                  Danger Zone
                </h3>
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <p className="font-medium">Sign out from all devices</p>
                      <p className="text-sm text-gray-500">This will log you out from all devices except this one</p>
                    </div>
                    <Button variant="outline" className="sm:w-auto w-full">
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out All
                    </Button>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <p className="font-medium">Delete Account</p>
                      <p className="text-sm text-gray-500">Permanently delete your account and all your data</p>
                    </div>
                    <Button variant="destructive" className="sm:w-auto w-full">
                      Delete Account
                    </Button>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t">
                <h3 className="text-lg font-medium mb-4">Legal</h3>
                <div className="space-y-2">
                  <Link href="/privacy" className="text-teal-600 hover:text-teal-700 flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    Privacy Policy & Terms of Use
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="support">
          <Card>
            <CardHeader>
              <CardTitle>Support BetterWithin</CardTitle>
              <CardDescription>Help us continue to provide mental health support to more people</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {showPaymentSystem ? (
                <PaymentSystem onSuccess={handleDonationSuccess} onCancel={() => setShowPaymentSystem(false)} />
              ) : (
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h2 className="text-xl font-semibold mb-4">Support the App</h2>
                  <p className="mb-4 text-gray-600">
                    Your contributions keep this app alive and help us reach more people who need support. Every
                    donation helps us improve our services and make mental health resources accessible to all.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 mb-6">
                    <div className="flex-1 border rounded-lg p-4 text-center">
                      <h3 className="font-medium mb-2">What your donation supports:</h3>
                      <ul className="text-left text-gray-600 space-y-2">
                        <li className="flex items-start">
                          <span className="text-teal-500 mr-2">✓</span>
                          Development of new mental health tools
                        </li>
                        <li className="flex items-start">
                          <span className="text-teal-500 mr-2">✓</span>
                          Creation of evidence-based content
                        </li>
                        <li className="flex items-start">
                          <span className="text-teal-500 mr-2">✓</span>
                          Accessibility improvements
                        </li>
                        <li className="flex items-start">
                          <span className="text-teal-500 mr-2">✓</span>
                          Keeping the app free for those who need it most
                        </li>
                      </ul>
                    </div>
                    <div className="flex-1 border rounded-lg p-4 bg-teal-50">
                      <h3 className="font-medium mb-2 text-center">Our Impact</h3>
                      <div className="space-y-3">
                        <div className="text-center">
                          <p className="text-2xl font-bold text-teal-600">10,000+</p>
                          <p className="text-sm text-gray-600">Users Supported</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-teal-600">85%</p>
                          <p className="text-sm text-gray-600">Report Improved Well-being</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-teal-600">24/7</p>
                          <p className="text-sm text-gray-600">Mental Health Resources</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="text-center">
                    <Button
                      onClick={() => setShowPaymentSystem(true)}
                      className="px-6 py-2 bg-teal-500 text-white rounded-full hover:bg-teal-600"
                    >
                      <Heart className="mr-2 h-4 w-4" />
                      Donate Now
                    </Button>
                  </div>

                  <p className="mt-6 text-gray-600 italic text-center">
                    "The best charity is the one done when you are in need but still give."
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
