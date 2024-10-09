import { signOut } from '@/firebase/auth'
import { useAuth } from '@/providers/AuthProvider'
import { getAllWeights, TWeight } from '@/queries/weights'
import { convertFirestoreDateToReadable } from '@/utils/dates'
import { useEffect, useState } from 'react'

const Authenticated = () => {
  // Services
  const { currentUser } = useAuth()

  // Local state
  const [weights, setWeights] = useState<TWeight[]>([])

  // Run on first loading
  useEffect(() => {
    fetchAllWeights()
  }, [])

  // my user: 9odOal4cEcU3XLiOiB8P1F400i82
  const fetchAllWeights = async () => {
    const data = await getAllWeights(currentUser.uid)
    setWeights(data)
  }

  return (
    <div>
      <h2>
        Hello world <u>{currentUser.displayName}</u>
      </h2>

      <ul>
        {weights.map((w) => (
          <li key={w.id}>
            <p>
              <strong>Value:</strong> {w.value}
            </p>
            <p>
              <strong>Date:</strong> {convertFirestoreDateToReadable(w.date)}
            </p>
          </li>
        ))}
      </ul>

      <button onClick={signOut}>Sign out</button>
    </div>
  )
}

export default Authenticated
