import { BookOpen, Clock, HeartHandshake, MapPin } from 'lucide-react'
import LocationMap from '../../components/home/LocationMap'
import { useLanguage } from '../../context/LanguageContext'
import { translations } from '../../i18n/translations'

const GOOGLE_MAPS_URL = 'https://maps.app.goo.gl/LZQtcrPSBgZtq1Lr7'

function MapSection() {
  const { language } = useLanguage()
  const t = translations[language]

  return (
    <section
      id="location"
      className="flex flex-col items-center gap-4 text-center"
    >
      <div className="px-6 py-8">
        <p className="font-script pb-7 text-3xl text-[#3a2a30]">{t.mapTitle}</p>

        <dl className="font-elegant grid w-full grid-cols-[auto_auto_auto_auto] gap-x-3 gap-y-4 text-left text-sm text-[#6b5b4d]">
          <dt>
            <Clock className="h-5 w-5 text-[#aa3b7f]" />
          </dt>
          <dd className="font-semibold">{t.time}</dd>
          <dd>:</dd>
          <dd className="text-left">{t.timeValue}</dd>
          <dt>
            <HeartHandshake className="h-5 w-5 text-[#aa3b7f]" />
          </dt>
          <dd className="font-semibold">{t.akad}</dd>
          <dd>:</dd>
          <dd className="text-left">16:00</dd>
          <dt>
            <BookOpen className="h-5 w-5 text-[#aa3b7f]" />
          </dt>
          <dd className="font-semibold">{t.reception}</dd>
          <dd>:</dd>
          <dd className="text-left">18:30</dd>
          <dt>
            <MapPin className="h-5 w-5 text-[#aa3b7f]" />
          </dt>
          <dd className="font-semibold">{t.location}</dd>
          <dd>:</dd>
          <dd className="text-left">
            Cafe Samoja ( 55PV+9W Jatipamor, Kabupaten Majalengka, Jawa Barat )
          </dd>
        </dl>
      </div>

      <div className="relative z-0 h-52 w-full overflow-hidden shadow-md">
        <LocationMap />
      </div>

      <a
        href={GOOGLE_MAPS_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="font-elegant my-5 rounded-full border border-[#c98fae] px-5 py-2 text-sm text-[#3a2a30] transition-colors hover:bg-[#f4c9d9]/40"
      >
        {t.openMaps}
      </a>
    </section>
  )
}

export default MapSection
