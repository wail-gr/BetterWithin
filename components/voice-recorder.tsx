"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Mic, Square, Play, Pause } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface VoiceRecorderProps {
  onRecordingComplete: (audioUrl: string, duration: number) => void
  onTextTranscription?: (text: string) => void
  showTranscribeButton?: boolean
  maxDuration?: number // in seconds
}

export function VoiceRecorder({
  onRecordingComplete,
  onTextTranscription,
  showTranscribeButton = false,
  maxDuration = 60,
}: VoiceRecorderProps) {
  const [isRecording, setIsRecording] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [recordingDuration, setRecordingDuration] = useState(0)
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const [isTranscribing, setIsTranscribing] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const { toast } = useToast()

  // In a real app, we would use the MediaRecorder API
  // For this demo, we'll simulate recording

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }

      // Clean up audio URL if it exists
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl)
      }
    }
  }, [audioUrl])

  const startRecording = () => {
    // Check if browser supports recording (would be real check in production)
    if (typeof window === "undefined") {
      return
    }

    setIsRecording(true)
    setRecordingDuration(0)
    setAudioUrl(null)

    // Simulate recording with a timer
    timerRef.current = setInterval(() => {
      setRecordingDuration((prev) => {
        if (prev >= maxDuration) {
          stopRecording()
          return prev
        }
        return prev + 1
      })
    }, 1000)

    toast({
      title: "Recording started",
      description: "Speak clearly, recording will stop automatically after 60 seconds",
    })
  }

  const pauseRecording = () => {
    setIsPaused(true)
    if (timerRef.current) {
      clearInterval(timerRef.current)
    }

    toast({
      title: "Recording paused",
      description: "Press play to continue recording",
    })
  }

  const resumeRecording = () => {
    setIsPaused(false)
    timerRef.current = setInterval(() => {
      setRecordingDuration((prev) => {
        if (prev >= maxDuration) {
          stopRecording()
          return prev
        }
        return prev + 1
      })
    }, 1000)

    toast({
      title: "Recording resumed",
      description: "Continuing your recording",
    })
  }

  const stopRecording = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
    }
    setIsRecording(false)
    setIsPaused(false)

    // In a real app, we would save the actual audio recording
    // For demo purposes, we'll simulate an audio file
    const simulatedAudioUrl = "/placeholder.svg?height=50&width=320"
    setAudioUrl(simulatedAudioUrl)

    // Pass the audio URL and duration to the parent component
    onRecordingComplete(simulatedAudioUrl, recordingDuration)

    toast({
      title: "Recording saved",
      description: `Voice recording saved (${formatDuration(recordingDuration)})`,
    })
  }

  const transcribeAudio = () => {
    if (!audioUrl) return

    setIsTranscribing(true)

    // Simulate transcription process
    toast({
      title: "Transcribing audio",
      description: "Converting your voice recording to text...",
    })

    // In a real app, we would send the audio to a transcription service
    setTimeout(() => {
      setIsTranscribing(false)

      // Generate placeholder transcription text
      const transcriptions = [
        "Today I'm feeling much better than yesterday. I was able to focus on my work and I took a nice walk outside.",
        "I've been struggling with anxiety lately but practicing meditation has been helping me stay grounded.",
        "I had a really good conversation with my friend today about our goals. It's nice to feel supported.",
        "I need to remember to be kinder to myself when things don't go as planned. Small steps still count as progress.",
      ]

      const transcription = transcriptions[Math.floor(Math.random() * transcriptions.length)]

      if (onTextTranscription) {
        onTextTranscription(transcription)
      }

      toast({
        title: "Transcription complete",
        description: "Your voice has been converted to text",
      })
    }, 2000)
  }

  const formatDuration = (seconds: number): string => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs < 10 ? "0" + secs : secs}`
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        {!isRecording ? (
          <Button onClick={startRecording} variant="outline" size="sm" className="flex items-center gap-1">
            <Mic className="h-4 w-4 text-red-500" />
            Start Recording
          </Button>
        ) : (
          <>
            <div className="flex items-center gap-2">
              {isPaused ? (
                <Button onClick={resumeRecording} variant="outline" size="sm" className="flex items-center gap-1">
                  <Play className="h-4 w-4" />
                  Resume
                </Button>
              ) : (
                <Button onClick={pauseRecording} variant="outline" size="sm" className="flex items-center gap-1">
                  <Pause className="h-4 w-4" />
                  Pause
                </Button>
              )}

              <Button
                onClick={stopRecording}
                variant="outline"
                size="sm"
                className="flex items-center gap-1 bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800"
              >
                <Square className="h-4 w-4 text-red-500" />
                Stop
              </Button>

              <span className="text-sm font-mono bg-red-50 dark:bg-red-950 text-red-600 dark:text-red-400 px-2 py-1 rounded-md animate-pulse">
                {formatDuration(recordingDuration)}
              </span>
            </div>
          </>
        )}

        {audioUrl && showTranscribeButton && (
          <Button
            onClick={transcribeAudio}
            variant="outline"
            size="sm"
            className="flex items-center gap-1 ml-2"
            disabled={isTranscribing}
          >
            {isTranscribing ? (
              <>
                <span className="loading loading-spinner loading-xs"></span>
                Transcribing...
              </>
            ) : (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4 mr-1"
                >
                  <path d="M9 6v15"></path>
                  <path d="M9 6a3 3 0 1 0-3 3h9a3 3 0 1 0-3-3"></path>
                </svg>
                Voice to Text
              </>
            )}
          </Button>
        )}
      </div>

      {audioUrl && (
        <div className="mt-2 p-2 bg-gray-50 dark:bg-gray-900 rounded-md">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full bg-navy-500 text-white">
              <Play className="h-4 w-4" />
            </Button>
            <div className="w-full h-10 relative">
              <div className="absolute inset-0 flex items-center">
                <img
                  src={audioUrl || "/placeholder.svg"}
                  alt="Audio waveform"
                  className="w-full h-8 object-cover rounded"
                />
              </div>
            </div>
            <span className="text-xs font-mono text-gray-500">{formatDuration(recordingDuration)}</span>
          </div>
        </div>
      )}
    </div>
  )
}
