"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsContent, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import {
  ArrowLeft,
  Heart,
  MessageSquare,
  Users,
  Shield,
  Flag,
  ThumbsUp,
  Search,
  Plus,
  ImageIcon,
  UserPlus,
  Lock,
  Globe,
  UserCircle,
  Share2,
  Bookmark,
  MoreHorizontal,
  Send,
  Mic,
} from "lucide-react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { VoiceRecorder } from "@/components/voice-recorder"
import { VoiceMessage } from "@/components/voice-message"

const mockPosts = [
  {
    id: 1,
    author: "Alex J.",
    avatar: "/placeholder.svg?height=40&width=40",
    time: "2 hours ago",
    content:
      "Just had a really tough conversation with my parents about college. They want me to study business, but I'm passionate about art. Has anyone dealt with something similar? How did you handle it?",
    likes: 24,
    comments: 8,
    tags: ["Family", "Future"],
    liked: false,
    bookmarked: false,
  },
  {
    id: 2,
    author: "Taylor M.",
    avatar: "/placeholder.svg?height=40&width=40",
    time: "Yesterday",
    content:
      "I completed a full week of meditation! It's been helping with my anxiety so much. If anyone wants to start but doesn't know how, I'm happy to share some beginner resources that worked for me.",
    likes: 42,
    comments: 15,
    tags: ["Meditation", "Anxiety"],
    liked: true,
    bookmarked: true,
  },
  {
    id: 3,
    author: "Jordan P.",
    avatar: "/placeholder.svg?height=40&width=40",
    time: "3 days ago",
    content:
      "Does anyone else feel overwhelmed by social media sometimes? I'm thinking of taking a break but worried I'll miss out. Any advice?",
    likes: 67,
    comments: 23,
    tags: ["Social Media", "Mental Health"],
    liked: false,
    bookmarked: false,
    hasVoice: true,
    voiceUrl: "/placeholder.svg?height=50&width=320",
    voiceDuration: "0:42",
  },
]

const mockGroups = [
  {
    id: 1,
    name: "Anxiety Support",
    members: 1245,
    description: "A safe space to discuss anxiety and share coping strategies",
    image: "/placeholder.svg?height=80&width=80",
    privacy: "public",
    joined: true,
  },
  {
    id: 2,
    name: "Teen Transitions",
    members: 876,
    description: "Navigate the challenges of teenage years together",
    image: "/placeholder.svg?height=80&width=80",
    privacy: "public",
    joined: false,
  },
  {
    id: 3,
    name: "Mindfulness Practice",
    members: 1532,
    description: "Learn and share mindfulness techniques for daily life",
    image: "/placeholder.svg?height=80&width=80",
    privacy: "private",
    joined: true,
  },
  {
    id: 4,
    name: "Academic Stress",
    members: 943,
    description: "Support for dealing with school and academic pressures",
    image: "/placeholder.svg?height=80&width=80",
    privacy: "public",
    joined: false,
  },
]

const mockComments = [
  {
    id: 1,
    postId: 1,
    author: "Sam T.",
    avatar: "/placeholder.svg?height=32&width=32",
    time: "1 hour ago",
    content:
      "I went through something similar! My parents wanted me to study medicine, but I was passionate about music. We compromised with a double major in biology and music. It was tough but worth it.",
    likes: 5,
  },
  {
    id: 2,
    postId: 1,
    author: "Riley K.",
    avatar: "/placeholder.svg?height=32&width=32",
    time: "45 minutes ago",
    content:
      "Have you tried showing them your art portfolio? Sometimes parents just need to see how talented and passionate you really are about something.",
    likes: 3,
  },
]

