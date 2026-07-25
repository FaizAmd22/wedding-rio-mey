import { useEffect, useRef, useState } from 'react'
import { Clock } from 'lucide-react'
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from 'firebase/firestore'
import { useLanguage } from '../../context/LanguageContext'
import { translations } from '../../i18n/translations'
import { db } from '../../lib/firebase'

function formatWishDate(date, locale) {
  return new Intl.DateTimeFormat(locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date)
}

function WishCard({ name, message, date }) {
  return (
    <div className="w-full animate-fade-in-up rounded-xl border border-[#c9b8b8] bg-white shadow-md px-4 py-3 text-left">
      <p className="font-elegant text-sm font-semibold text-(--black-color)">
        {name}
      </p>
      <div className="flex items-center gap-1 py-1 text-xs text-[#8a7a6d]">
        <Clock className="h-3 w-3" />
        <span>{date}</span>
      </div>
      <p className="font-elegant text-sm text-[#6b5b4d]">{message}</p>
    </div>
  )
}

function WishSection() {
  const { language } = useLanguage()
  const t = translations[language]
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [wishes, setWishes] = useState([])
  const [submitting, setSubmitting] = useState(false)

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

  useEffect(() => {
    const wishesQuery = query(
      collection(db, 'wishes'),
      orderBy('createdAt', 'desc'),
    )

    const unsubscribe = onSnapshot(wishesQuery, (snapshot) => {
      setWishes(
        snapshot.docs.map((doc) => {
          const data = doc.data()
          return {
            id: doc.id,
            name: data.name,
            message: data.message,
            date: data.createdAt
              ? formatWishDate(data.createdAt.toDate(), t.dateLocale)
              : '',
          }
        }),
      )
    })

    return unsubscribe
  }, [t.dateLocale])

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!name.trim() || !message.trim() || submitting) return

    setSubmitting(true)
    try {
      await addDoc(collection(db, 'wishes'), {
        name,
        message,
        createdAt: serverTimestamp(),
      })
      setName('')
      setMessage('')
    } catch (error) {
      console.error('Failed to submit wish', error)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section
      ref={sectionRef}
      id="wish"
      className="flex flex-col items-center gap-4 px-6 py-10 text-center"
    >
      <p
        className={`font-script text-3xl text-(--black-color) ${isVisible ? 'animate-fade-in-down' : 'opacity-0'
          }`}
      >
        {t.wishTitle}
      </p>

      <form
        onSubmit={handleSubmit}
        className={`flex w-full flex-col gap-3 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'
          }`}
        style={{ animationDelay: isVisible ? '0.2s' : undefined }}
      >
        <input
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder={t.namePlaceholder}
          className="font-elegant w-full rounded-lg shadow-md border border-[#c9b8b8] bg-white px-4 py-3 text-sm text-(--black-color) placeholder-[#8a7a6d] outline-none"
        />
        <textarea
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder={t.wishPlaceholder}
          rows={4}
          className="font-elegant w-full resize-none rounded-lg shadow-md border border-[#c9b8b8] bg-white px-4 py-3 text-sm text-(--black-color) placeholder-[#8a7a6d] outline-none"
        />
        <button
          type="submit"
          disabled={submitting}
          className="font-elegant mx-auto mt-5 cursor-pointer rounded-full bg-(--black-color) px-8 py-2 text-sm text-white transition-transform disabled:cursor-not-allowed disabled:opacity-70 active:scale-95"
        >
          {t.sendWish}
        </button>
      </form>

      <div className="flex w-full mt-6 pb-5 flex-col gap-3 max-h-[50vh] overflow-auto">
        {wishes.map((wish) => (
          <WishCard key={wish.id} {...wish} />
        ))}
      </div>
    </section>
  )
}

export default WishSection