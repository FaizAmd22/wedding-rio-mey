import { useState } from 'react'
import bgPhoto from '../../assets/gallery/03.JPG'
import loveStoryImg from '../../assets/love-story/love-story.png'
import chapterOneImg from '../../assets/love-story/love-story-1.png'
import chapterTwoImg from '../../assets/love-story/love-story-2.png'
import chapterThreeImg from '../../assets/love-story/love-story-3.png'

const CHAPTERS = [
  { label: 'Chapter One', image: chapterOneImg, rotate: 'rotate-3' },
  {
    label: 'Chapter Two',
    image: chapterTwoImg,
    rotate: '-rotate-3',
    reverse: true,
  },
  { label: 'Chapter Three', image: chapterThreeImg, rotate: 'rotate-2' },
]

function LoveStorySection() {
  const [showDetail, setShowDetail] = useState(false)

  return (
    <section className="relative z-0 flex flex-col items-center justify-center gap-6 overflow-hidden py-20">
      <div
        className="absolute inset-0 -z-20 bg-cover bg-center bg-fixed"
        style={{ backgroundImage: `url(${bgPhoto})` }}
      />
      <div className="absolute inset-0 -z-10 bg-black/65 backdrop-blur-xs" />

      <div className="w-full px-3">
        <div className="relative w-full">
          <img
            src={loveStoryImg}
            alt="Love Story"
            className="w-full select-none"
          />
          <button
            type="button"
            onClick={() => setShowDetail((prev) => !prev)}
            className="absolute flex -translate-x-1/2 -translate-y-1/2 cursor-pointer flex-col items-center text-[#3a2a30]"
            style={{ top: '84%', left: '48%' }}
          >
            <span className="font-elegant text-sm italic">click for</span>
            <span className="font-script -mt-1 text-2xl">Detail</span>
          </button>
        </div>
      </div>

      {showDetail && (
        <div className="flex w-full flex-col items-center gap-10 px-6 pt-10">
          <p className="font-script text-3xl text-white pb-5">Our Love Story</p>

          <div className="flex w-full flex-col gap-12">
            {CHAPTERS.map(({ label, image, rotate, reverse }) => (
              <div
                key={label}
                className={`flex items-center gap-4 ${reverse ? 'flex-row-reverse' : ''
                  }`}
              >
                <p className="font-elegant flex-1 text-center text-sm text-white">
                  {label}
                </p>
                <img
                  src={image}
                  alt={label}
                  className={`w-40 shrink-0 select-none shadow-lg ${rotate}`}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}

export default LoveStorySection
