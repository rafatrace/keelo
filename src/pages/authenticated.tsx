import LineChart from '@/components/Chart'
import Form from '@/components/Form'
import Header from '@/components/Header'
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

      <div style={{ maxWidth: '700px' }}>
        <LineChart
          labels={weights.map((w) => convertFirestoreDateToReadable(w.date))}
          values={weights.map((w) => w.value)}
        />
      </div>
    </main>
  )
}

export default Authenticated
