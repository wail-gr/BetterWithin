"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import {
  Brain,
  Lock,
  MessageSquare,
  Mic,
  MoreHorizontal,
  Search,
  Send,
  Sparkles,
  ThumbsUp,
  ThumbsDown,
  User,
  Users,
  Smile,
  Frown,
  Meh,
  Heart,
} from "lucide-react"

type Message = {
  id: number
  content: string
  sender: "user" | "contact"
  timestamp: Date
  isVoice?: boolean
  voiceDuration?: string
  isEncrypted?: boolean
  feedback?: "helpful" | "not-helpful"
}

type Contact = {
  id: number
  name: string
  avatar: string
  lastMessage: string
  lastMessageTime: string
  unread: number
  online: boolean
  isGroup?: boolean
  isAI?: boolean
  members?: number
}

const mockContacts: Contact[] = [
  {
    id: 0,
    name: "BetterMind AI",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "How are you feeling today?",
    lastMessageTime: "Just now",
    unread: 0,
    online: true,
    isAI: true,
  },
  {
    id: 1,
    name: "Alex Johnson",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "Thanks for the advice yesterday!",
    lastMessageTime: "10:42 AM",
    unread: 2,
    online: true,
  },
  {
    id: 2,
    name: "Mindfulness Group",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "Sarah: I'll share some resources later",
    lastMessageTime: "Yesterday",
    unread: 0,
    online: false,
    isGroup: true,
    members: 8,
  },
  {
    id: 3,
    name: "Taylor Wilson",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "How did your presentation go?",
    lastMessageTime: "Yesterday",
    unread: 0,
    online: true,
  },
  {
    id: 4,
    name: "Jordan Lee",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "Voice message (0:42)",
    lastMessageTime: "Monday",
    unread: 0,
    online: false,
  },
  {
    id: 5,
    name: "Study Support",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "Riley: Don't forget about the study session tomorrow!",
    lastMessageTime: "Monday",
    unread: 0,
    online: false,
    isGroup: true,
    members: 5,
  },
]

const mockMessages: Record<number, Message[]> = {
  0: [
    {
      id: 1,
      content:
        "Hi there! I'm MindfulAI, your supportive companion. I'm here to listen and help you navigate your emotions and challenges. How are you feeling today?",
      sender: "contact",
      timestamp: new Date(),
      isEncrypted: true,
    },
  ],
  1: [
    {
      id: 1,
      content: "Hey, how are you doing today?",
      sender: "user",
      timestamp: new Date(Date.now() - 3600000 * 24),
      isEncrypted: true,
    },
    {
      id: 2,
      content: "I'm doing pretty well, thanks for asking! Just a bit stressed about exams.",
      sender: "contact",
      timestamp: new Date(Date.now() - 3600000 * 23),
      isEncrypted: true,
    },
    {
      id: 3,
      content: "I totally understand. Exams can be really overwhelming. Do you want to talk about it?",
      sender: "user",
      timestamp: new Date(Date.now() - 3600000 * 22),
      isEncrypted: true,
    },
    {
      id: 4,
      content: "That would be great. I'm especially worried about math.",
      sender: "contact",
      timestamp: new Date(Date.now() - 3600000 * 2),
      isEncrypted: true,
    },
    {
      id: 5,
      content: "I found some really helpful resources for math anxiety. I'll send them to you!",
      sender: "user",
      timestamp: new Date(Date.now() - 3600000),
      isEncrypted: true,
    },
    {
      id: 6,
      content: "Thanks for the advice yesterday! It really helped me calm down.",
      sender: "contact",
      timestamp: new Date(),
      isEncrypted: true,
    },
  ],
  3: [
    {
      id: 1,
      content: "Hey Taylor, just checking in. How are you?",
      sender: "user",
      timestamp: new Date(Date.now() - 3600000 * 48),
      isEncrypted: true,
    },
    {
      id: 2,
      content: "I'm good! Getting ready for my presentation tomorrow. Feeling a bit nervous.",
      sender: "contact",
      timestamp: new Date(Date.now() - 3600000 * 47),
      isEncrypted: true,
    },
    {
      id: 3,
      content: "You're going to do great! Remember to breathe and speak slowly.",
      sender: "user",
      timestamp: new Date(Date.now() - 3600000 * 46),
      isEncrypted: true,
    },
    {
      id: 4,
      isVoice: true,
      voiceDuration: "0:38",
      content: "Voice message",
      sender: "user",
      timestamp: new Date(Date.now() - 3600000 * 45),
      isEncrypted: true,
    },
    {
      id: 5,
      content: "Thanks for the tips and the encouragement! I'll let you know how it goes.",
      sender: "contact",
      timestamp: new Date(Date.now() - 3600000 * 24),
      isEncrypted: true,
    },
    {
      id: 6,
      content: "How did your presentation go?",
      sender: "user",
      timestamp: new Date(Date.now() - 3600000 * 23),
      isEncrypted: true,
    },
  ],
  4: [
    {
      id: 1,
      content: "Hey Jordan, are you free to chat about the project?",
      sender: "user",
      timestamp: new Date(Date.now() - 3600000 * 72),
      isEncrypted: true,
    },
    {
      id: 2,
      content: "Sure, what's up?",
      sender: "contact",
      timestamp: new Date(Date.now() - 3600000 * 71),
      isEncrypted: true,
    },
    {
      id: 3,
      isVoice: true,
      voiceDuration: "1:24",
      content: "Voice message",
      sender: "user",
      timestamp: new Date(Date.now() - 3600000 * 70),
      isEncrypted: true,
    },
    {
      id: 4,
      isVoice: true,
      voiceDuration: "0:42",
      content: "Voice message",
      sender: "contact",
      timestamp: new Date(Date.now() - 3600000 * 69),
      isEncrypted: true,
    },
  ],
}

