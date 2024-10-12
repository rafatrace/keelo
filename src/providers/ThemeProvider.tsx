import { createContext, useContext, useEffect, useState } from 'react'

const ThemeContext = createContext(null)

export type TTheme = 'dark' | 'light'

export function ThemeProvider({ children }) {
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
    }
  }, [theme])

  /**
   * Toggle theme
   */
  const toggleTheme = () => {
    if (theme === 'dark') {
      setTheme('light')
    } else {
      setTheme('dark')
    }
  }

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  return useContext(ThemeContext)
}
