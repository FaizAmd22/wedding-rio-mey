import { Heart } from 'lucide-react'
import groomImg from '../../assets/couple/groom.png'
import brideImg from '../../assets/couple/bride.png'
import loveLineImg from '../../assets/images/love-line.png'
import AudioPlayer from '../../components/home/AudioPlayer'
import { useLanguage } from '../../context/LanguageContext'
import { translations } from '../../i18n/translations'

function CoupleCard({ image, name, fatherLine, motherLine, reverse }) {
  return (
    <div
      className={`flex w-full items-center justify-between gap-4 ${reverse ? 'flex-row-reverse text-right' : 'text-left'
        }`}
    >
      <div className="flex flex-col gap-1 text-center">
        <p className="font-script text-2xl text-[#3a2a30]">{name}</p>
        <p className="font-elegant text-xs text-[#6b5b4d]">{fatherLine}</p>
        <p className="font-elegant text-xs text-[#6b5b4d]">{motherLine}</p>
      </div>
      <img src={image} alt={name} className="w-28 shrink-0 select-none sm:w-32" />
    </div>
  )
}

function CouplesSection() {
  const { language } = useLanguage()
  const t = translations[language]

  return (
    <section
      id="couples"
      className="flex flex-col items-center gap-8 px-6 py-10 mt-7"
    >
      <div className="flex flex-col items-center gap-0">
        <p className="font-script text-2xl text-[#3a2a30]">{t.coupleTitle}</p>
        {/* <div className="flex items-center gap-2 text-[#c98fae]">
          <span className="h-px w-10 bg-[#c98fae]" />
          <Heart className="h-3 w-3" fill="currentColor" />
          <span className="h-px w-10 bg-[#c98fae]" />
        </div> */}
        <div className='w-53'>
          <img src={loveLineImg} alt="loveLine" className='w-full object-cover' />
        </div>
      </div>

      <CoupleCard
        image={groomImg}
        name="Rio Rizki Giofani"
        fatherLine={t.groomParents.father}
        motherLine={t.groomParents.mother}
      />

      <AudioPlayer />

      <CoupleCard
        image={brideImg}
        name="Risma Meliani (Mey)"
        fatherLine={t.brideParents.father}
        motherLine={t.brideParents.mother}
        reverse
      />
    </section>
  )
}

export default CouplesSection
