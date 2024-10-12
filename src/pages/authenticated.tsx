import Form from '@/components/Form'
import Header from '@/components/Header'
import { useAuth } from '@/providers/AuthProvider'
import { getAllWeights, TWeight } from '@/queries/weights'
import { convertFirestoreDateToReadable } from '@/utils/dates'
import { useEffect, useState } from 'react'
import WeightChart from '@/components/WeightChart'

const Authenticated = () => {
  // Services
  const { currentUser } = useAuth()

  // Local state
  const [weights, setWeights] = useState<TWeight[]>([])

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

  return (
    <main>
      <Header />
      <Form fetchAllWeights={fetchAllWeights} />

      <div>
        <WeightChart
          data={weights.map((w) => {
            return { name: convertFirestoreDateToReadable(w.date), Weight: w.value }
          })}
        />
      </div>
    </main>
  )
}

export default Authenticated
