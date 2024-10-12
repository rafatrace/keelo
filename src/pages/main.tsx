import { useAuth } from '@/providers/AuthProvider'
import Unauthenticated from './unauthenticated'
import Authenticated from './authenticated'
import { useTheme } from '@/providers/ThemeProvider'

const Main = () => {
  // Services
  const { userLoggedIn } = useAuth()
  const { theme } = useTheme()

  return (
    <div id="page" className={theme === 'dark' ? 'dark-mode' : 'light-mode'}>
      {!userLoggedIn ? <Unauthenticated /> : <Authenticated />}
    </div>
  )
}

export default Main
