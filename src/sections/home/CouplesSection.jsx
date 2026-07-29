import { useEffect, useRef, useState } from 'react'
import loveLineImg from '../../assets/images/love-line.png'
import AudioPlayer from '../../components/AudioPlayer'
import { useLanguage } from '../../context/LanguageContext'
import { translations } from '../../i18n/translations'
import { COUPLE } from '../../constant'

function CoupleCard({ image, name, fatherLine, motherLine, reverse, isVisible, delay }) {
  return (
    <div
      className={`flex w-full items-center justify-between gap-4 ${reverse ? 'flex-row-reverse text-right' : 'text-left'
        }`}
    >
      <div
        className={`flex flex-col gap-1 text-center ${isVisible ? 'animate-fade-in-up' : 'opacity-0'
          }`}
        style={{ animationDelay: isVisible ? `${delay + 0.2}s` : undefined }}
      >
        <p className="font-script text-2xl text-(--black-color)">{name}</p>
        <p className="font-elegant text-xs text-[#6b5b4d]">{fatherLine}</p>
        <p className="font-elegant text-xs text-[#6b5b4d]">{motherLine}</p>
      </div>
      <img
        src={image}
        alt={name}
        className={`w-28 shrink-0 select-none sm:w-32 ${isVisible ? 'animate-pop-in' : 'opacity-0'
          }`}
        style={{ animationDelay: isVisible ? `${delay}s` : undefined }}
      />
    </div>
  )
}

function CouplesSection() {
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
    <section
      ref={sectionRef}
      id="couples"
      className="mt-7 flex flex-col items-center gap-8 px-6 py-10"
    >
      <div className="flex flex-col items-center gap-0">
        <p
          className={`font-script text-2xl text-(--black-color) ${isVisible ? 'animate-fade-in-down' : 'opacity-0'
            }`}
        >
          {t.coupleTitle}
        </p>
        <div
          className={`w-53 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}
          style={{ animationDelay: isVisible ? '0.2s' : undefined }}
        >
          <img src={loveLineImg} alt="loveLine" className="w-full object-cover" />
        </div>
      </div>

      <CoupleCard
        image={COUPLE.groom.photo}
        name={COUPLE.groom.fullName}
        fatherLine={t.formatSonOf(COUPLE.groom.father, COUPLE.groom.fatherDeceased)}
        motherLine={t.formatMotherOf(COUPLE.groom.mother)}
        isVisible={isVisible}
        delay={0.4}
      />

      <div
        className={`w-[80%] ${isVisible ? 'animate-pop-in' : 'opacity-0'}`}
        style={{ animationDelay: isVisible ? '0.8s' : undefined }}
      >
        <AudioPlayer />
      </div>

      <CoupleCard
        image={COUPLE.bride.photo}
        name={`${COUPLE.bride.fullName} (${COUPLE.bride.nickname})`}
        fatherLine={t.formatDaughterOf(COUPLE.bride.father)}
        motherLine={t.formatMotherOf(COUPLE.bride.mother)}
        reverse
        isVisible={isVisible}
        delay={1}
      />
    </section>
  )
}

export default CouplesSection