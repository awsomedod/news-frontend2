import { useEffect, useState } from 'react'
import AuthSystem from './components/AuthScreen'
import Dashboard from './components/DashboardScreen'

function isJwtExpired(token) {
  try {
    const [, payloadB64] = token.split('.')
    if (!payloadB64) return true
    const payload = JSON.parse(atob(payloadB64.replace(/-/g, '+').replace(/_/g, '/')))
    if (!payload.exp) return false
    const nowSec = Math.floor(Date.now() / 1000)
    return payload.exp <= nowSec
  } catch {
    return true
  }
}

function App() {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    // Hydrate from localStorage on first load
    try {
      const token = localStorage.getItem('auth_token')
      const userJson = localStorage.getItem('auth_user')
      if (token && userJson) {
        if (!isJwtExpired(token)) {
          const parsed = JSON.parse(userJson)
          setUser({ ...parsed, token })
          setIsAuthenticated(true)
        } else {
          // Expired token, clear persisted auth
          localStorage.removeItem('auth_token')
          localStorage.removeItem('auth_user')
        }
      }
    } catch {
      // ignore hydration errors
    }
  }, [])

  const handleAuthenticated = (userData) => {
    setUser(userData)
    setIsAuthenticated(true)
  }

  const handleLogout = () => {
    // Clear persistence
    localStorage.removeItem('auth_token')
    localStorage.removeItem('auth_user')
    setUser(null)
    setIsAuthenticated(false)
  }

  return (
    <div className="min-h-screen">
      {!isAuthenticated ? (
        <AuthSystem onAuthenticated={handleAuthenticated} />
      ) : (
        <Dashboard user={user} onLogout={handleLogout} />
      )}
    </div>
  )
}

export default App
