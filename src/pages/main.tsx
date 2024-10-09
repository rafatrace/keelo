import { useAuth } from '@/providers/AuthProvider'
import Unauthenticated from './unauthenticated'
import Authenticated from './authenticated'

const Main = () => {
  // Services
  const { userLoggedIn } = useAuth()

  return <div>{!userLoggedIn ? <Unauthenticated /> : <Authenticated />}</div>
}

export default Main
