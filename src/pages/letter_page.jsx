import { useNavigate, useSearchParams } from 'react-router-dom'
import bgImg from '../assets/images/bg.webp'
import bgLetterImg from '../assets/images/bg-letter.webp'
import letterImg from '../assets/images/letter.webp'
import flowerImg from '../assets/images/flower.webp'
import { COUPLE_SHORT_NAME } from '../constant'
import GalleryCarousel from '../components/GalleryCarousel'
import { useLanguage } from '../context/LanguageContext'
import { useAudioPlayer } from '../context/AudioContext'
import { translations } from '../i18n/translations'

function LetterPage() {
  const { language } = useLanguage()
  const t = translations[language]
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { play } = useAudioPlayer()
  const guest = searchParams.get('guest') || t.defaultGuestName

  const openLetter = () => {
    // Must call play() synchronously inside the tap handler — on iOS Safari,
    // audio.play() only bypasses the autoplay block when it runs within the
    // same call stack as the user gesture. Starting it after navigation (in
    // an effect on the next page) is too late and gets silently blocked.
    play()
    navigate({
      pathname: '/wedding-rio-and-mey/home',
      search: searchParams.toString(),
    })
  }

  return (
    <div className="lg:flex lg:h-screen">
      {/* Desktop-only: decorative panel filling the leftover space, same as HomePage */}
      <div className="hidden lg:block lg:h-screen lg:flex-1">
        <GalleryCarousel />
      </div>

      {/* The actual letter, constrained to the same phone-width column on desktop */}
      {/* NOTE: keep this an explicit pixel value, matching home_page.jsx — the
          project's 18px root font-size makes Tailwind's rem-based `w-120`
          resolve to 540px here, not 480px. */}
      <div className="relative lg:h-screen lg:w-[480px] lg:shrink-0 lg:overflow-hidden">
        <div
          className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-cover bg-center px-2 py-12 lg:h-screen lg:min-h-0"
          style={{ backgroundImage: `url(${bgImg})` }}
        >
          <img decoding="async"
            src={flowerImg}
            alt=""
            className="animate-fade-in-down pointer-events-none absolute inset-x-0 -top-5 w-full -scale-x-100 -scale-y-100 select-none"
            style={{ animationDuration: '1.2s' }}
          />
          <img decoding="async"
            src={flowerImg}
            alt=""
            className="animate-fade-in-up pointer-events-none absolute inset-x-0 -bottom-5 w-full select-none"
            style={{ animationDuration: '1.2s' }}
          />

          <div className="relative z-10 flex w-full max-w-full flex-col items-center gap-6">
            <div
              className="animate-fade-in relative flex aspect-square w-full flex-col items-center justify-between bg-contain bg-center bg-no-repeat px-[15%] py-[13%]"
              style={{ backgroundImage: `url(${bgLetterImg})`, animationDelay: '0.3s' }}
            >
              <div className="mt-5 flex flex-col items-center gap-4">
                <p
                  className="animate-fade-in-down font-elegant text-sm italic text-[#8a5a6b]"
                  style={{ animationDelay: '0.7s' }}
                >
                  {t.loveLetterFrom}
                </p>
                <p className="font-script relative inline-block text-4xl leading-none text-(--black-color)">
                  {[...COUPLE_SHORT_NAME].map((char, i) => (
                    <span
                      key={i}
                      className="animate-letter-in inline-block"
                      style={{ animationDelay: `${1 + i * 0.08}s` }}
                    >
                      {char === ' ' ? ' ' : char}
                    </span>
                  ))}
                  <span
                    aria-hidden="true"
                    className="animate-shimmer-sweep pointer-events-none absolute inset-0"
                    style={{
                      animationDelay: '1s',
                      background:
                        'linear-gradient(75deg, transparent 40%, rgba(255,255,255,0.85) 50%, transparent 60%)',
                      mixBlendMode: 'overlay',
                    }}
                  />
                  <span
                    aria-hidden="true"
                    className="animate-twinkle pointer-events-none absolute -top-2 -left-2 text-base text-[#f7c9db]"
                    style={{ animationDelay: '2.1s' }}
                  >
                    ✦
                  </span>
                  <span
                    aria-hidden="true"
                    className="animate-twinkle pointer-events-none absolute top-0 -right-1 text-xs text-[#f7c9db]"
                    style={{ animationDelay: '2.4s' }}
                  >
                    ✦
                  </span>
                  <span
                    aria-hidden="true"
                    className="animate-twinkle pointer-events-none absolute -bottom-1 left-1/3 text-sm text-[#f7c9db]"
                    style={{ animationDelay: '2.7s' }}
                  >
                    ✦
                  </span>
                </p>
              </div>

              <button
                type="button"
                onClick={openLetter}
                className="animate-pop-in cursor-pointer border-none bg-transparent p-0"
                style={{ animationDelay: '2.3s' }}
                aria-label={t.openLetterButton}
              >
                <img decoding="async"
                  src={letterImg}
                  alt={t.letterEnvelopeAlt}
                  className="animate-float w-35"
                  style={{ animationDelay: '3.2s' }}
                />
              </button>

              <div
                className="animate-fade-in-up flex flex-col items-center"
                style={{ animationDelay: '2.6s' }}
              >
                <p className="font-elegant text-sm italic text-[#8a5a6b]">{t.toLabel}</p>
                <p className="font-elegant text-lg font-semibold text-(--black-color)">
                  {guest}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={openLetter}
              className="animate-fade-in-up font-elegant cursor-pointer border-none bg-transparent text-base italic text-[#6b4a55] hover:underline"
              style={{ animationDelay: '2.9s' }}
            >
              {t.openLetterButton}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LetterPage
