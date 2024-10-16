import { createContext, useContext, useEffect, useState } from 'react'
import { useAuth } from './AuthProvider'
import { createSettings, getUserSettings, updateDarkMode } from '@/queries/settings'

const ThemeContext = createContext(null)

export type TTheme = 'dark' | 'light'

export function ThemeProvider({ children }) {
  // Session
  const { currentUser, settingsId, setSettingsId } = useAuth()

  // Local state
  const [theme, setTheme] = useState<TTheme>(null)

  useEffect(() => {
    const t = localStorage.getItem('theme') as TTheme
    if (t != null) {
      setTheme(t)
    }
  }, [])

  useEffect(() => {
    if (theme != null) {
      localStorage.setItem('theme', theme)
      if (theme === 'dark') {
        document.body.classList.add('dark-mode')
      } else {
        document.body.classList.remove('dark-mode')
      }
    }
  }, [theme])

  useEffect(() => {
    if (currentUser?.uid != null) {
      getSettings(currentUser.uid)
    }
  }, [currentUser])

  const getSettings = async (uid: string) => {
    const data = await getUserSettings(uid)
    setSettingsId(data.id)
    if (data.darkMode) {
      setTheme('dark')
    } else {
      setTheme('light')
    }
  }

  /**
   * Toggle theme
   */
  const toggleTheme = () => {
    let darkMode = false
    if (theme === 'dark') {
      setTheme('light')
    } else {
      setTheme('dark')
      darkMode = true
    }

    // Create or update
    if (settingsId == null) {
      createSettings({
        userId: currentUser.uid,
        height: '',
        age: '',
        gender: 'female',
        darkMode
      })
    } else {
      updateDarkMode(settingsId, darkMode)
    }
  }

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  return useContext(ThemeContext)
}
