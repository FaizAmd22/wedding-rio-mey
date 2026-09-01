import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'

// Dipisah per route: halaman sampul tidak perlu ikut memuat Firebase (dipakai
// RSVP & ucapan di home) maupun Leaflet (peta), yang bersama-sama mendominasi
// ukuran bundle.
const LetterPage = lazy(() => import('./pages/letter_page.jsx'))
const HomePage = lazy(() => import('./pages/home_page.jsx'))
const SendingInvitationPage = lazy(
  () => import('./pages/sending_invitation_page.jsx'),
)

function RootRedirect() {
  const location = useLocation()
  return (
    <Navigate
      to={{ pathname: '/wedding-rio-and-mey', search: location.search }}
      replace
    />
  )
}

function App() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#f5efe6]" />}>
      <Routes>
        <Route path="/" element={<RootRedirect />} />
        <Route path="/wedding-rio-and-mey" element={<LetterPage />} />
        <Route path="/wedding-rio-and-mey/home" element={<HomePage />} />
        <Route
          path="/wedding-rio-and-mey/sending-invitation"
          element={<SendingInvitationPage />}
        />
      </Routes>
    </Suspense>
  )
}

export default App
