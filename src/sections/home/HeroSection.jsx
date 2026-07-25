import letterImg from '../../assets/images/letter-2.png'
import { COUPLE, WEDDING_DATE_DISPLAY } from '../../constant'
import { useLanguage } from '../../context/LanguageContext'
import { translations } from '../../i18n/translations'

function HeroSection() {
  const { language } = useLanguage()
  const t = translations[language]

  return (
    <section id="hero" className="relative flex flex-col items-center px-4 pt-16">
      <div className="relative w-full">
        <img
          src={letterImg}
          alt={t.saveTheDateAlt}
          className="w-full select-none animate-fade-in-down"
        />
        <div
          className="absolute flex flex-col items-center gap-1 text-center"
          style={{
            top: '8%',
            left: '34%',
            width: '57%',
            transform: 'rotate(7deg)',
          }}
        >
          <p
            className="font-elegant text-[11px] tracking-[0.2em] text-[#6b5b4d] uppercase animate-letter-in"
            style={{ animationDelay: '0.4s' }}
          >
            {t.saveTheDate}
          </p>
          <p
            className="font-script text-xl leading-tight text-(--black-color) animate-letter-in"
            style={{ animationDelay: '0.6s' }}
          >
            {COUPLE.groom.fullName}
          </p>
          <p
            className="font-elegant text-xs text-[#6b5b4d] animate-letter-in"
            style={{ animationDelay: '0.75s' }}
          >
            &amp;
          </p>
          <p
            className="font-script text-xl leading-tight text-(--black-color) animate-letter-in"
            style={{ animationDelay: '0.9s' }}
          >
            {COUPLE.bride.fullName}
          </p>
          <p
            className="font-elegant mt-1 pt-2 text-xs tracking-widest text-[#6b5b4d] animate-letter-in"
            style={{ animationDelay: '1.1s' }}
          >
            {WEDDING_DATE_DISPLAY}
          </p>
        </div>
      </div>
    </section>
  )
}

export default HeroSection