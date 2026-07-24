import { MapPin } from 'lucide-react'

function SummarySection() {
  return (
    <section
      id="summary"
      className="flex flex-col items-center gap-3 px-6 text-center pt-4"
    >
      <div className="font-elegant flex items-center gap-3 text-xl font-semibold text-[#3a2a30]">
        <MapPin className="h-5 w-5 text-[#aa3b7f]" />
        Cafe Samoja
      </div>

      <dl className="font-elegant grid w-[70%] grid-cols-[auto_auto_auto] gap-x-2 gap-y-1 text-left text-sm text-[#6b5b4d]">
        <dt className="font-semibold">Waktu</dt>
        <dd>:</dd>
        <dd className="text-left">16:00 WIB s/d 22:00</dd>
        <dt className="font-semibold">Akad</dt>
        <dd>:</dd>
        <dd className="text-left">16:00</dd>
        <dt className="font-semibold">Resepsi</dt>
        <dd>:</dd>
        <dd className="text-left">18:30</dd>
      </dl>
    </section>
  )
}

export default SummarySection
