import { createContext, useContext, useEffect, useRef, useState } from 'react'
import songSrc from '../assets/song/song.mp3'

const AudioContext = createContext(null)

export function AudioProvider({ children }) {
  const audioRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)

  if (!audioRef.current && typeof window !== 'undefined') {
    const audio = new Audio(songSrc)
    audio.loop = true
    audio.preload = 'auto'
    audioRef.current = audio
  }

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const handleTimeUpdate = () => {
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100)
      }
    }
    const handlePlay = () => setIsPlaying(true)
    const handlePause = () => setIsPlaying(false)

    audio.addEventListener('timeupdate', handleTimeUpdate)
    audio.addEventListener('play', handlePlay)
    audio.addEventListener('pause', handlePause)

    // Best-effort: on a fresh page load (e.g. a refresh) there's no user
    // gesture to hang this off of, so browsers usually block it — this
    // silently no-ops in that case. The floating music button is the real
    // fallback for resuming after a refresh.
    audio.play().catch(() => {})

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate)
      audio.removeEventListener('play', handlePlay)
      audio.removeEventListener('pause', handlePause)
    }
  }, [])

  const play = () => {
    audioRef.current?.play().catch(() => {})
  }

  const pause = () => {
    audioRef.current?.pause()
  }

  const toggle = () => {
    if (audioRef.current?.paused) {
      play()
    } else {
      pause()
    }
  }

  return (
    <AudioContext.Provider value={{ isPlaying, progress, play, pause, toggle }}>
      {children}
    </AudioContext.Provider>
  )
}

export function useAudioPlayer() {
  const context = useContext(AudioContext)
  if (!context) {
    throw new Error('useAudioPlayer must be used within an AudioProvider')
  }
  return context
}
