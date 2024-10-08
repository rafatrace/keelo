import { signOut } from '@/firebase/auth'
import { useAuth } from '@/providers/AuthProvider'
import Unauthenticated from './unauthenticated'

const Main = () => {
  // Services
  const { userLoggedIn, currentUser } = useAuth()
  return (
    <div>
      {!userLoggedIn ? (
        <Unauthenticated />
      ) : (
        <div>
          <h2>Hello world</h2>
          <h2>{currentUser.displayName}</h2>
          <button onClick={signOut}>Sign out</button>
        </div>
      )}
    </div>
  )
}

export default Main