export default function MessagesPage() {
  const [activeContact, setActiveContact] = useState<Contact | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [isRecording, setIsRecording] = useState(false)
  const [recordingDuration, setRecordingDuration] = useState(0)
  const [searchQuery, setSearchQuery] = useState("")
  const [contacts, setContacts] = useState(mockContacts)
  const [isTyping, setIsTyping] = useState(false)
  const [showEmotionPicker, setShowEmotionPicker] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()
  const inputRef = useRef<HTMLInputElement>(null)

  const suggestions: { text: string; icon: React.ReactNode }[] = [
    { text: "I'm feeling anxious about school", icon: <Frown className="h-3 w-3" /> },
    { text: "How can I improve my mood?", icon: <Smile className="h-3 w-3" /> },
    { text: "I had a fight with my friend", icon: <Meh className="h-3 w-3" /> },
    { text: "I need help with stress", icon: <Sparkles className="h-3 w-3" /> },
  ]

  useEffect(() => {
    if (activeContact) {
      setMessages(mockMessages[activeContact.id] || [])
    }
  }, [activeContact])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  // Simulate typing effect for AI responses
  useEffect(() => {
    if (isTyping && messages.length > 0 && activeContact?.isAI) {
      const lastMessage = messages[messages.length - 1]
      if (lastMessage.sender === "contact") {
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
  }, [isTyping, messages, activeContact])

  const handleSendMessage = async () => {
    if ((!newMessage.trim() && !showEmotionPicker) || isRecording) return
    if (!activeContact) return

    const messageContent = newMessage.trim()

    if (showEmotionPicker) {
      setShowEmotionPicker(false)
    }

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      content: isRecording ? "Voice message" : messageContent,
      sender: "user",
      timestamp: new Date(),
      isVoice: isRecording,
      voiceDuration: isRecording
        ? `0:${recordingDuration < 10 ? "0" + recordingDuration : recordingDuration}`
        : undefined,
      isEncrypted: true,
    }

    setMessages([...messages, userMessage])
    setNewMessage("")
    setIsRecording(false)
    setRecordingDuration(0)

    // Update last message in contacts
    setContacts(
      contacts.map((contact) => {
        if (contact.id === activeContact.id) {
          return {
            ...contact,
            lastMessage: isRecording
              ? `Voice message (0:${recordingDuration < 10 ? "0" + recordingDuration : recordingDuration})`
              : messageContent,
            lastMessageTime: "Just now",
            unread: 0,
          }
        }
        return contact
      }),
    )

    // Handle AI response if the active contact is AI
    if (activeContact.isAI && messageContent) {
      try {
        // Create a placeholder for the AI response
        const placeholderMessage: Message = {
          id: messages.length + 2,
          content: "",
          sender: "contact",
          timestamp: new Date(),
          isEncrypted: true,
        }

        setMessages((prev) => [...prev, placeholderMessage])
        setIsTyping(true)

        // Simulate AI response with a delay
        setTimeout(async () => {
          try {
            // Generate AI response based on keywords
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
            } else {
              aiResponse =
                "Thank you for sharing that with me. I'm here to listen and support you through whatever you're experiencing. Your feelings and experiences matter. Would you like to tell me more about what's on your mind? Or perhaps there's something specific you'd like guidance with today?"
            }

            // Update the contacts list with the AI's response
            setContacts(
              contacts.map((contact) => {
                if (contact.id === activeContact.id) {
                  return {
                    ...contact,
                    lastMessage: aiResponse.substring(0, 30) + "...",
                    lastMessageTime: "Just now",
                  }
                }
                return contact
              }),
            )
          } catch (error) {
            console.error("Error generating AI response:", error)

            // Update with error message
            setMessages((prevMessages) => {
              const updatedMessages = [...prevMessages]
              const lastMessage = updatedMessages[updatedMessages.length - 1]
              if (lastMessage.sender === "contact") {
                lastMessage.content =
                  "I'm sorry, I'm having trouble responding right now. Please try again in a moment."
              }
              return updatedMessages
            })
          }
        }, 500)
      } catch (error) {
        console.error("Error in chat process:", error)
      }
    }
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

    setNewMessage(emotionText)
    setShowEmotionPicker(false)
    // Focus the input after setting the text
    setTimeout(() => {
      inputRef.current?.focus()
    }, 100)
  }

  const provideFeedback = (messageId: number, feedback: "helpful" | "not-helpful") => {
    setMessages((prevMessages) => prevMessages.map((msg) => (msg.id === messageId ? { ...msg, feedback } : msg)))
  }

  const handleStartRecording = () => {
    setIsRecording(true)
    setRecordingDuration(0)

    // Simulate recording duration
    const interval = setInterval(() => {
      setRecordingDuration((prev) => {
        if (prev >= 60) {
          clearInterval(interval)
          return prev
        }
        return prev + 1
      })
    }, 1000)

    // Auto-stop after 60 seconds
    setTimeout(() => {
      clearInterval(interval)
      if (isRecording) {
        setIsRecording(false)
      }
    }, 60000)
  }

  const handleCancelRecording = () => {
    setIsRecording(false)
    setRecordingDuration(0)
  }

  const filteredContacts = contacts.filter((contact) => contact.name.toLowerCase().includes(searchQuery.toLowerCase()))

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  const formatDate = (date: Date) => {
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

    if (date.toDateString() === today.toDateString()) {
      return "Today"
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday"
    } else {
      return date.toLocaleDateString(undefined, { weekday: "long" })
    }
  }

  return (
    <div className="w-full max-w-6xl mx-auto py-6">
      <div className="flex flex-col h-[calc(100vh-6rem)] rounded-2xl overflow-hidden border bg-card">
        <div className="flex h-full">
          {/* Contacts sidebar */}
          <div className="w-full md:w-80 min-w-[320px] border-r flex flex-col">
            <div className="p-4 border-b">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Messages</h2>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <MessageSquare className="h-5 w-5" />
                </Button>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search conversations..."
                  className="pl-10 rounded-full"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto">
              <Tabs defaultValue="all" className="w-full">
                <div className="px-4 pt-4">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="unread">Unread</TabsTrigger>
                  </TabsList>
                </div>
                <TabsContent value="all" className="mt-0">
                  <div className="space-y-1 p-2">
                    <AnimatePresence>
                      {filteredContacts.map((contact) => (
                        <motion.div
                          key={contact.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Button
                            variant="ghost"
                            className={`w-full justify-start px-3 py-6 h-auto rounded-xl ${
                              activeContact?.id === contact.id ? "bg-primary/10" : ""
                            }`}
                            onClick={() => setActiveContact(contact)}
                          >
                            <div className="flex items-start gap-3 w-full">
                              <div className="relative">
                                <Avatar>
                                  <AvatarImage src={contact.avatar || "/placeholder.svg"} alt={contact.name} />
                                  <AvatarFallback>
                                    {contact.isGroup ? <Users className="h-5 w-5" /> : contact.name.charAt(0)}
                                  </AvatarFallback>
                                </Avatar>
                                {contact.online && (
                                  <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-background"></span>
                                )}
                              </div>
                              <div className="flex-1 text-left">
                                <div className="flex justify-between items-center">
                                  <span className="font-medium">{contact.name}</span>
                                  <span className="text-xs text-muted-foreground">{contact.lastMessageTime}</span>
                                </div>
                                <div className="flex justify-between items-center mt-1">
                                  <p className="text-xs text-muted-foreground truncate max-w-[150px]">
                                    {contact.lastMessage}
                                  </p>
                                  {contact.unread > 0 && <Badge className="ml-2 bg-primary">{contact.unread}</Badge>}
                                </div>
                                {contact.isGroup && (
                                  <div className="flex items-center mt-1">
                                    <Users className="h-3 w-3 mr-1 text-muted-foreground" />
                                    <span className="text-xs text-muted-foreground">{contact.members} members</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </Button>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </TabsContent>
                <TabsContent value="unread" className="mt-0">
                  <div className="space-y-1 p-2">
                    {filteredContacts
                      .filter((c) => c.unread > 0)
                      .map((contact) => (
                        <Button
                          key={contact.id}
                          variant="ghost"
                          className={`w-full justify-start px-3 py-6 h-auto rounded-xl ${
                            activeContact?.id === contact.id ? "bg-primary/10" : ""
                          }`}
                          onClick={() => setActiveContact(contact)}
                        >
                          <div className="flex items-start gap-3 w-full">
                            <Avatar>
                              <AvatarImage src={contact.avatar || "/placeholder.svg"} alt={contact.name} />
                              <AvatarFallback>
                                {contact.isGroup ? <Users className="h-5 w-5" /> : contact.name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 text-left">
                              <div className="flex justify-between items-center">
                                <span className="font-medium">{contact.name}</span>
                                <span className="text-xs text-muted-foreground">{contact.lastMessageTime}</span>
                              </div>
                              <div className="flex justify-between items-center mt-1">
                                <p className="text-xs text-muted-foreground truncate max-w-[150px]">
                                  {contact.lastMessage}
                                </p>
                                <Badge className="ml-2 bg-primary">{contact.unread}</Badge>
                              </div>
                            </div>
                          </div>
                        </Button>
                      ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {/* Chat area */}
          <div className="hidden md:flex flex-col flex-1 overflow-hidden">
            {activeContact ? (
              <>
                <div className="p-4 border-b flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={activeContact.avatar || "/placeholder.svg"} alt={activeContact.name} />
                      <AvatarFallback>
                        {activeContact.isAI ? (
                          <Brain className="h-5 w-5" />
                        ) : activeContact.isGroup ? (
                          <Users className="h-5 w-5" />
                        ) : (
                          activeContact.name.charAt(0)
                        )}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h2 className="font-medium">{activeContact.name}</h2>
                      <div className="flex items-center text-xs text-muted-foreground">
                        {activeContact.isAI ? (
                          <span className="flex items-center">
                            <span className="h-2 w-2 rounded-full bg-green-500 mr-1"></span>
                            AI Assistant
                          </span>
                        ) : activeContact.online ? (
                          <span className="flex items-center">
                            <span className="h-2 w-2 rounded-full bg-green-500 mr-1"></span>
                            Online
                          </span>
                        ) : (
                          "Offline"
                        )}
                        {activeContact.isGroup && (
                          <span className="ml-2 flex items-center">
                            <Users className="h-3 w-3 mr-1" />
                            {activeContact.members} members
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Badge variant="outline" className="flex items-center gap-1 bg-primary/10 text-primary border-0">
                      <Lock className="h-3 w-3" />
                      <span className="text-xs">End-to-end encrypted</span>
                    </Badge>
                    <Button variant="ghost" size="icon" className="rounded-full">
                      <MoreHorizontal className="h-5 w-5" />
                    </Button>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-4 w-full">
                  {messages.map((message, index) => {
                    // Check if we need to show date separator
                    const showDateSeparator =
                      index === 0 || formatDate(message.timestamp) !== formatDate(messages[index - 1].timestamp)

                    return (
                      <div key={message.id}>
                        {showDateSeparator && (
                          <div className="flex justify-center my-4">
                            <Badge variant="outline" className="bg-background">
                              {formatDate(message.timestamp)}
                            </Badge>
                          </div>
                        )}
                        <div className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                          <div className="flex gap-3 max-w-[70%]">
                            {message.sender === "contact" && (
                              <Avatar className="h-8 w-8 mt-1">
                                <AvatarImage
                                  src={activeContact.avatar || "/placeholder.svg"}
                                  alt={activeContact.name}
                                />
                                <AvatarFallback>
                                  {activeContact.isAI ? (
                                    <Brain className="h-4 w-4" />
                                  ) : activeContact.isGroup ? (
                                    <Users className="h-4 w-4" />
                                  ) : (
                                    activeContact.name.charAt(0)
                                  )}
                                </AvatarFallback>
                              </Avatar>
                            )}

                            <div>
                              {message.isVoice ? (
                                <div
                                  className={`p-3 rounded-2xl ${
                                    message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-secondary"
                                  }`}
                                >
                                  <div className="flex items-center gap-2">
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="h-8 w-8 rounded-full bg-background/20"
                                    >
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="h-4 w-4"
                                      >
                                        <polygon points="5 3 19 12 5 21 5 3" />
                                      </svg>
                                    </Button>
                                    <div className="audio-wave">
                                      {Array.from({ length: 10 }).map((_, i) => (
                                        <div
                                          key={i}
                                          className="audio-wave-bar"
                                          style={{ height: `${Math.random() * 100}%` }}
                                        ></div>
                                      ))}
                                    </div>
                                    <span className="text-xs">{message.voiceDuration}</span>
                                  </div>
                                </div>
                              ) : (
                                <div
                                  className={`p-3 rounded-2xl ${
                                    message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-secondary"
                                  }`}
                                >
                                  <p className="text-sm">{message.content}</p>
                                  {message.isEncrypted && (
                                    <div className="flex items-center mt-1 text-xs opacity-70">
                                      <Lock className="h-3 w-3 mr-1" />
                                      <span>Encrypted</span>
                                    </div>
                                  )}
                                </div>
                              )}
                              <div className="flex items-center justify-between mt-1">
                                <p className="text-xs text-muted-foreground">{formatTime(message.timestamp)}</p>

                                {activeContact.isAI && message.sender === "contact" && !isTyping && (
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
                                <AvatarFallback className="bg-primary text-primary-foreground">
                                  <User className="h-4 w-4" />
                                </AvatarFallback>
                              </Avatar>
                            )}
                          </div>
                        </div>
                      </div>
                    )
                  })}

                  {isTyping && activeContact.isAI && (
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

                {/* AI Suggestions */}
                {activeContact.isAI &&
                  messages.length > 0 &&
                  messages[messages.length - 1].sender === "contact" &&
                  !isTyping && (
                    <div className="px-4 pt-2">
                      <div className="flex flex-wrap gap-2">
                        {suggestions.map((suggestion, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            size="sm"
                            className="text-xs bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
                            onClick={() => {
                              setNewMessage(suggestion.text)
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
                  {showEmotionPicker && activeContact.isAI && (
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
                    <div className="relative flex-1">
                      <Input
                        ref={inputRef}
                        placeholder="Type your message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        className="pr-10 bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700"
                        disabled={isRecording}
                      />
                      {activeContact.isAI && (
                        <Button
                          type="button"
                          size="icon"
                          variant="ghost"
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                          onClick={() => setShowEmotionPicker(!showEmotionPicker)}
                          disabled={isRecording}
                        >
                          <Heart className="h-4 w-4" />
                        </Button>
                      )}
                    </div>

                    <Button
                      type="button"
                      size="icon"
                      variant="outline"
                      className="bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700"
                      onClick={handleStartRecording}
                      disabled={isRecording}
                    >
                      <Mic className={`h-4 w-4 ${isRecording ? "text-red-500 animate-pulse" : ""}`} />
                    </Button>

                    <Button
                      type="submit"
                      size="icon"
                      disabled={(!newMessage.trim() && !showEmotionPicker) || isRecording}
                      className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </form>
                </div>
              </>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center p-4">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <MessageSquare className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-medium mb-2">Your Messages</h3>
                <p className="text-center text-muted-foreground mb-4 max-w-md">
                  Select a conversation or start a new one. All messages are end-to-end encrypted for your privacy.
                </p>
                <Button className="bg-primary">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  <span>New Message</span>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
