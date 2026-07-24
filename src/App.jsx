import { Route, Routes } from 'react-router-dom'
import LetterPage from './pages/letter_page.jsx'
import HomePage from './pages/home_page.jsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<LetterPage />} />
      <Route path="/home" element={<HomePage />} />
    </Routes>
  )
}

export default App
