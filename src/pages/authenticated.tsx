import { signOut } from '@/firebase/auth'
import { useAuth } from '@/providers/AuthProvider'
import { addWeight, getAllWeights, TWeight } from '@/queries/weights'
import { convertFirestoreDateToReadable } from '@/utils/dates'
import { FormEvent, useEffect, useState } from 'react'

const Authenticated = () => {
  // Services
  const { currentUser } = useAuth()

  // Local state
  const [weights, setWeights] = useState<TWeight[]>([])
  const [weight, setWeight] = useState<string>('')

  // Run on first loading
  useEffect(() => {
    fetchAllWeights()
  }, [])

  /**
   * Get all weights from firebase
   */
  const fetchAllWeights = async () => {
    const data = await getAllWeights(currentUser.uid)
    setWeights(data)
  }

  /**
   * Add new weight to firebase
   */
  const saveNewWeight = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await addWeight(weight, currentUser.uid)
    fetchAllWeights()
    setWeight('')
  }

  return (
    <div>
      <h2>
        Hello world <u>{currentUser.displayName}</u>
      </h2>

      <form onSubmit={saveNewWeight}>
        <input type="text" value={weight}  onChange={(e) => setWeight(e.target.value)} />
        <button>Save</button>
      </form>

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
