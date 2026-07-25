import { useEffect, useRef, useState } from 'react'
import { BookOpen, Clock, HeartHandshake, MapPin } from 'lucide-react'
import LocationMap from '../../components/LocationMap'
import { useLanguage } from '../../context/LanguageContext'
import { translations } from '../../i18n/translations'
import { EVENT_SCHEDULE, VENUE } from '../../constant'

const ROWS = [
  { icon: Clock, labelKey: 'time' },
  { icon: HeartHandshake, labelKey: 'akad' },
  { icon: BookOpen, labelKey: 'reception' },
  { icon: MapPin, labelKey: 'location' },
]

function MapSection() {
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
      id="location"
      className="flex flex-col items-center gap-4 text-center"
    >
      <div className="px-6 py-8">
        <p
          className={`font-script pb-7 text-3xl text-(--black-color) ${isVisible ? 'animate-fade-in-down' : 'opacity-0'
            }`}
        >
          {t.mapTitle}
        </p>

        <dl className="font-elegant grid w-full grid-cols-[auto_auto_auto_auto] gap-x-3 gap-y-4 text-left text-sm text-[#6b5b4d]">
          <dt
            className={isVisible ? 'animate-pop-in' : 'opacity-0'}
            style={{ animationDelay: isVisible ? '0.2s' : undefined }}
          >
            <Clock className="h-5 w-5 text-(--primary-color)" />
          </dt>
          <dd
            className={`font-semibold ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
            style={{ animationDelay: isVisible ? '0.2s' : undefined }}
          >
            {t.time}
          </dd>
          <dd
            className={isVisible ? 'animate-fade-in-up' : 'opacity-0'}
            style={{ animationDelay: isVisible ? '0.2s' : undefined }}
          >
            :
          </dd>
          <dd
            className={`text-left ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
            style={{ animationDelay: isVisible ? '0.2s' : undefined }}
          >
            {t.formatVenueHours(
              EVENT_SCHEDULE.venueHours.start,
              EVENT_SCHEDULE.venueHours.end,
            )}
          </dd>

          <dt
            className={isVisible ? 'animate-pop-in' : 'opacity-0'}
            style={{ animationDelay: isVisible ? '0.4s' : undefined }}
          >
            <HeartHandshake className="h-5 w-5 text-(--primary-color)" />
          </dt>
          <dd
            className={`font-semibold ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
            style={{ animationDelay: isVisible ? '0.4s' : undefined }}
          >
            {t.akad}
          </dd>
          <dd
            className={isVisible ? 'animate-fade-in-up' : 'opacity-0'}
            style={{ animationDelay: isVisible ? '0.4s' : undefined }}
          >
            :
          </dd>
          <dd
            className={`text-left ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
            style={{ animationDelay: isVisible ? '0.4s' : undefined }}
          >
            {EVENT_SCHEDULE.akad}
          </dd>

          <dt
            className={isVisible ? 'animate-pop-in' : 'opacity-0'}
            style={{ animationDelay: isVisible ? '0.6s' : undefined }}
          >
            <BookOpen className="h-5 w-5 text-(--primary-color)" />
          </dt>
          <dd
            className={`font-semibold ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
            style={{ animationDelay: isVisible ? '0.6s' : undefined }}
          >
            {t.reception}
          </dd>
          <dd
            className={isVisible ? 'animate-fade-in-up' : 'opacity-0'}
            style={{ animationDelay: isVisible ? '0.6s' : undefined }}
          >
            :
          </dd>
          <dd
            className={`text-left ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
            style={{ animationDelay: isVisible ? '0.6s' : undefined }}
          >
            {EVENT_SCHEDULE.reception}
          </dd>

          <dt
            className={isVisible ? 'animate-pop-in' : 'opacity-0'}
            style={{ animationDelay: isVisible ? '0.8s' : undefined }}
          >
            <MapPin className="h-5 w-5 text-(--primary-color)" />
          </dt>
          <dd
            className={`font-semibold ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
            style={{ animationDelay: isVisible ? '0.8s' : undefined }}
          >
            {t.location}
          </dd>
          <dd
            className={isVisible ? 'animate-fade-in-up' : 'opacity-0'}
            style={{ animationDelay: isVisible ? '0.8s' : undefined }}
          >
            :
          </dd>
          <dd
            className={`text-left ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
            style={{ animationDelay: isVisible ? '0.8s' : undefined }}
          >
            {VENUE.name} ( {VENUE.address} )
          </dd>
        </dl>
      </div>

      <div
        className={`relative z-0 h-52 w-full overflow-hidden shadow-md ${isVisible ? 'animate-fade-in' : 'opacity-0'
          }`}
        style={{ animationDelay: isVisible ? '1s' : undefined }}
      >
        <LocationMap />
      </div>

      <a
        href={VENUE.googleMapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`font-elegant my-5 rounded-full border border-[#c98fae] px-5 py-2 text-sm text-(--black-color) transition-colors hover:bg-[#f4c9d9]/40 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'
          }`}
        style={{ animationDelay: isVisible ? '1.2s' : undefined }}
      >
        {t.openMaps}
      </a>
    </section >
  )
}

export default MapSection