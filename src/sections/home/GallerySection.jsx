import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '../../context/LanguageContext'
import { translations } from '../../i18n/translations'

const galleryModules = import.meta.glob('../../assets/gallery/*.webp', {
  eager: true,
  import: 'default',
})

const galleryImages = Object.keys(galleryModules)
  .sort()
  .map((key) => galleryModules[key])

function GallerySection() {
  const [selectedImage, setSelectedImage] = useState(galleryImages[0])
  const { language } = useLanguage()
  const t = translations[language]

  const sectionRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(el)
        }
      },
      { threshold: 0.2 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} id="gallery" className="flex flex-col items-center gap-6">
      <p
        className={`font-script pb-7 text-3xl text-(--black-color) ${isVisible ? 'animate-fade-in-down' : 'opacity-0'
          }`}
      >
        {t.galleryTitle}
      </p>

      <div
        className={`w-full px-6 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
        style={{ animationDelay: isVisible ? '0.2s' : undefined }}
      >
        <img loading="lazy" decoding="async"
          key={selectedImage}
          src={selectedImage}
          alt="Rio & Mey"
          className="aspect-4/5 w-full animate-fade-in rounded-2xl object-cover shadow-md"
        />
      </div>

      <div
        className={`custom-scrollbar flex w-full gap-2 overflow-x-auto px-6 pt-2 pb-2 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'
          }`}
        style={{ animationDelay: isVisible ? '0.4s' : undefined }}
      >
        {galleryImages.map((src, index) => (
          <button
            key={src}
            type="button"
            onClick={() => setSelectedImage(src)}
            className={`h-20 w-20 shrink-0 cursor-pointer border-2 rounded-lg transition-all duration-300 ${isVisible ? 'animate-fade-in' : 'opacity-0'
              } ${selectedImage === src
                ? 'scale-105 border-[#c98fae]'
                : 'border-transparent hover:scale-105'
              }`}
            style={{ animationDelay: isVisible ? `${0.5 + index * 0.06}s` : undefined }}
          >
            <img loading="lazy" decoding="async" src={src} alt="" className="h-full w-full object-cover rounded-lg" />
          </button>
        ))}
      </div>
    </section>
  )
}

export default GallerySection