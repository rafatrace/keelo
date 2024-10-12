import Form from '@/components/Form'
import Header from '@/components/Header'
import { useAuth } from '@/providers/AuthProvider'
import { getAllWeights, TWeight } from '@/queries/weights'
import { convertDateToDotFormat } from '@/utils/dates'
import { useEffect, useState } from 'react'
import WeightChart from '@/components/WeightChart'
import WeightTable from '@/components/WeightTable'

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

      <WeightChart
        data={weights.map((w) => {
          return { name: convertDateToDotFormat(w.date), Weight: w.value }
        })}
      />

      <WeightTable data={weights} fetchAllWeights={fetchAllWeights} />
    </main>
  )
}

export default Authenticated
