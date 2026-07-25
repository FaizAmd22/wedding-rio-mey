import { useEffect, useRef, useState } from 'react'
import Loading from './loading'

const MAX_WAIT_MS = 8000

function collectAssetUrls(container) {
  const urls = new Set()

  container.querySelectorAll('img').forEach((img) => {
    if (img.src) urls.add(img.src)
  })

  container.querySelectorAll('*').forEach((el) => {
    const bg = getComputedStyle(el).backgroundImage
    const match = bg.match(/url\(["']?(.*?)["']?\)/)
    if (match && match[1] && !match[1].startsWith('data:')) {
      urls.add(match[1])
    }
  })

  return [...urls]
}

function preloadImage(url) {
  return new Promise((resolve) => {
    const img = new Image()
    img.onload = resolve
    img.onerror = resolve
    img.src = url
  })
}

function PageLoader({ children }) {
  const containerRef = useRef(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    let cancelled = false
    const node = containerRef.current
    if (!node) return

    const urls = collectAssetUrls(node)
    const loadPromise = Promise.all(urls.map(preloadImage))
    const timeoutPromise = new Promise((resolve) =>
      setTimeout(resolve, MAX_WAIT_MS),
    )

    Promise.race([loadPromise, timeoutPromise]).then(() => {
      if (!cancelled) setReady(true)
    })

    return () => {
      cancelled = true
    }
  }, [])

  return (
    <div ref={containerRef} className="contents">
      {!ready && (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-white">
          <Loading />
        </div>
      )}
      {children}
    </div>
  )
}

export default PageLoader
