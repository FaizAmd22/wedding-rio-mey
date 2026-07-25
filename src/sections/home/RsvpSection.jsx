import { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import bgPhoto from '../../assets/images/bg-rsvp.png'
import { useLanguage } from '../../context/LanguageContext'
import { translations } from '../../i18n/translations'
import { COUPLE_SHORT_NAME } from '../../constant'
import { db } from '../../lib/firebase'

function RsvpSection() {
  const { language } = useLanguage()
  const t = translations[language]
  const [searchParams] = useSearchParams()
  const [name, setName] = useState(searchParams.get('guest') ?? '')
  const [guestCount, setGuestCount] = useState('')
  const [attending, setAttending] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

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

  const handleRespond = async (isAttending) => {
    if (submitting || submitted) return

    setAttending(isAttending)
    setSubmitting(true)
    try {
      await addDoc(collection(db, 'rsvps'), {
        name,
        guestCount: isAttending ? Number(guestCount) || 1 : 0,
        attending: isAttending,
        createdAt: serverTimestamp(),
      })
      setSubmitted(true)
    } catch (error) {
      console.error('Failed to submit RSVP', error)
    } finally {
      setSubmitting(false)
    }
  }

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

      <div className="flex w-full flex-col items-center gap-6 px-6">
        <p
          className={`font-script text-xl tracking-[0.2em] text-white italic ${isVisible ? 'animate-fade-in-down' : 'opacity-0'
            }`}
        >
          {t.rsvpTitle}
        </p>

        <div
          className={`flex w-full flex-col gap-3 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'
            }`}
          style={{ animationDelay: isVisible ? '0.2s' : undefined }}
        >
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder={t.namePlaceholder}
            disabled
            className="font-elegant w-full rounded-full bg-white/20 px-5 py-3 text-sm text-white placeholder-white/70 outline-none backdrop-blur-sm"
          />
          <input
            type="number"
            min="1"
            value={guestCount}
            onChange={(event) => setGuestCount(event.target.value)}
            placeholder={t.guestCountPlaceholder}
            disabled={submitted}
            className="font-elegant w-full rounded-full bg-white px-5 py-3 text-sm text-(--black-color) placeholder-[#6b5b4d] outline-none disabled:opacity-60"
          />
        </div>

        <div
          className={`flex w-full gap-3 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'
            }`}
          style={{ animationDelay: isVisible ? '0.35s' : undefined }}
        >
          <button
            type="button"
            onClick={() => handleRespond(false)}
            disabled={submitting || submitted}
            className="font-elegant flex-1 cursor-pointer rounded-full bg-(--black-color) px-4 py-2 text-sm text-white transition-colors disabled:cursor-not-allowed disabled:opacity-70 active:scale-95"
          >
            {t.declineButton}
          </button>
          <button
            type="button"
            onClick={() => handleRespond(true)}
            disabled={submitting || submitted}
            className={`font-elegant flex-1 cursor-pointer rounded-full px-4 py-2 text-sm transition-colors disabled:cursor-not-allowed disabled:opacity-70 active:scale-95 ${attending !== false
              ? 'bg-white text-(--black-color)'
              : 'bg-white/20 text-white'
              }`}
          >
            {t.acceptButton}
          </button>
        </div>

        {submitted && (
          <p className="font-elegant animate-pop-in text-sm text-white">
            {t.rsvpThanks}
          </p>
        )}
      </div>

      <div
        className={`relative w-[90%] mt-15 rounded-2xl bg-(--black-color) px-6 py-8 text-white text-center ${isVisible ? 'animate-fade-in-up' : 'opacity-0'
          }`}
        style={{ animationDelay: isVisible ? '0.5s' : undefined }}
      >
        <p className="font-elegant text-sm leading-relaxed">
          {t.thankYouLine1}
          <br />
          {t.thankYouLine2}
        </p>

        <div className="mt-5">
          <p className="font-elegant mt-4 text-sm">{t.regards}</p>
          <p className="font-script text-2xl">{COUPLE_SHORT_NAME}</p>
        </div>
      </div>
    </section>
  )
}

export default RsvpSection