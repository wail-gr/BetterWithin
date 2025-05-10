"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { CreditCard, DollarSign, Heart, Check } from "lucide-react"

interface PaymentSystemProps {
  onSuccess?: (amount: number) => void
  onCancel?: () => void
  defaultAmount?: number
}

export function PaymentSystem({ onSuccess, onCancel, defaultAmount = 10 }: PaymentSystemProps) {
  const [amount, setAmount] = useState(defaultAmount)
  const [customAmount, setCustomAmount] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [isProcessing, setIsProcessing] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [cardDetails, setCardDetails] = useState({
    number: "",
    name: "",
    expiry: "",
    cvc: "",
  })
  const { toast } = useToast()

  const handleAmountSelect = (value: string) => {
    if (value === "custom") {
      setAmount(Number.parseFloat(customAmount) || defaultAmount)
    } else {
      setAmount(Number.parseInt(value))
    }
  }

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomAmount(e.target.value)
    if (e.target.value) {
      setAmount(Number.parseFloat(e.target.value))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Simulate successful payment
      setIsProcessing(false)
      setIsComplete(true)

      // Notify parent component
      if (onSuccess) {
        onSuccess(amount)
      }

      // Show success toast
      toast({
        title: "Payment successful!",
        description: `Thank you for your $${amount.toFixed(2)} donation to BetterWithin.`,
      })

      // Reset form after 3 seconds
      setTimeout(() => {
        setIsComplete(false)
        setCardDetails({
          number: "",
          name: "",
          expiry: "",
          cvc: "",
        })
      }, 3000)
    } catch (error) {
      setIsProcessing(false)
      toast({
        title: "Payment failed",
        description: "There was an error processing your payment. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleCancel = () => {
    if (onCancel) onCancel()
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Heart className="mr-2 h-5 w-5 text-red-500" />
          Support BetterWithin
        </CardTitle>
        <CardDescription>Your contribution helps us provide mental health resources to those in need</CardDescription>
      </CardHeader>

      <CardContent>
        {isComplete ? (
          <div className="py-8 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100 mb-4">
              <Check className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">Thank You!</h3>
            <p className="text-gray-500">Your donation of ${amount.toFixed(2)} has been received.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div>
                <Label className="text-base">Select Amount</Label>
                <RadioGroup
                  defaultValue="10"
                  className="grid grid-cols-3 gap-4 mt-2"
                  onValueChange={handleAmountSelect}
                >
                  <div>
                    <RadioGroupItem value="5" id="amount-5" className="peer sr-only" />
                    <Label
                      htmlFor="amount-5"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-teal-500 [&:has([data-state=checked])]:border-teal-500"
                    >
                      <DollarSign className="mb-1 h-4 w-4" />
                      $5
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem value="10" id="amount-10" className="peer sr-only" />
                    <Label
                      htmlFor="amount-10"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-teal-500 [&:has([data-state=checked])]:border-teal-500"
                    >
                      <DollarSign className="mb-1 h-4 w-4" />
                      $10
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem value="25" id="amount-25" className="peer sr-only" />
                    <Label
                      htmlFor="amount-25"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-teal-500 [&:has([data-state=checked])]:border-teal-500"
                    >
                      <DollarSign className="mb-1 h-4 w-4" />
                      $25
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem value="50" id="amount-50" className="peer sr-only" />
                    <Label
                      htmlFor="amount-50"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-teal-500 [&:has([data-state=checked])]:border-teal-500"
                    >
                      <DollarSign className="mb-1 h-4 w-4" />
                      $50
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem value="100" id="amount-100" className="peer sr-only" />
                    <Label
                      htmlFor="amount-100"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-teal-500 [&:has([data-state=checked])]:border-teal-500"
                    >
                      <DollarSign className="mb-1 h-4 w-4" />
                      $100
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem value="custom" id="amount-custom" className="peer sr-only" />
                    <Label
                      htmlFor="amount-custom"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-teal-500 [&:has([data-state=checked])]:border-teal-500"
                    >
                      <DollarSign className="mb-1 h-4 w-4" />
                      Custom
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Custom amount input */}
              <div className="space-y-2">
                <Label htmlFor="custom-amount">Custom Amount</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <Input
                    id="custom-amount"
                    placeholder="Enter amount"
                    className="pl-9"
                    value={customAmount}
                    onChange={handleCustomAmountChange}
                  />
                </div>
              </div>

              <Tabs defaultValue="card" className="w-full" onValueChange={setPaymentMethod}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="card">Credit Card</TabsTrigger>
                  <TabsTrigger value="paypal">PayPal</TabsTrigger>
                </TabsList>
                <TabsContent value="card" className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="card-number">Card Number</Label>
                    <div className="relative">
                      <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                      <Input
                        id="card-number"
                        placeholder="1234 5678 9012 3456"
                        className="pl-9"
                        value={cardDetails.number}
                        onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="card-name">Cardholder Name</Label>
                    <Input
                      id="card-name"
                      placeholder="John Doe"
                      value={cardDetails.name}
                      onChange={(e) => setCardDetails({ ...cardDetails, name: e.target.value })}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="card-expiry">Expiry Date</Label>
                      <Input
                        id="card-expiry"
                        placeholder="MM/YY"
                        value={cardDetails.expiry}
                        onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="card-cvc">CVC</Label>
                      <Input
                        id="card-cvc"
                        placeholder="123"
                        value={cardDetails.cvc}
                        onChange={(e) => setCardDetails({ ...cardDetails, cvc: e.target.value })}
                      />
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="paypal" className="py-4 text-center">
                  <p className="mb-4">You will be redirected to PayPal to complete your donation.</p>
                  <Button className="w-full bg-[#0070ba] hover:bg-[#005ea6]" type="button">
                    Continue with PayPal
                  </Button>
                </TabsContent>
              </Tabs>
            </div>
          </form>
        )}
      </CardContent>

      <CardFooter className="flex justify-between">
        {!isComplete && (
          <>
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button
              className="bg-teal-500 hover:bg-teal-600"
              onClick={handleSubmit}
              disabled={isProcessing || amount <= 0}
            >
              {isProcessing ? (
                <>
                  <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></span>
                  Processing...
                </>
              ) : (
                `Donate $${amount.toFixed(2)}`
              )}
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  )
}
