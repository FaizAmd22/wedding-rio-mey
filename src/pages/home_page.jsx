import bgImg from '../assets/images/bg.webp'
import HeroSection from '../sections/home/HeroSection'
import SummarySection from '../sections/home/SummarySection'
import MapSection from '../sections/home/MapSection'
import RsvpSection from '../sections/home/RsvpSection'
import CouplesSection from '../sections/home/CouplesSection'
import LoveStorySection from '../sections/home/LoveStorySection'
import GallerySection from '../sections/home/GallerySection'
import GiftSection from '../sections/home/GiftSection'
import WishSection from '../sections/home/WishSection'
import CornerFlowers from '../components/CornerFlowers'
import Countdown from '../components/Countdown'
import BottomNav from '../components/BottomNav'
import LanguageToggle from '../components/LanguageToggle'
import FloatingMusicButton from '../components/FloatingMusicButton'
import RevealOnScroll from '../components/RevealOnScroll'
import PageLoader from '../components/PageLoader'
import GalleryCarousel from '../components/GalleryCarousel'

function HomePage() {
  return (
    <PageLoader>
      <div className="lg:flex lg:h-screen">
        {/* Desktop-only: cycling photo panel filling the leftover space */}
        <div className="hidden lg:block lg:h-screen lg:flex-1">
          <GalleryCarousel />
        </div>

        {/* The actual site, constrained to a phone-width column on desktop */}
        {/* NOTE: keep this an explicit pixel value. This project's :root sets
            an 18px base font-size (see index.css), so Tailwind's rem-based
            `w-120` resolves to 540px here, not 480px — editor auto-fixes that
            "simplify to w-120" will silently break the layout again. */}
        <div className="custom-scrollbar relative lg:h-screen lg:w-[480px] lg:shrink-0 lg:overflow-y-auto">
          <div
            className="relative min-h-screen w-full overflow-x-hidden bg-cover bg-center bg-fixed pb-56"
            style={{ backgroundImage: `url(${bgImg})` }}
          >
            <div className="flex flex-col gap-8">
              <RevealOnScroll>
                <HeroSection />
              </RevealOnScroll>
              <RevealOnScroll>
                <SummarySection />
              </RevealOnScroll>
              <RevealOnScroll>
                <CouplesSection />
              </RevealOnScroll>
              <RevealOnScroll>
                <GallerySection />
              </RevealOnScroll>
              <RevealOnScroll>
                <LoveStorySection />
              </RevealOnScroll>
              <RevealOnScroll>
                <MapSection />
              </RevealOnScroll>
              <RevealOnScroll>
                <GiftSection />
              </RevealOnScroll>
              <RevealOnScroll>
                <WishSection />
              </RevealOnScroll>
              <RevealOnScroll>
                <RsvpSection />
              </RevealOnScroll>
              <RevealOnScroll>
                <div className='text-center font-elegant border-t text-xs flex flex-col gap-2 border-gray-300 italic pt-5'>
                  <span>Powered by <a target='_blank' href={'https://www.instagram.com/fzhal_a2/'} className='underline'>fzhal a2</a></span>

                </div>
              </RevealOnScroll>
            </div>
          </div>
        </div>

        {/*
          Fixed UI (corner flowers, countdown, bottom nav, language toggle).
          On desktop this wrapper is pinned to the same column as the site
          above and given an identity transform so it becomes the containing
          block for its `position: fixed` children — that scopes them to the
          column instead of the full viewport, without touching
          `background-attachment: fixed` elsewhere (that only breaks when the
          *content* carrying the fixed background sits inside a transformed
          ancestor, which isn't the case here).

          The wrapper itself has no in-flow content (every child is
          `position: fixed`), but `inset-y-0` still forces its own box to
          span the full column height — without `pointer-events-none` that
          invisible box sits on top of the whole column and silently
          swallows every wheel/click event, which is what broke scrolling.
          Each child gets `pointer-events-auto` back via a `contents`
          wrapper so the actual interactive bits (nav links, language
          button) still work.
        */}
        <div className="pointer-events-none lg:fixed lg:inset-y-0 lg:right-0 lg:w-[480px] lg:translate-x-0">
          <div className="contents pointer-events-auto">
            <CornerFlowers />
          </div>
          <div className="contents pointer-events-auto">
            <Countdown />
          </div>
          <div className="contents pointer-events-auto">
            <BottomNav />
          </div>
          <div className="contents pointer-events-auto">
            <LanguageToggle />
          </div>
          <div className="contents pointer-events-auto">
            <FloatingMusicButton />
          </div>
        </div>
      </div>
    </PageLoader>
  )
}

export default HomePage
