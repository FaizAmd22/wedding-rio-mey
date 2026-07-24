import bgImg from '../assets/images/bg.png'
import CornerFlowers from '../components/home/CornerFlowers'
import HeroSection from '../sections/home/HeroSection'
import SummarySection from '../sections/home/SummarySection'
import MapSection from '../sections/home/MapSection'
import RsvpSection from '../sections/home/RsvpSection'
import CouplesSection from '../sections/home/CouplesSection'
import LoveStorySection from '../sections/home/LoveStorySection'
import GallerySection from '../sections/home/GallerySection'
import Countdown from '../components/home/Countdown'
import BottomNav from '../components/home/BottomNav'
import LanguageToggle from '../components/home/LanguageToggle'

function HomePage() {
  return (
    <div
      className="relative min-h-screen w-full overflow-x-hidden bg-cover bg-center bg-fixed pb-56"
      style={{ backgroundImage: `url(${bgImg})` }}
    >
      <CornerFlowers />

      <div className="flex flex-col gap-8">
        <HeroSection />
        <SummarySection />
        <CouplesSection />
        <GallerySection />
        <LoveStorySection />
        <MapSection />
        <RsvpSection />
      </div>

      <Countdown />
      <BottomNav />
      <LanguageToggle />
    </div>
  )
}

export default HomePage
