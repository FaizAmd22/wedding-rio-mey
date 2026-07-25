import { Music, Pause } from 'lucide-react'
import { useAudioPlayer } from '../context/AudioContext'

function FloatingMusicButton() {
  const { isPlaying, toggle } = useAudioPlayer()

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isPlaying ? 'Pause song' : 'Play song'}
      className="fixed right-3 bottom-5 z-40 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-white text-(--black-color) shadow-xl"
    >
      {isPlaying ? (
        <Pause className="h-4 w-4 text-(--primary-color)" fill="currentColor" />
      ) : (
        <Music className="h-4 w-4 animate-pulse text-(--primary-color)" />
      )}
    </button>
  )
}

export default FloatingMusicButton
