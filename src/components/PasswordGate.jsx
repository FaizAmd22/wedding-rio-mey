import { useState } from 'react'

const SESSION_KEY = 'admin-authenticated'

function PasswordGate({ children }) {
  const [authenticated, setAuthenticated] = useState(
    () => sessionStorage.getItem(SESSION_KEY) === 'true',
  )
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()
    if (password === import.meta.env.VITE_ADMIN_PASSWORD) {
      sessionStorage.setItem(SESSION_KEY, 'true')
      setAuthenticated(true)
      setError(false)
    } else {
      setError(true)
    }
  }

  if (authenticated) return children

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-6">
      <form
        onSubmit={handleSubmit}
        className="flex w-full max-w-xs flex-col gap-3 rounded-xl bg-white p-6 shadow-md"
      >
        <p className="text-center text-lg font-semibold text-gray-800">
          Admin Access
        </p>
        <input
          type="password"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value)
            setError(false)
          }}
          placeholder="Password"
          autoFocus
          className="rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-500"
        />
        {error && <p className="text-xs text-red-500">Password salah</p>}
        <button
          type="submit"
          className="cursor-pointer rounded-md bg-gray-900 px-4 py-2 text-sm text-white"
        >
          Masuk
        </button>
      </form>
    </div>
  )
}

export default PasswordGate
