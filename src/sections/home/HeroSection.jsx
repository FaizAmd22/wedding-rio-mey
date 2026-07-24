import letterImg from '../../assets/images/letter-2.png'

function HeroSection() {
  return (
    <section id="hero" className="relative flex flex-col items-center px-4 pt-16">
      <div className="relative w-full">
        <img src={letterImg} alt="Save the date" className="w-full select-none" />
        <div
          className="absolute flex flex-col items-center gap-1 text-center"
          style={{
            top: '8%',
            left: '34%',
            width: '57%',
            transform: 'rotate(7deg)',
          }}
        >
          <p className="font-elegant text-[11px] tracking-[0.2em] text-[#6b5b4d] uppercase">
            Save The Date
          </p>
          <p className="font-script text-xl leading-tight text-[#3a2a30]">
            Rio Rizki Giofani
          </p>
          <p className="font-elegant text-xs text-[#6b5b4d]">&amp;</p>
          <p className="font-script text-xl leading-tight text-[#3a2a30]">
            Risma Meliani
          </p>
          <p className="font-elegant mt-1 pt-2 text-xs tracking-widest text-[#6b5b4d]">
            12 / 09 / 2026
          </p>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
