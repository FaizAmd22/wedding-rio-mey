import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import LetterPage from './pages/letter_page.jsx'
import HomePage from './pages/home_page.jsx'
import SendingInvitationPage from './pages/sending_invitation_page.jsx'

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
    <Routes>
      <Route path="/" element={<RootRedirect />} />
      <Route path="/wedding-rio-and-mey" element={<LetterPage />} />
      <Route path="/wedding-rio-and-mey/home" element={<HomePage />} />
      <Route
        path="/wedding-rio-and-mey/sending-invitation"
        element={<SendingInvitationPage />}
      />
    </Routes>
  )
}

export default App
