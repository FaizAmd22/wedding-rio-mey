import { useNavigate, useSearchParams } from 'react-router-dom'
import bgImg from '../assets/images/bg.png'
import bgLetterImg from '../assets/images/bg-letter.png'
import letterImg from '../assets/images/letter.png'
import flowerImg from '../assets/images/flower.png'

const COUPLE_NAME = 'Rio & Mey'

function LetterPage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const guest = searchParams.get('guest') || 'Name'

  const openLetter = () =>
    navigate({ pathname: '/home', search: searchParams.toString() })

  return (
    <div
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-cover bg-center px-2 py-12"
      style={{ backgroundImage: `url(${bgImg})` }}
    >
      <img
        src={flowerImg}
        alt=""
        className="animate-fade-in-down pointer-events-none absolute inset-x-0 -top-5 w-full -scale-y-100 select-none"
        style={{ animationDuration: '1.2s' }}
      />
      <img
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
              A Love Letter From
            </p>
            <p className="font-script relative inline-block text-4xl leading-none text-[#3a2a30]">
              {[...COUPLE_NAME].map((char, i) => (
                <span
                  key={i}
                  className="animate-letter-in inline-block"
                  style={{ animationDelay: `${1 + i * 0.08}s` }}
                >
                  {char === ' ' ? ' ' : char}
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
            aria-label="Open the letter"
          >
            <img
              src={letterImg}
              alt="Letter envelope"
              className="animate-float w-35"
              style={{ animationDelay: '3.2s' }}
            />
          </button>

          <div
            className="animate-fade-in-up flex flex-col items-center"
            style={{ animationDelay: '2.6s' }}
          >
            <p className="font-elegant text-sm italic text-[#8a5a6b]">to :</p>
            <p className="font-elegant text-lg font-semibold text-[#3a2a30]">
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
          Open The Letter
        </button>
      </div>
    </div>
  )
}

export default LetterPage
