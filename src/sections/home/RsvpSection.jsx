import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import bgPhoto from '../../assets/images/bg-rsvp.png'
import { useLanguage } from '../../context/LanguageContext'
import { translations } from '../../i18n/translations'

function RsvpSection() {
  const { language } = useLanguage()
  const t = translations[language]
  const [searchParams] = useSearchParams()
  const [name, setName] = useState(searchParams.get('guest') ?? '')
  const [guestCount, setGuestCount] = useState('')
  const [attending, setAttending] = useState(null)

  return (
    <section className="relative z-0 flex flex-col items-center justify-center gap-6 overflow-hidden py-20">
      <div
        className="absolute inset-0 -z-20 bg-cover bg-center bg-fixed"
        style={{ backgroundImage: `url(${bgPhoto})` }}
      />
      <div className="absolute inset-0 -z-10 bg-black/65 backdrop-blur-xs" />

      <div className="flex w-full flex-col items-center gap-6 px-6">
        <p className="font-elegant text-xl tracking-[0.2em] text-white italic">
          {t.rsvpTitle}
        </p>

        <div className="flex w-full flex-col gap-3">
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
            className="font-elegant w-full rounded-full bg-white px-5 py-3 text-sm text-[#3a2a30] placeholder-[#6b5b4d] outline-none"
          />
        </div>

        <div className="flex w-full gap-3">
          <button
            type="button"
            onClick={() => setAttending(false)}
            className={`font-elegant flex-1 cursor-pointer rounded-full px-4 py-2 text-sm transition-colors ${attending === false
              ? 'bg-white text-[#3a2a30]'
              : 'bg-white/20 text-white'
              }`}
          >
            {t.declineButton}
          </button>
          <button
            type="button"
            onClick={() => setAttending(true)}
            className={`font-elegant flex-1 cursor-pointer rounded-full px-4 py-2 text-sm transition-colors ${attending !== false
              ? 'bg-white text-[#3a2a30]'
              : 'bg-white/20 text-white'
              }`}
          >
            {t.acceptButton}
          </button>
        </div>
      </div>
    </section>
  )
}

export default RsvpSection
