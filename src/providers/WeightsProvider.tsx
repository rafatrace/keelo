import { addWeight, getAllWeights, TWeight } from '@/queries/weights'
import { createContext, useContext, useEffect, useState } from 'react'
import { useAuth } from './AuthProvider'
import { Timestamp } from 'firebase/firestore'

const WeightsContext = createContext(null)

export function WeightsProvider({ children }) {
  // Services
  const { currentUser } = useAuth()

  // Local state
  const [weights, setWeights] = useState<TWeight[]>([])

  useEffect(() => {
    if (currentUser?.uid != null) {
      fetchWeights()
    }
  }, [currentUser])

  /**
   * Fetch weights
   */
  const fetchWeights = async () => {
    const data = await getAllWeights(currentUser.uid)
    setWeights(data)
  }

  /**
   * Optimistally add weight by first adding it to context
   * and then in firebase
   */
  const addWeightOptimistically = async (value: string, ownerId: string) => {
    // Add to context
    const weightsClone = weights.slice()
    weightsClone.push({
      id: 'temp',
      date: Timestamp.fromDate(new Date()),
      ownerId,
      value: parseFloat(value)
    })

    // Add to firebase
    await addWeight(value, ownerId)

    // Refetch
    fetchWeights()
  }

  return (
    <WeightsContext.Provider value={{ weights, addWeightOptimistically, fetchWeights }}>
      {children}
    </WeightsContext.Provider>
  )
}

export function useWeights() {
  return useContext(WeightsContext)
}
