import { useEffect, useRef, useState } from 'react'
import LetterIcon from '../icons/letter_icon'
import LetterActiveIcon from '../icons/letter_active_icon'
import LoveIcon from '../icons/love_icon'
import LoveActiveIcon from '../icons/love_active_icon'
import ImageIcon from '../icons/image_icon'
import ImageActiveIcon from '../icons/image_active_icon'
import MapIcon from '../icons/map_icon'
import MapActiveIcon from '../icons/map_active_icon'
import GiftActiveIcon from '../icons/gift_active_icon'
import GiftIcon from '../icons/gift_icon'

const NAV_ITEMS = [
  { icon: LetterIcon, activeIcon: LetterActiveIcon, label: 'Home', href: '#hero' },
  {
    icon: LoveIcon,
    activeIcon: LoveActiveIcon,
    label: 'Love Story',
    href: '#couples',
  },
  {
    icon: ImageIcon,
    activeIcon: ImageActiveIcon,
    label: 'Gallery',
    href: '#gallery',
  },
  {
    icon: MapIcon,
    activeIcon: MapActiveIcon,
    label: 'Location',
    href: '#location',
  },
  { icon: GiftIcon, activeIcon: GiftActiveIcon, label: 'Gift' },
]

const SECTION_IDS = NAV_ITEMS.filter((item) => item.href).map((item) =>
  item.href.slice(1),
)

function BottomNav() {
  const [activeId, setActiveId] = useState(SECTION_IDS[0])
  const isProgrammaticScroll = useRef(false)
  const scrollEndTimeout = useRef(null)

  useEffect(() => {
    const sections = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      Boolean,
    )
    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (isProgrammaticScroll.current) return

        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

        if (visible.length > 0) {
          setActiveId(visible[0].target.id)
        }
      },
      { rootMargin: '-35% 0px -55% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const clearScrollEndTimeout = () => clearTimeout(scrollEndTimeout.current)

    const handleScroll = () => {
      if (!isProgrammaticScroll.current) return
      clearScrollEndTimeout()
      scrollEndTimeout.current = setTimeout(() => {
        isProgrammaticScroll.current = false
      }, 150)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      clearScrollEndTimeout()
    }
  }, [])

  const handleClick = (event, href) => {
    if (!href) {
      event.preventDefault()
      return
    }
    const target = document.querySelector(href)
    if (target) {
      event.preventDefault()
      isProgrammaticScroll.current = true
      setActiveId(href.slice(1))
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })

      // Safety net in case no scroll event fires (already at the target).
      clearTimeout(scrollEndTimeout.current)
      scrollEndTimeout.current = setTimeout(() => {
        isProgrammaticScroll.current = false
      }, 1000)
    }
  }

  return (
    <nav className="fixed inset-x-0 bottom-4 z-30 flex justify-center px-6">
      <div className="flex items-center gap-2 rounded-xl bg-white px-3 py-2 shadow-xl backdrop-blur">
        {NAV_ITEMS.map(({ icon: Icon, activeIcon: ActiveIcon, label, href }) => {
          const isActive = href ? href.slice(1) === activeId : false
          const IconComponent = isActive ? ActiveIcon : Icon

          return (
            <a
              key={label}
              href={href ?? '#'}
              aria-label={label}
              aria-current={isActive ? 'true' : undefined}
              onClick={(event) => handleClick(event, href)}
              className={`flex h-10 w-10 items-center justify-center rounded-full transition-colors`}
            >
              <IconComponent className="h-5 w-5" />
            </a>
          )
        })}
      </div>
    </nav>
  )
}

export default BottomNav
