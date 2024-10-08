import { auth } from '@/firebase/firebase'
import { onAuthStateChanged, User } from 'firebase/auth'
import { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  // Local state
  const [currentUser, setCurrentUser] = useState<User>(null)
  const [userLoggedIn, setUserLoggedIn] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, initializeUser)
    return unsubscribe
  }, [])

  /**
   * Load or fetch user
   */
  const initializeUser = async (user: User) => {
    if (user) {
      setCurrentUser({ ...user })
      setUserLoggedIn(true)
    } else {
      setCurrentUser(null)
      setUserLoggedIn(false)
    }
    setLoading(false)
  }

  const value = {
    currentUser,
    userLoggedIn,
    loading
  }

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext)
}
