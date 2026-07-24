import { useEffect, useRef, useState } from 'react'
import { Heart, Pause, Play, SkipBack, SkipForward } from 'lucide-react'
import songSrc from '../../assets/song/song.mp3'

const SONG_TITLE = 'Kita Usahakan Rumah Itu - Sal Priadi'

function AudioPlayer() {
  const audioRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const handleTimeUpdate = () => {
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100)
      }
    }

    audio.addEventListener('timeupdate', handleTimeUpdate)
    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate)
    }
  }, [])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    audio
      .play()
      .then(() => setIsPlaying(true))
      .catch(() => setIsPlaying(false))

    return () => {
      audio.pause()
    }
  }, [])

  const togglePlay = () => {
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying) {
      audio.pause()
    } else {
      audio.play()
    }
    setIsPlaying((prev) => !prev)
  }

  return (
    <div className="flex w-full max-w-[90%] flex-col items-center gap-2 px-4">
      <audio ref={audioRef} src={songSrc} loop preload="auto" />

      <p className="font-elegant text-center text-xs text-[#6b5b4d]">
        {SONG_TITLE}
      </p>

      <div className="relative h-[0.5px] w-full rounded-full bg-[#8a7a6d]">
        <div
          className="absolute inset-y-0 left-0 rounded-full bg-[#c98fae]"
          style={{ width: `${progress}%` }}
        />
        <div
          className="absolute top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-[#FFF6FA] border-2 border-[#8a7a6d]"
          style={{ left: `calc(${progress}% - 5px)` }}
        />
      </div>

      <div className="flex items-center gap-4">
        <SkipBack className="h-4 w-4 text-[#8a7a6d]" aria-hidden="true" />

        <button
          type="button"
          onClick={togglePlay}
          aria-label={isPlaying ? 'Pause song' : 'Play song'}
          className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-[#c98fae] text-[#8a3b58]"
        >
          {isPlaying ? (
            <Pause className="h-4 w-4" fill="currentColor" />
          ) : (
            <Play className="h-4 w-4 translate-x-0.5" fill="currentColor" />
          )}
        </button>

        <SkipForward className="h-4 w-4 text-[#8a7a6d]" aria-hidden="true" />
        <Heart className="h-4 w-4 text-[#e08bab]" fill="currentColor" aria-hidden="true" />
      </div>
    </div>
  )
}

export default AudioPlayer
