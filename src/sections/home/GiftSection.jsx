import { useEffect, useRef, useState } from 'react'
import { Check, Copy, Gift } from 'lucide-react'
import giftImg from '../../assets/images/gift.png'
import { useLanguage } from '../../context/LanguageContext'
import { translations } from '../../i18n/translations'
import { COUPLE, GIFT_ADDRESS, GIFTS } from '../../constant'

function GiftAccount({ bank, accountNumber, accountName, isVisible, delay }) {
  const [copied, setCopied] = useState(false)

  const handleCopyAcount = async () => {
    try {
      await navigator.clipboard.writeText(accountNumber)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      // Clipboard API unavailable; nothing else to do.
    }
  }

  return (
    <div
      className={`flex w-full flex-col items-center gap-2 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'
        }`}
      style={{ animationDelay: isVisible ? `${delay}s` : undefined }}
    >
      <p className="font-elegant text-xs tracking-widest text-(--black-color) uppercase">
        {bank}
      </p>
      <div className="flex w-full items-center overflow-hidden bg-white shadow-md rounded-md">
        <span className="h-10 w-3 shrink-0 bg-(--black-color)" />
        <span className="font-elegant flex-1 text-center text-sm text-(--black-color)">
          {accountNumber}
        </span>

        <button
          type="button"
          onClick={handleCopyAcount}
          aria-label={`Copy ${bank} account number`}
          className="mr-3 shrink-0 cursor-pointer text-(--black-color)"
        >
          {copied ? (
            <Check className="h-4 w-4 animate-pop-in text-(--primary-color)" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </button>
        <span className="h-10 w-3 shrink-0 bg-(--black-color)" />
      </div>
      <p className="font-elegant text-xs tracking-wide text-(--black-color) uppercase">
        {accountName}
      </p>
    </div>
  )
}

function GiftSection() {
  const [copiedAddress, setCopiedAddress] = useState(false)

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

  const handleCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText(GIFT_ADDRESS)
      setCopiedAddress(true)
      setTimeout(() => setCopiedAddress(false), 1500)
    } catch {
      // Clipboard API unavailable; nothing else to do.
    }
  }

  return (
    <section
      ref={sectionRef}
      id="gift"
      className="flex flex-col items-center gap-6 px-6 py-10 text-center"
    >
      <p
        className={`font-script text-3xl text-(--black-color) ${isVisible ? 'animate-fade-in-down' : 'opacity-0'
          }`}
      >
        {t.giftTitle}
      </p>

      <img loading="lazy" decoding="async"
        src={giftImg}
        alt={t.giftTitle}
        className={`w-32 select-none ${isVisible ? 'animate-pop-in' : 'opacity-0'}`}
        style={{ animationDelay: isVisible ? '0.2s' : undefined }}
      />

      <p
        className={`font-elegant text-sm text-[#6b5b4d] ${isVisible ? 'animate-fade-in-up' : 'opacity-0'
          }`}
        style={{ animationDelay: isVisible ? '0.35s' : undefined }}
      >
        {t.giftMessage}
      </p>

      <div className="flex w-full flex-col gap-6">
        {GIFTS.map((gift, index) => (
          <GiftAccount
            key={gift.accountNumber}
            {...gift}
            isVisible={isVisible}
            delay={0.5 + index * 0.15}
          />
        ))}
      </div>

      <div
        className={`relative overflow-hidden w-full mt-10 text-left text-(--black-color) flex flex-col gap-8 bg-white rounded-xl p-5 shadow-lg border border-(--black-color) ${isVisible ? 'animate-fade-in-up' : 'opacity-0'
          }`}
        style={{ animationDelay: isVisible ? `${0.5 + GIFTS.length * 0.15 + 0.15}s` : undefined }}
      >
        <div className="pointer-events-none absolute top-0 right-0 h-16 w-16 overflow-hidden rounded-tr-xl">
          <div
            className="absolute inset-0 bg-(--black-color)"
            style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%)' }}
          />
          <Gift className="absolute top-2 right-2 h-5 w-5 text-white" />
        </div>

        <p className="font-elegant text-center text-sm font-semibold text-[#6b5b4d]">{t.sendGiftTo}</p>

        <RowSection text1={t.recipientLabel} text2={COUPLE.groom.fullName.split(' ')[0]} />
        <RowSection text1={t.addressLabel} text2={GIFT_ADDRESS} />

        <div className="m-auto">
          <button
            onClick={handleCopyAddress}
            type="button"
            className="font-elegant rounded-full border border-[#c98fae] px-5 py-2 text-sm text-(--black-color) transition-colors hover:bg-[#f4c9d9]/40"
          >
            {copiedAddress ? (
              <div className="flex gap-2">
                <Check className="h-4 w-4 animate-pop-in text-(--primary-color)" />
                <p>{t.addressCopied}</p>
              </div>
            ) : (
              <div className="flex gap-2">
                <Copy className="h-4 w-4" />
                <p>{t.copyAddress}</p>
              </div>
            )}
          </button>
        </div>
      </div>
    </section>
  )
}

const RowSection = ({ text1, text2 }) => {
  return (
    <div className="w-full grid grid-cols-[70px_20px_auto] gap-2 font-elegant text-sm text-[#6b5b4d]">
      <p className="">{text1}</p>
      <p className="text-center">:</p>
      <p className="">{text2}</p>
    </div>
  )
}

export default GiftSection