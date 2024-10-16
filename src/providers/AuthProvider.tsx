import { auth } from '@/firebase/firebase'
import { getUserSettings } from '@/queries/settings'
import { onAuthStateChanged, User } from 'firebase/auth'
import { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  // Local state
  const [currentUser, setCurrentUser] = useState<User>(null)
  const [userLoggedIn, setUserLoggedIn] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)
  const [settingsId, setSettingsId] = useState<string>('')
  const [height, setHeight] = useState<string>('')
  const [age, setAge] = useState<string>('')
  const [gender, setGender] = useState<'male' | 'female'>('female')

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

  useEffect(() => {
    if (currentUser?.uid != null) {
      fetchUserSettings()
    }
  }, [currentUser])

  /**
   * Fetch user settings
   */
  const fetchUserSettings = async () => {
    const data = await getUserSettings(currentUser.uid)
    if (data != null) {
      setHeight(data.height.toString())
      setAge(data.age.toString())
      setGender(data.gender)
      setSettingsId(data.id)
    }
  }

  const value = {
    currentUser,
    uid: currentUser?.uid,
    userLoggedIn,
    settingsId,
    setSettingsId,
    height,
    setHeight,
    age,
    setAge,
    gender,
    setGender,
    loading
  }

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext)
}
