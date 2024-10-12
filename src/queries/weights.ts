import { db } from '@/firebase/firebase'
import { addDoc, collection, deleteDoc, doc, getDocs, orderBy, query, Timestamp, where } from 'firebase/firestore'

/**
 * Get all weights from a user
 */
export const getAllWeights = async (uid: string): Promise<TWeight[]> => {
  const q = query(collection(db, 'weights'), where('ownerId', '==', uid), orderBy('date', 'asc'))
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
 * Add a new weight in database
 */
export const addWeight = async (value: string, ownerId: string) => {
  await addDoc(collection(db, 'weights'), {
    ownerId,
    value: parseFloat(value),
    date: Timestamp.fromDate(new Date())
  })
}

/**
 * Delete a specific weight in database
 */
export const deleteWeight = async (id: string) => {
  await deleteDoc(doc(db, 'weights', id))
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