export default function CommunityPage() {
  const [posts, setPosts] = useState(mockPosts)
  const [groups, setGroups] = useState(mockGroups)
  const [newPostContent, setNewPostContent] = useState("")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [showComments, setShowComments] = useState<number | null>(null)
  const [newComment, setNewComment] = useState("")
  const [newGroupName, setNewGroupName] = useState("")
  const [newGroupDescription, setNewGroupDescription] = useState("")
  const [newGroupPrivacy, setNewGroupPrivacy] = useState("public")
  const [isCreatingGroup, setIsCreatingGroup] = useState(false)
  const { toast } = useToast()

  const availableTags = [
    "Mental Health",
    "Anxiety",
    "Depression",
    "Self-Care",
    "Mindfulness",
    "Family",
    "Friends",
    "School",
    "Future",
    "Social Media",
  ]

  const [isRecordingPostVoice, setIsRecordingPostVoice] = useState(false)
  const [postVoiceUrl, setPostVoiceUrl] = useState<string | null>(null)
  const [postVoiceDuration, setPostVoiceDuration] = useState(0)
  const [isRecordingCommentVoice, setIsRecordingCommentVoice] = useState(false)
  const [commentVoiceUrl, setCommentVoiceUrl] = useState<string | null>(null)
  const [commentVoiceDuration, setCommentVoiceDuration] = useState(0)

  const handlePostSubmit = () => {
    if (!newPostContent.trim() && !postVoiceUrl) {
      toast({
        title: "Empty post",
        description: "Please write something or record a voice message before posting",
        variant: "destructive",
      })
      return
    }

    const newPost = {
      id: posts.length + 1,
      author: "You",
      avatar: "/placeholder.svg?height=40&width=40",
      time: "Just now",
      content: newPostContent,
      likes: 0,
      comments: 0,
      tags: selectedTags,
      liked: false,
      bookmarked: false,
      hasVoice: !!postVoiceUrl,
      voiceUrl: postVoiceUrl || undefined,
      voiceDuration: postVoiceUrl
        ? `0:${postVoiceDuration < 10 ? "0" + postVoiceDuration : postVoiceDuration}`
        : undefined,
    }

    setPosts([newPost, ...posts])

    toast({
      title: "Post shared!",
      description: "Your post has been shared with the community",
    })

    setNewPostContent("")
    setSelectedTags([])
    setPostVoiceUrl(null)
    setPostVoiceDuration(0)
    setIsRecordingPostVoice(false)
  }

  const handleLikePost = (postId: number) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            likes: post.liked ? post.likes - 1 : post.likes + 1,
            liked: !post.liked,
          }
        }
        return post
      }),
    )
  }

  const handleBookmarkPost = (postId: number) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            bookmarked: !post.bookmarked,
          }
        }
        return post
      }),
    )

    const post = posts.find((p) => p.id === postId)
    if (post) {
      toast({
        title: post.bookmarked ? "Post removed from bookmarks" : "Post bookmarked",
        description: post.bookmarked
          ? "The post has been removed from your saved items"
          : "You can find this post in your bookmarks later",
      })
    }
  }

  const handleJoinGroup = (groupId: number) => {
    setGroups(
      groups.map((group) => {
        if (group.id === groupId) {
          const updatedGroup = {
            ...group,
            joined: !group.joined,
            members: group.joined ? group.members - 1 : group.members + 1,
          }

          toast({
            title: updatedGroup.joined ? "Joined group!" : "Left group",
            description: updatedGroup.joined
              ? `You are now a member of ${updatedGroup.name}`
              : `You have left ${updatedGroup.name}`,
          })

          return updatedGroup
        }
        return group
      }),
    )
  }

  const handleAddComment = (postId: number) => {
    if (!newComment.trim()) return

    const updatedPosts = posts.map((post) => {
      if (post.id === postId) {
        return {
          ...post,
          comments: post.comments + 1,
        }
      }
      return post
    })

    setPosts(updatedPosts)
    setNewComment("")

    toast({
      title: "Comment added",
      description: "Your comment has been added to the post",
    })
  }

  const handleCreateGroup = () => {
    if (!newGroupName.trim() || !newGroupDescription.trim()) {
      toast({
        title: "Missing information",
        description: "Please provide a name and description for your group",
        variant: "destructive",
      })
      return
    }

    const newGroup = {
      id: groups.length + 1,
      name: newGroupName,
      members: 1,
      description: newGroupDescription,
      image: "/placeholder.svg?height=80&width=80",
      privacy: newGroupPrivacy,
      joined: true,
    }

    setGroups([newGroup, ...groups])

    toast({
      title: "Group created!",
      description: `Your group "${newGroupName}" has been created successfully`,
    })

    setNewGroupName("")
    setNewGroupDescription("")
    setNewGroupPrivacy("public")
    setIsCreatingGroup(false)
  }

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag))
    } else {
      setSelectedTags([...selectedTags, tag])
    }
  }

  const filteredGroups = groups.filter(
    (group) =>
      group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      group.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handlePostVoiceRecordingComplete = (audioUrl: string, duration: number) => {
    setPostVoiceUrl(audioUrl)
    setPostVoiceDuration(duration)
    setIsRecordingPostVoice(false)
  }

  const handleCommentVoiceRecordingComplete = (audioUrl: string, duration: number) => {
    setCommentVoiceUrl(audioUrl)
    setCommentVoiceDuration(duration)
    setIsRecordingCommentVoice(false)
  }

  const handleVoiceToText = (text: string) => {
    setNewPostContent((prev) => (prev ? `${prev}\n\n${text}` : text))
  }

  const handleAddVoiceComment = (postId: number) => {
    if (!commentVoiceUrl) return

    const updatedPosts = posts.map((post) => {
      if (post.id === postId) {
        return {
          ...post,
          comments: post.comments + 1,
        }
      }
      return post
    })

    setPosts(updatedPosts)
    setCommentVoiceUrl(null)
    setCommentVoiceDuration(0)
    setIsRecordingCommentVoice(false)

    toast({
      title: "Voice comment added",
      description: "Your voice comment has been added to the post",
    })
  }

  return (
    <div className="container max-w-4xl mx-auto px-4 py-6 md:py-10">
      <div className="flex justify-between items-center mb-4">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/" className="flex items-center gap-1">
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>
        </Button>

        <Button variant="outline" size="sm" asChild>
          <Link href="/messages" className="flex items-center gap-1">
            <MessageSquare className="h-4 w-4 mr-1" />
            Messages
          </Link>
        </Button>
      </div>

      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Community</h1>
        <p className="text-gray-500 dark:text-gray-400">Connect with others, share experiences, and find support</p>
      </div>

      <Tabs defaultValue="feed">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="feed" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            <span>Feed</span>
          </TabsTrigger>
          <TabsTrigger value="groups" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span>Groups</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="feed" className="space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Create Post</CardTitle>
              <CardDescription>Share your thoughts with the community</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="What's on your mind?"
                className="min-h-[100px] mb-4"
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
              />

              <div className="mb-4">
                <Label className="text-sm text-gray-500 dark:text-gray-400 mb-2 block">Add tags (optional)</Label>
                <div className="flex flex-wrap gap-2">
                  {availableTags.map((tag) => (
                    <Badge
                      key={tag}
                      variant={selectedTags.includes(tag) ? "default" : "outline"}
                      className={`cursor-pointer ${
                        selectedTags.includes(tag)
                          ? "bg-teal-500 hover:bg-teal-600"
                          : "hover:bg-gray-100 dark:hover:bg-gray-800"
                      }`}
                      onClick={() => toggleTag(tag)}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="gap-1">
                  <ImageIcon className="h-4 w-4" />
                  <span>Add Image</span>
                </Button>
                {!isRecordingPostVoice ? (
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-1"
                    onClick={() => setIsRecordingPostVoice(true)}
                  >
                    <Mic className="h-4 w-4" />
                    <span>Add Voice</span>
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-1 text-red-600"
                    onClick={() => setIsRecordingPostVoice(false)}
                  >
                    Cancel Recording
                  </Button>
                )}
              </div>

              {isRecordingPostVoice && (
                <div className="mt-4">
                  <VoiceRecorder
                    onRecordingComplete={handlePostVoiceRecordingComplete}
                    onTextTranscription={handleVoiceToText}
                    showTranscribeButton={true}
                  />
                </div>
              )}

              {postVoiceUrl && !isRecordingPostVoice && (
                <div className="mt-4">
                  <h4 className="text-sm font-medium mb-2">Voice Message Preview:</h4>
                  <VoiceMessage
                    audioUrl={postVoiceUrl}
                    duration={`0:${postVoiceDuration < 10 ? "0" + postVoiceDuration : postVoiceDuration}`}
                  />
                  <div className="flex justify-end mt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-600"
                      onClick={() => {
                        setPostVoiceUrl(null)
                        setPostVoiceDuration(0)
                      }}
                    >
                      Remove Voice Message
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                <Shield className="h-4 w-4 mr-1" />
                <span>Safe, moderated space</span>
              </div>
              <Button onClick={handlePostSubmit} className="bg-teal-500 hover:bg-teal-600">
                Post
              </Button>
            </CardFooter>
          </Card>

          <AnimatePresence>
            {posts.map((post) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="mb-6">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={post.avatar || "/placeholder.svg"} alt={post.author} />
                          <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-base">{post.author}</CardTitle>
                          <CardDescription>{post.time}</CardDescription>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Bookmark
                            className={`h-4 w-4 ${post.bookmarked ? "text-teal-500 fill-teal-500" : ""}`}
                            onClick={() => handleBookmarkPost(post.id)}
                          />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-3 whitespace-pre-wrap">{post.content}</p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {post.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    {post.hasVoice && (
                      <div className="mt-3">
                        <VoiceMessage
                          audioUrl={post.voiceUrl || "/placeholder.svg"}
                          duration={post.voiceDuration || "0:00"}
                        />
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="flex justify-between border-t pt-3">
                    <div className="flex gap-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        className={`gap-1 ${post.liked ? "text-teal-500" : ""}`}
                        onClick={() => handleLikePost(post.id)}
                      >
                        <ThumbsUp className={`h-4 w-4 ${post.liked ? "fill-teal-500" : ""}`} />
                        <span>{post.likes}</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="gap-1"
                        onClick={() => setShowComments(showComments === post.id ? null : post.id)}
                      >
                        <MessageSquare className="h-4 w-4" />
                        <span>{post.comments} Comments</span>
                      </Button>
                      <Button variant="ghost" size="sm" className="gap-1">
                        <Share2 className="h-4 w-4" />
                        <span>Share</span>
                      </Button>
                    </div>
                  </CardFooter>

                  {showComments === post.id && (
                    <div className="px-6 pb-4 border-t pt-3">
                      <div className="space-y-4 mb-4">
                        {mockComments
                          .filter((comment) => comment.postId === post.id)
                          .map((comment) => (
                            <div key={comment.id} className="flex gap-3">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={comment.avatar || "/placeholder.svg"} alt={comment.author} />
                                <AvatarFallback>{comment.author.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
                                  <div className="flex justify-between items-center mb-1">
                                    <span className="font-medium text-sm">{comment.author}</span>
                                    <span className="text-xs text-gray-500 dark:text-gray-400">{comment.time}</span>
                                  </div>
                                  <p className="text-sm">{comment.content}</p>
                                </div>
                                <div className="flex items-center gap-2 mt-1">
                                  <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                                    <ThumbsUp className="h-3 w-3 mr-1" />
                                    <span>{comment.likes}</span>
                                  </Button>
                                  <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                                    Reply
                                  </Button>
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>

                      <div className="flex gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>You</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 flex gap-2">
                          <Input
                            placeholder="Write a comment..."
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            className="flex-1"
                          />
                          <Button
                            size="sm"
                            className="bg-teal-500 hover:bg-teal-600"
                            onClick={() => handleAddComment(post.id)}
                            disabled={!newComment.trim()}
                          >
                            <Send className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 mt-2">
                        {!isRecordingCommentVoice ? (
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex items-center gap-1"
                            onClick={() => setIsRecordingCommentVoice(true)}
                          >
                            <Mic className="h-4 w-4" />
                            <span>Voice Comment</span>
                          </Button>
                        ) : (
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex items-center gap-1 text-red-600"
                            onClick={() => setIsRecordingCommentVoice(false)}
                          >
                            Cancel Recording
                          </Button>
                        )}
                      </div>

                      {isRecordingCommentVoice && (
                        <div className="mt-2">
                          <VoiceRecorder onRecordingComplete={handleCommentVoiceRecordingComplete} maxDuration={30} />
                        </div>
                      )}

                      {commentVoiceUrl && !isRecordingCommentVoice && (
                        <div className="mt-2">
                          <div className="flex items-center gap-2">
                            <VoiceMessage
                              audioUrl={commentVoiceUrl}
                              duration={`0:${commentVoiceDuration < 10 ? "0" + commentVoiceDuration : commentVoiceDuration}`}
                              className="flex-1"
                            />
                            <Button
                              size="sm"
                              className="bg-teal-500 hover:bg-teal-600"
                              onClick={() => handleAddVoiceComment(post.id)}
                            >
                              <Send className="h-4 w-4" />
                            </Button>
                          </div>
                          <div className="flex justify-end mt-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-red-600 h-6 px-2 text-xs"
                              onClick={() => {
                                setCommentVoiceUrl(null)
                                setCommentVoiceDuration(0)
                              }}
                            >
                              Cancel
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </TabsContent>

        <TabsContent value="groups" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Discover Groups</CardTitle>
                  <CardDescription>Find communities that match your interests</CardDescription>
                </div>
                <Dialog open={isCreatingGroup} onOpenChange={setIsCreatingGroup}>
                  <DialogTrigger asChild>
                    <Button className="bg-teal-500 hover:bg-teal-600">
                      <Plus className="h-4 w-4 mr-1" />
                      Create Group
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Create a New Group</DialogTitle>
                      <DialogDescription>
                        Create a supportive community around topics that matter to you
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="group-name">Group Name</Label>
                        <Input
                          id="group-name"
                          placeholder="e.g., Mindfulness for Teens"
                          value={newGroupName}
                          onChange={(e) => setNewGroupName(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="group-description">Description</Label>
                        <Textarea
                          id="group-description"
                          placeholder="What is this group about?"
                          value={newGroupDescription}
                          onChange={(e) => setNewGroupDescription(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="group-privacy">Privacy</Label>
                        <Select value={newGroupPrivacy} onValueChange={setNewGroupPrivacy}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select privacy level" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="public">
                              <div className="flex items-center">
                                <Globe className="h-4 w-4 mr-2" />
                                <span>Public - Anyone can join</span>
                              </div>
                            </SelectItem>
                            <SelectItem value="private">
                              <div className="flex items-center">
                                <Lock className="h-4 w-4 mr-2" />
                                <span>Private - Approval required</span>
                              </div>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="group-image">Group Image</Label>
                        <div className="flex items-center gap-4">
                          <div className="h-16 w-16 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                            <ImageIcon className="h-6 w-6 text-gray-400" />
                          </div>
                          <Button variant="outline" size="sm">
                            Upload Image
                          </Button>
                        </div>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsCreatingGroup(false)}>
                        Cancel
                      </Button>
                      <Button className="bg-teal-500 hover:bg-teal-600" onClick={handleCreateGroup}>
                        Create Group
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search groups..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <AnimatePresence>
                  {filteredGroups.map((group) => (
                    <motion.div
                      key={group.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex gap-3 p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900 cursor-pointer"
                    >
                      <img
                        src={group.image || "/placeholder.svg"}
                        alt={group.name}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{group.name}</h3>
                          {group.privacy === "private" && <Lock className="h-3 w-3 text-gray-400" />}
                        </div>
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-1">
                          <Users className="h-3 w-3 mr-1" />
                          <span>{group.members.toLocaleString()} members</span>
                        </div>
                        <p className="text-sm line-clamp-2 mb-2">{group.description}</p>
                        <Button
                          variant={group.joined ? "outline" : "default"}
                          size="sm"
                          className={group.joined ? "" : "bg-teal-500 hover:bg-teal-600"}
                          onClick={() => handleJoinGroup(group.id)}
                        >
                          {group.joined ? (
                            <>
                              <UserCircle className="h-3 w-3 mr-1" />
                              <span>Joined</span>
                            </>
                          ) : (
                            <>
                              <UserPlus className="h-3 w-3 mr-1" />
                              <span>Join Group</span>
                            </>
                          )}
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Community Guidelines</CardTitle>
              <CardDescription>Our community values respect and support</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-3">
                <div className="bg-teal-100 dark:bg-teal-900 p-2 rounded-full h-8 w-8 flex items-center justify-center">
                  <Heart className="h-4 w-4 text-teal-500" />
                </div>
                <div>
                  <h4 className="font-medium">Be Kind and Supportive</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Treat others with respect and empathy. We're all here to support each other.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="bg-teal-100 dark:bg-teal-900 p-2 rounded-full h-8 w-8 flex items-center justify-center">
                  <Shield className="h-4 w-4 text-teal-500" />
                </div>
                <div>
                  <h4 className="font-medium">Protect Privacy</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Don't share personal information about yourself or others.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="bg-teal-100 dark:bg-teal-900 p-2 rounded-full h-8 w-8 flex items-center justify-center">
                  <Flag className="h-4 w-4 text-teal-500" />
                </div>
                <div>
                  <h4 className="font-medium">Report Concerns</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    If you see content that violates our guidelines, please report it.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
