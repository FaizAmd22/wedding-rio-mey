import { useEffect, useState } from 'react'
import { COUPLE_SHORT_NAME } from '../constant'

const galleryModules = import.meta.glob('../assets/gallery/*.webp', {
  eager: true,
  import: 'default',
})

const galleryImages = Object.keys(galleryModules)
  .sort()
  .map((key) => galleryModules[key])

const SLIDE_INTERVAL_MS = 5000

function GalleryCarousel() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % galleryImages.length)
    }, SLIDE_INTERVAL_MS)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative h-full w-full overflow-hidden bg-black">
      {galleryImages.map((src, i) => (
        <img loading="lazy" decoding="async"
          key={src}
          src={src}
          alt=""
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${i === index ? 'opacity-100' : 'opacity-0'
            }`}
        />
      ))}

      <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/10 to-transparent" />

      <div className="absolute bottom-16 left-0 w-full px-16 text-white">
        <p className="font-elegant text-xl italic">The Wedding Of</p>
        <p className="font-script text-6xl">{COUPLE_SHORT_NAME}</p>
      </div>
    </div>
  )
}

export default GalleryCarousel
