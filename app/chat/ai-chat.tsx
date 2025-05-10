"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Brain, Send, User, Sparkles, Mic, ThumbsUp, ThumbsDown, Heart, Smile, Frown, Meh } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

type Message = {
  id: number
  content: string
  sender: "user" | "ai"
  timestamp: Date
  feedback?: "helpful" | "not-helpful"
  emotion?: "happy" | "neutral" | "sad"
}

type SuggestionType = {
  text: string
  icon: React.ReactNode
}

export function AIChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      content:
        "Hi there! I'm MindfulAI, your supportive companion. I'm here to listen and help you navigate your emotions and challenges. How are you feeling today?",
      sender: "ai",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [showEmotionPicker, setShowEmotionPicker] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const suggestions: SuggestionType[] = [
    { text: "I'm feeling anxious about school", icon: <Frown className="h-3 w-3" /> },
    { text: "How can I improve my mood?", icon: <Smile className="h-3 w-3" /> },
    { text: "I had a fight with my friend", icon: <Meh className="h-3 w-3" /> },
    { text: "I need help with stress", icon: <Sparkles className="h-3 w-3" /> },
  ]

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Simulate typing effect for AI responses
  useEffect(() => {
    if (isTyping && messages.length > 0) {
      const lastMessage = messages[messages.length - 1]
      if (lastMessage.sender === "ai") {
        const fullText = lastMessage.content
        let currentIndex = 0

        const typingInterval = setInterval(() => {
          if (currentIndex < fullText.length) {
            setMessages((prevMessages) => {
              const updatedMessages = [...prevMessages]
              const updatedMessage = { ...updatedMessages[updatedMessages.length - 1] }
              updatedMessage.content = fullText.substring(0, currentIndex + 1)
              updatedMessages[updatedMessages.length - 1] = updatedMessage
              return updatedMessages
            })
            currentIndex++
          } else {
            clearInterval(typingInterval)
            setIsTyping(false)
          }
        }, 15) // Adjust typing speed here

        return () => clearInterval(typingInterval)
      }
    }
  }, [isTyping, messages])

  const handleSendMessage = async () => {
    if ((!input.trim() && !showEmotionPicker) || isLoading) return

    const messageContent = input.trim()

    if (showEmotionPicker) {
      setShowEmotionPicker(false)
    }

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      content: messageContent,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      // Create a placeholder for the AI response
      const placeholderMessage: Message = {
        id: messages.length + 2,
        content: "",
        sender: "ai",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, placeholderMessage])
      setIsTyping(true)

      // In a real implementation, we would use the AI SDK
      // This is a simulation for now
      const systemPrompt = `You are MindfulAI, a highly empathetic and supportive AI assistant for teenagers and young adults struggling with mental health challenges.

Your primary goals are to:
1. Provide emotional support with genuine warmth and understanding
2. Validate users' feelings without judgment
3. Offer practical, age-appropriate coping strategies
4. Encourage healthy habits and positive thinking
5. Recognize when to suggest professional help

Your tone is:
- Warm, compassionate and nurturing
- Conversational and relatable to young people (ages 13-25)
- Encouraging and hopeful, but never dismissive of real struggles
- Calm and reassuring during moments of distress

When responding:
- Use a mix of shorter and longer sentences for natural conversation flow
- Ask thoughtful follow-up questions to better understand the user's situation
- Provide specific, actionable suggestions rather than generic advice
- Acknowledge the difficulty of mental health challenges
- Use supportive phrases like "I hear you," "That sounds really difficult," and "You're not alone in feeling this way"
- Occasionally use gentle humor when appropriate, but never make light of serious issues

IMPORTANT: If the user expresses thoughts of self-harm or suicide, immediately provide crisis resources and encourage them to reach out to a trusted adult, counselor, or crisis hotline.`

      // Simulate AI response with a delay
      setTimeout(async () => {
        try {
          // In a real implementation with the AI SDK:
          /*
          const { text } = await generateText({
            model: openai("gpt-4o"),
            prompt: messageContent,
            system: systemPrompt,
          });
          */

          // For now, generate a compassionate response based on keywords
          let aiResponse = ""
          const lowerCaseInput = messageContent.toLowerCase()

          if (
            lowerCaseInput.includes("anxious") ||
            lowerCaseInput.includes("anxiety") ||
            lowerCaseInput.includes("worried")
          ) {
            aiResponse =
              "I can hear that anxiety is really affecting you right now. That feeling of worry and unease can be so overwhelming sometimes. Remember that anxiety is your body's natural response to stress, even if it feels uncomfortable. Would you like to try a quick grounding exercise together? Or maybe you could tell me more about what's triggering these feelings for you?"
          } else if (
            lowerCaseInput.includes("sad") ||
            lowerCaseInput.includes("depressed") ||
            lowerCaseInput.includes("down")
          ) {
            aiResponse =
              "I'm really sorry you're feeling this way. Sadness and low moods can make everything feel heavier and more difficult. Your feelings are valid, and it takes courage to acknowledge them. Would it help to talk about what might be contributing to these feelings? Sometimes identifying specific triggers can be a first step toward feeling better."
          } else if (
            lowerCaseInput.includes("friend") ||
            lowerCaseInput.includes("relationship") ||
            lowerCaseInput.includes("fight")
          ) {
            aiResponse =
              "Relationship challenges can be really painful, especially during your teenage years when connections mean so much. It sounds like you're going through a difficult time with someone important to you. Would you feel comfortable sharing a bit more about what happened? Sometimes talking through the situation can help you see different perspectives or possible ways forward."
          } else if (
            lowerCaseInput.includes("school") ||
            lowerCaseInput.includes("study") ||
            lowerCaseInput.includes("exam")
          ) {
            aiResponse =
              "School pressures can feel really intense, and it's completely normal to feel overwhelmed sometimes. Your concerns about academic performance are valid - many young people struggle with similar feelings. Let's think about this together. What specific aspect of school is causing you the most stress right now? And have you found any strategies that help you manage academic pressure in the past?"
          } else if (
            lowerCaseInput.includes("tired") ||
            lowerCaseInput.includes("exhausted") ||
            lowerCaseInput.includes("sleep")
          ) {
            aiResponse =
              "It sounds like you're really exhausted, and that can affect everything from your mood to your ability to cope with daily challenges. Sleep and rest are so important for your mental wellbeing. Have you noticed any patterns with your sleep lately? Sometimes small changes to your evening routine can make a big difference in how rested you feel."
          } else if (
            lowerCaseInput.includes("parent") ||
            lowerCaseInput.includes("mom") ||
            lowerCaseInput.includes("dad") ||
            lowerCaseInput.includes("family")
          ) {
            aiResponse =
              "Family dynamics can be really complicated, especially during the teenage years when you're developing your own identity. It takes courage to talk about family challenges. Would you like to share more about what's happening at home? Understanding the specific situation might help us think about ways to improve communication or cope with difficult family moments."
          } else {
            aiResponse =
              "Thank you for sharing that with me. I'm here to listen and support you through whatever you're experiencing. Your feelings and experiences matter. Would you like to tell me more about what's on your mind? Or perhaps there's something specific you'd like guidance with today?"
          }

          // Update the placeholder message with the actual response
          setMessages((prevMessages) => {
            const updatedMessages = [...prevMessages]
            const lastMessage = updatedMessages[updatedMessages.length - 1]
            if (lastMessage.sender === "ai") {
              lastMessage.content = aiResponse
            }
            return updatedMessages
          })
        } catch (error) {
          console.error("Error generating AI response:", error)

          // Update with error message
          setMessages((prevMessages) => {
            const updatedMessages = [...prevMessages]
            const lastMessage = updatedMessages[updatedMessages.length - 1]
            if (lastMessage.sender === "ai") {
              lastMessage.content = "I'm sorry, I'm having trouble responding right now. Please try again in a moment."
            }
            return updatedMessages
          })
        } finally {
          setIsLoading(false)
        }
      }, 500)
    } catch (error) {
      console.error("Error in chat process:", error)
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const simulateVoiceRecording = () => {
    setIsRecording(true)
    setTimeout(() => {
      setIsRecording(false)
      setInput("I've been feeling really stressed about my upcoming exams")
      // Focus the input after setting the text
      setTimeout(() => {
        inputRef.current?.focus()
      }, 100)
    }, 2000)
  }

  const provideFeedback = (messageId: number, feedback: "helpful" | "not-helpful") => {
    setMessages((prevMessages) => prevMessages.map((msg) => (msg.id === messageId ? { ...msg, feedback } : msg)))
  }

  const setEmotion = (emotion: "happy" | "neutral" | "sad") => {
    // Add a new message from the user with their emotion
    let emotionText = ""
    switch (emotion) {
      case "happy":
        emotionText = "I'm feeling pretty good today!"
        break
      case "neutral":
        emotionText = "I'm feeling okay, neither good nor bad."
        break
      case "sad":
        emotionText = "I'm feeling down today."
        break
    }

    setInput(emotionText)
    setShowEmotionPicker(false)
    // Focus the input after setting the text
    setTimeout(() => {
      inputRef.current?.focus()
    }, 100)
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div className="flex gap-3 max-w-[85%]">
                {message.sender === "ai" && (
                  <Avatar className="h-8 w-8 mt-1">
                    <AvatarFallback className="bg-gradient-to-br from-purple-500 to-indigo-600 text-white">
                      <Brain className="h-4 w-4" />
                    </AvatarFallback>
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="AI Avatar" />
                  </Avatar>
                )}

                <div className="flex flex-col">
                  <div
                    className={`p-3 rounded-lg ${
                      message.sender === "user"
                        ? "bg-gradient-to-r from-purple-500 to-indigo-600 text-white"
                        : "bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  </div>

                  <div className="flex items-center justify-between mt-1">
                    <p className="text-xs text-gray-500 dark:text-gray-400">{formatTime(message.timestamp)}</p>

                    {message.sender === "ai" && !isTyping && (
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 rounded-full hover:bg-green-100 dark:hover:bg-green-900"
                          onClick={() => provideFeedback(message.id, "helpful")}
                        >
                          <ThumbsUp
                            className={`h-3 w-3 ${message.feedback === "helpful" ? "text-green-500" : "text-gray-400"}`}
                          />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 rounded-full hover:bg-red-100 dark:hover:bg-red-900"
                          onClick={() => provideFeedback(message.id, "not-helpful")}
                        >
                          <ThumbsDown
                            className={`h-3 w-3 ${message.feedback === "not-helpful" ? "text-red-500" : "text-gray-400"}`}
                          />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>

                {message.sender === "user" && (
                  <Avatar className="h-8 w-8 mt-1">
                    <AvatarFallback className="bg-gray-300 dark:bg-gray-700">
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User Avatar" />
                  </Avatar>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isTyping && !isLoading && (
          <div className="flex justify-start">
            <div className="flex gap-3 max-w-[80%]">
              <Avatar className="h-8 w-8 mt-1">
                <AvatarFallback className="bg-gradient-to-br from-purple-500 to-indigo-600 text-white">
                  <Brain className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>

              <div>
                <div className="p-3 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                  <div className="flex space-x-1">
                    <div
                      className="w-2 h-2 rounded-full bg-purple-400 dark:bg-purple-500 animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    ></div>
                    <div
                      className="w-2 h-2 rounded-full bg-purple-400 dark:bg-purple-500 animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    ></div>
                    <div
                      className="w-2 h-2 rounded-full bg-purple-400 dark:bg-purple-500 animate-bounce"
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

      {/* Suggested responses */}
      {messages.length > 0 && messages[messages.length - 1].sender === "ai" && (
        <div className="px-4 pt-2">
          <div className="flex flex-wrap gap-2">
            {suggestions.map((suggestion, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="text-xs bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
                onClick={() => {
                  setInput(suggestion.text)
                  // Focus the input after setting the text
                  setTimeout(() => {
                    inputRef.current?.focus()
                  }, 100)
                }}
              >
                {suggestion.icon}
                <span className="ml-1">{suggestion.text}</span>
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Emotion picker */}
      <AnimatePresence>
        {showEmotionPicker && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="p-4 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950"
          >
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">How are you feeling today?</p>
            <div className="flex justify-around">
              <Button
                variant="ghost"
                className="flex flex-col items-center p-3 hover:bg-green-50 dark:hover:bg-green-900 rounded-lg"
                onClick={() => setEmotion("happy")}
              >
                <div className="text-3xl mb-1">😊</div>
                <span className="text-xs">Happy</span>
              </Button>
              <Button
                variant="ghost"
                className="flex flex-col items-center p-3 hover:bg-blue-50 dark:hover:bg-blue-900 rounded-lg"
                onClick={() => setEmotion("neutral")}
              >
                <div className="text-3xl mb-1">😐</div>
                <span className="text-xs">Neutral</span>
              </Button>
              <Button
                variant="ghost"
                className="flex flex-col items-center p-3 hover:bg-red-50 dark:hover:bg-red-900 rounded-lg"
                onClick={() => setEmotion("sad")}
              >
                <div className="text-3xl mb-1">😔</div>
                <span className="text-xs">Sad</span>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="p-4 border-t border-gray-200 dark:border-gray-800">
        <form
          className="flex gap-2"
          onSubmit={(e) => {
            e.preventDefault()
            handleSendMessage()
          }}
        >
          <div className="flex-1 relative">
            <Input
              ref={inputRef}
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="pr-10 bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700"
              disabled={isLoading || isTyping}
            />
            <Button
              type="button"
              size="icon"
              variant="ghost"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              onClick={() => setShowEmotionPicker(!showEmotionPicker)}
              disabled={isLoading || isTyping}
            >
              <Heart className="h-4 w-4" />
            </Button>
          </div>

          <Button
            type="button"
            size="icon"
            variant="outline"
            className="bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700"
            onClick={simulateVoiceRecording}
            disabled={isLoading || isTyping || isRecording}
          >
            <Mic className={`h-4 w-4 ${isRecording ? "text-red-500 animate-pulse" : ""}`} />
          </Button>

          <Button
            type="submit"
            size="icon"
            disabled={(!input.trim() && !showEmotionPicker) || isLoading || isTyping}
            className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white"
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  )
}
