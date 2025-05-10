"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Brain, Send, User, ArrowLeft } from "lucide-react"
import Link from "next/link"

// This would be replaced with actual AI SDK integration
const mockAIResponses = [
  "I understand that you're feeling anxious about your upcoming presentation. Remember that it's normal to feel nervous, and these feelings don't define your abilities or worth.",
  "It sounds like you're going through a challenging time with your friends. Social relationships can be complex, but remember that communication is key to resolving misunderstandings.",
  "I'm hearing that you're feeling overwhelmed with school work. Let's break this down into smaller, manageable tasks. What's the most immediate deadline you're facing?",
  "I'm sorry to hear you're feeling down today. Would you like to try a quick mindfulness exercise together? It might help shift your perspective a bit.",
  "That's a great achievement! Celebrating small wins is important for building confidence and motivation. How did accomplishing that make you feel?",
]

type Message = {
  id: number
  content: string
  sender: "user" | "ai"
  timestamp: Date
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      content: "Hi there! I'm MindfulAI, your supportive companion. How are you feeling today?",
      sender: "ai",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = () => {
    if (!input.trim()) return

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      content: input,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages([...messages, userMessage])
    setInput("")
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const randomResponse = mockAIResponses[Math.floor(Math.random() * mockAIResponses.length)]

      const aiMessage: Message = {
        id: messages.length + 2,
        content: randomResponse,
        sender: "ai",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, aiMessage])
      setIsTyping(false)
    }, 1500)
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <div className="container max-w-4xl mx-auto px-4 py-6 md:py-10">
      <div className="mb-6">
        <Button variant="ghost" size="sm" asChild className="mb-4">
          <Link href="/" className="flex items-center gap-1">
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>
        </Button>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Avatar className="h-8 w-8 bg-purple-100 dark:bg-purple-900">
                <AvatarFallback className="bg-purple-500 text-white">AI</AvatarFallback>
                <AvatarImage src="/placeholder.svg?height=32&width=32" />
              </Avatar>
              <span>MindfulAI Assistant</span>
            </CardTitle>
            <CardDescription>
              I'm here to listen, support, and guide you. Everything you share is private and confidential.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div className="space-y-4 max-h-[60vh] overflow-y-auto p-1">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div className="flex gap-3 max-w-[80%]">
                    {message.sender === "ai" && (
                      <Avatar className="h-8 w-8 mt-1">
                        <AvatarFallback className="bg-purple-500 text-white">
                          <Brain className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                    )}

                    <div>
                      <div
                        className={`p-3 rounded-lg ${
                          message.sender === "user" ? "bg-purple-500 text-white" : "bg-gray-100 dark:bg-gray-800"
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{formatTime(message.timestamp)}</p>
                    </div>

                    {message.sender === "user" && (
                      <Avatar className="h-8 w-8 mt-1">
                        <AvatarFallback className="bg-gray-300 dark:bg-gray-700">
                          <User className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex gap-3 max-w-[80%]">
                    <Avatar className="h-8 w-8 mt-1">
                      <AvatarFallback className="bg-purple-500 text-white">
                        <Brain className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>

                    <div>
                      <div className="p-3 rounded-lg bg-gray-100 dark:bg-gray-800">
                        <div className="flex space-x-1">
                          <div
                            className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-500 animate-bounce"
                            style={{ animationDelay: "0ms" }}
                          ></div>
                          <div
                            className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-500 animate-bounce"
                            style={{ animationDelay: "150ms" }}
                          ></div>
                          <div
                            className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-500 animate-bounce"
                            style={{ animationDelay: "300ms" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </CardContent>

          <CardFooter>
            <form
              className="flex w-full gap-2"
              onSubmit={(e) => {
                e.preventDefault()
                handleSendMessage()
              }}
            >
              <Input
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1"
              />
              <Button
                type="submit"
                size="icon"
                disabled={!input.trim() || isTyping}
                className="bg-purple-500 hover:bg-purple-600"
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
