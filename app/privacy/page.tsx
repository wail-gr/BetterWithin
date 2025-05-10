import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Shield } from "lucide-react"
import Link from "next/link"

export default function PrivacyPolicyPage() {
  return (
    <div className="container max-w-4xl mx-auto px-4 py-6 md:py-10">
      <Button variant="ghost" size="sm" asChild className="mb-4">
        <Link href="/settings" className="flex items-center gap-1">
          <ArrowLeft className="h-4 w-4" />
          Back to Settings
        </Link>
      </Button>

      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2 flex items-center">
          <Shield className="h-6 w-6 mr-2 text-teal-500" />
          Privacy Policy & Terms of Use
        </h1>
        <p className="text-gray-500">Last updated: May 4, 2025</p>
      </div>

      <div className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl flex items-center">
              <Shield className="h-5 w-5 mr-2 text-teal-500" />
              Privacy Policy
            </CardTitle>
            <CardDescription>How we protect your data and privacy</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              At Better Within, your privacy is sacred. We do not collect, store, or sell your personal data. Any
              information you input — such as reflections, goals, or emotional states — remains on your device unless
              you choose to back it up manually. We do not use trackers, third-party ad systems, or analytics tools that
              monitor your behavior.
            </p>

            <h3 className="text-lg font-medium mt-4">What we do NOT do:</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>We do not sell your data.</li>
              <li>We do not read your notes or reflections.</li>
              <li>We do not send your data to any external servers unless explicitly stated and permitted by you.</li>
            </ul>

            <h3 className="text-lg font-medium mt-4">Your control:</h3>
            <p>You can delete your app data or reset your journey at any time within the app's settings.</p>

            <h3 className="text-lg font-medium mt-4">Security:</h3>
            <p>
              We use SSL encryption for any communication (if future features like donations or messaging are added).
            </p>

            <p className="mt-4">
              We respect your trust. We are building Better Within not for profit — but for people.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Terms of Use</CardTitle>
            <CardDescription>Guidelines for using Better Within</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>By using Better Within, you agree to the following:</p>

            <h3 className="text-lg font-medium mt-4">1. Respectful and Safe Space</h3>
            <p>
              This app is designed to support emotional growth, healing, and spiritual reflection. You agree not to
              upload, share, or promote any content that includes:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Adult or explicit material</li>
              <li>Violence, weapons, or threats</li>
              <li>Hate speech, racism, or discrimination</li>
              <li>Self-harm encouragement or harmful advice</li>
              <li>Any offensive, unpleasant, or disturbing content</li>
            </ul>
            <p>This app is not a place for shock, cruelty, or distraction — it is a place for peace.</p>

            <h3 className="text-lg font-medium mt-4">2. Non-Therapeutic Disclaimer</h3>
            <p>
              Better Within is not a substitute for clinical therapy or emergency services. If you are in crisis, please
              seek immediate help from a licensed professional or local support line.
            </p>

            <h3 className="text-lg font-medium mt-4">3. Intellectual Property</h3>
            <p>
              All content within the app — including quotes, lessons, and UI design — is protected. You may not copy,
              resell, or distribute it without permission.
            </p>

            <h3 className="text-lg font-medium mt-4">4. Donations and Payments</h3>
            <p>
              If you choose to donate, you are doing so voluntarily to help sustain the app's mission. We do not
              pressure or require payment.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
