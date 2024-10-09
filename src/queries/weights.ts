import { db } from '@/firebase/firebase'
import { collection, getDocs, query, Timestamp, where } from 'firebase/firestore'

/**
 * Get all weights from a user
 */
export const getAllWeights = async (uid: string): Promise<TWeight[]> => {
  const q = query(collection(db, 'weights'), where('ownerId', '==', uid))
  const querySnapshot = await getDocs(q)

  const dataArray = []

  querySnapshot.forEach((doc) => {
    dataArray.push({
      id: doc.id,
      ...doc.data()
    })
  })

  return dataArray
}

/**
 * Types
 */
export type TWeight = {
  id: string
  date: Timestamp
  ownerId: string
  value: number
}
