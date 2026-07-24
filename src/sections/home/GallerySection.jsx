import { useState } from 'react'
import { useLanguage } from '../../context/LanguageContext'
import { translations } from '../../i18n/translations'

const galleryModules = import.meta.glob('../../assets/gallery/*.JPG', {
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

  return (
    <section id="gallery" className="flex flex-col items-center gap-6">
      <p className="font-script pb-7 text-3xl text-[#3a2a30]">{t.galleryTitle}</p>

      <div className="w-full px-6">
        <img
          src={selectedImage}
          alt="Rio & Mey"
          className="aspect-4/5 w-full rounded-2xl object-cover shadow-md"
        />
      </div>

      <div className="flex w-full gap-2 overflow-x-auto px-6 pb-2">
        {galleryImages.map((src) => (
          <button
            key={src}
            type="button"
            onClick={() => setSelectedImage(src)}
            className={`h-20 w-20 shrink-0 cursor-pointer overflow-hidden rounded-lg border-2 ${selectedImage === src ? 'border-[#c98fae]' : 'border-transparent'
              }`}
          >
            <img src={src} alt="" className="h-full w-full object-cover" />
          </button>
        ))}
      </div>
    </section>
  )
}

export default GallerySection
