import { createContext, useContext, useEffect, useState } from 'react'

const LanguageContext = createContext(null)

const STORAGE_KEY = 'wedding-language'

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    if (typeof window === 'undefined') return 'id'
    return localStorage.getItem(STORAGE_KEY) === 'en' ? 'en' : 'id'
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, language)
  }, [language])

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
