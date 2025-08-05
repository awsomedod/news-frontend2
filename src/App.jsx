import { useState } from 'react'
import AuthSystem from './components/AuthSystem'
import Dashboard from './components/Dashboard'

function App() {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const handleAuthenticated = (userData) => {
    setUser(userData)
    setIsAuthenticated(true)
  }

  const handleLogout = () => {
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
