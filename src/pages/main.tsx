import { useAuth } from '@/providers/AuthProvider'
import Unauthenticated from './unauthenticated'
import Authenticated from './authenticated'
import { useTheme } from '@/providers/ThemeProvider'
import { Helmet } from 'react-helmet-async'

const Main = () => {
  // Services
  const { userLoggedIn } = useAuth()
  const { theme } = useTheme()

  return (
    <>
      <Helmet>
        <meta name="theme-color" content={theme === 'dark' ? '#000000' : '#FFFFFF'} />
      </Helmet>
      <div id="page">{!userLoggedIn ? <Unauthenticated /> : <Authenticated />}</div>
    </>
  )
}

export default Main
