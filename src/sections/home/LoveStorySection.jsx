import { useEffect, useRef, useState } from 'react'
import bgPhoto from '../../assets/gallery/03.JPG'
import loveStoryImg from '../../assets/love-story/love-story.png'
import { LOVE_STORY_CHAPTERS } from '../../constant'
import { useLanguage } from '../../context/LanguageContext'
import { translations } from '../../i18n/translations'

function LoveStorySection() {
  const { language } = useLanguage()
  const t = translations[language]

  const CHAPTERS = LOVE_STORY_CHAPTERS.map((chapter, index) => ({
    ...chapter,
    ...t.loveStoryChapters[index],
  }))

  const [showDetail, setShowDetail] = useState(false)

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
    <section
      ref={sectionRef}
      className="relative z-0 flex flex-col items-center justify-center gap-6 overflow-hidden py-20"
    >
      <div
        className="absolute inset-0 -z-20 bg-cover bg-center bg-fixed"
        style={{ backgroundImage: `url(${bgPhoto})` }}
      />
      <div className="absolute inset-0 -z-10 bg-black/65 backdrop-blur-xs" />

      <div
        className={`w-full px-3 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}
      >
        <div className="relative w-full">
          <img
            src={loveStoryImg}
            alt={t.ourLoveStoryTitle}
            className="w-full select-none"
          />
          <button
            type="button"
            onClick={() => setShowDetail((prev) => !prev)}
            className={`absolute flex -translate-x-1/2 -translate-y-1/2 cursor-pointer flex-col items-center text-(--black-color) ${isVisible ? 'animate-float' : ''
              }`}
            style={{ top: '84%', left: '48%' }}
          >
            <span className="font-elegant text-sm italic">{t.clickForLabel}</span>
            <span className="font-script -mt-1 text-2xl">{t.detailLabel}</span>
          </button>
        </div>
      </div>

      {showDetail && (
        <div
          key={showDetail}
          className="flex w-full flex-col items-center gap-10 px-6 pt-10"
        >
          <p className="font-script text-3xl text-white pb-5 animate-fade-in-down">
            {t.ourLoveStoryTitle}
          </p>

          <div className="flex w-full flex-col gap-12">
            {CHAPTERS.map(({ label, image, rotate, reverse, desc }, index) => (
              <div key={label} className='flex flex-col gap-4 items-center'>
                <div className='w-[85%]'>
                  <p className="font-elegant flex-1 font-bold text-sm text-center text-white italic">
                    {label}
                  </p>
                </div>

                <div
                  key={label}
                  className={`flex items-center gap-4 animate-fade-in-up ${reverse ? 'flex-row-reverse' : ''
                    }`}
                  style={{ animationDelay: `${0.2 + index * 0.2}s` }}
                >
                  <p className='font-elegant text-xs text-white'>{desc}</p>
                  <img
                    src={image}
                    alt={label}
                    className={`w-40 shrink-0 select-none shadow-lg animate-pop-in ${rotate}`}
                    style={{ animationDelay: `${0.35 + index * 0.2}s` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}

export default LoveStorySection
