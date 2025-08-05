import { useState } from 'react'
import { Transition } from '@headlessui/react'
import Login from './Login'
import SignUp from './SignUp'

export default function AuthSystem({ onAuthenticated }) {
  const [currentView, setCurrentView] = useState('login') // 'login' or 'signup'
  const [user, setUser] = useState(null)

  const handleLogin = (loginData) => {
    // Simulate successful login
    const userData = {
      id: 1,
      email: loginData.email,
      firstName: 'John',
      lastName: 'Doe',
      loginMethod: 'login'
    }
    setUser(userData)
    onAuthenticated(userData)
  }

  const handleSignUp = (signupData) => {
    // Simulate successful signup
    const userData = {
      id: Date.now(),
      email: signupData.email,
      firstName: signupData.firstName,
      lastName: signupData.lastName,
      loginMethod: 'signup'
    }
    setUser(userData)
    onAuthenticated(userData)
  }

  const switchToLogin = () => {
    setCurrentView('login')
  }

  const switchToSignup = () => {
    setCurrentView('signup')
  }

  return (
    <div className="relative overflow-hidden">
      <Transition
        show={currentView === 'login'}
        enter="transition-transform duration-300 ease-in-out"
        enterFrom="transform translate-x-full"
        enterTo="transform translate-x-0"
        leave="transition-transform duration-300 ease-in-out"
        leaveFrom="transform translate-x-0"
        leaveTo="transform -translate-x-full"
      >
        <div className={currentView === 'login' ? 'block' : 'hidden'}>
          <Login 
            onSwitchToSignup={switchToSignup}
            onLogin={handleLogin}
          />
        </div>
      </Transition>

      <Transition
        show={currentView === 'signup'}
        enter="transition-transform duration-300 ease-in-out"
        enterFrom="transform translate-x-full"
        enterTo="transform translate-x-0"
        leave="transition-transform duration-300 ease-in-out"
        leaveFrom="transform translate-x-0"
        leaveTo="transform -translate-x-full"
      >
        <div className={currentView === 'signup' ? 'block' : 'hidden'}>
          <SignUp 
            onSwitchToLogin={switchToLogin}
            onSignUp={handleSignUp}
          />
        </div>
      </Transition>
    </div>
  )
}