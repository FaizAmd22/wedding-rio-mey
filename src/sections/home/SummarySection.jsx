import { useEffect, useRef, useState } from 'react'
import { MapPin } from 'lucide-react'
import { translations } from '../../i18n/translations'
import { useLanguage } from '../../context/LanguageContext'
import { EVENT_SCHEDULE, VENUE } from '../../constant'

function SummarySection() {
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
      { threshold: 0.3 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="summary"
      className="flex flex-col items-center gap-3 px-6 text-center pt-4"
    >
      <div
        className={`font-elegant flex items-center gap-3 text-xl font-semibold text-(--black-color) ${isVisible ? 'animate-fade-in-up' : 'opacity-0'
          }`}
      >
        <MapPin className="h-5 w-5 text-(--primary-color) animate-float" />
        {VENUE.name}
      </div>

      <dl
        className={`font-elegant grid w-[70%] grid-cols-[auto_auto_auto] gap-x-2 gap-y-1 text-left text-sm text-[#6b5b4d] ${isVisible ? 'animate-fade-in-up' : 'opacity-0'
          }`}
        style={{ animationDelay: isVisible ? '0.25s' : undefined }}
      >
        <dt className="font-semibold">{t.time}</dt>
        <dd>:</dd>
        <dd className="text-left">
          {t.formatVenueHours(
            EVENT_SCHEDULE.venueHours.start,
            EVENT_SCHEDULE.venueHours.end,
          )}
        </dd>
        <dt className="font-semibold">{t.akad}</dt>
        <dd>:</dd>
        <dd className="text-left">{EVENT_SCHEDULE.akad}</dd>
        <dt className="font-semibold">{t.reception}</dt>
        <dd>:</dd>
        <dd className="text-left">{EVENT_SCHEDULE.reception}</dd>
      </dl>
    </section>
  )
}

export default SummarySection