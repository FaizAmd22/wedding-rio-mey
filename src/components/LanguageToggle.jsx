import { useEffect, useRef, useState } from 'react'
import { Check, Languages } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

const OPTIONS = [
  { code: 'id', label: 'Indonesia' },
  { code: 'en', label: 'English' },
]

function LanguageToggle() {
  const { language, setLanguage } = useLanguage()
  const [open, setOpen] = useState(false)
  const containerRef = useRef(null)

  useEffect(() => {
    if (!open) return

    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [open])

  return (
    <div ref={containerRef} className="fixed bottom-5 left-3 z-40">
      {open && (
        <div className="absolute bottom-14 left-0 flex w-40 flex-col overflow-hidden rounded-xl bg-white shadow-xl">
          {OPTIONS.map((option) => (
            <button
              key={option.code}
              type="button"
              onClick={() => {
                setLanguage(option.code)
                setOpen(false)
              }}
              className="font-elegant flex cursor-pointer items-center justify-between px-4 py-3 text-sm text-(--black-color) transition-colors hover:bg-[#f4c9d9]/40"
            >
              {option.label}
              {language === option.code && (
                <Check className="h-4 w-4 text-(--primary-color)" />
              )}
            </button>
          ))}
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-label="Change language"
        aria-expanded={open}
        className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-white text-(--black-color) shadow-xl"
      >
        <Languages className="h-4 w-4 text-(--primary-color)" />
      </button>
    </div>
  )
}

export default LanguageToggle
