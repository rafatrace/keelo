import { db } from '@/firebase/firebase'
import { addDoc, collection, doc, getDocs, query, setDoc, Timestamp, where } from 'firebase/firestore'

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
 * Add a new weight in database
 */
export const addWeight = async (value: string, ownerId: string) => {
  await addDoc(collection(db, "weights"), {
    ownerId,
    value,
    date: Timestamp.fromDate(new Date())
  });
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
