import { db } from '@/firebase/firebase'
import { collection, getDocs, limit, query, where, doc, updateDoc, addDoc } from 'firebase/firestore'

/**
 * Get settings from a user
 */
export const getUserSettings = async (uid: string): Promise<TSettings> => {
  const q = query(collection(db, 'settings'), where('userId', '==', uid), limit(1))
  const querySnapshot = await getDocs(q)

  let doc = null
  if (!querySnapshot.empty) {
    doc = querySnapshot.docs[0].data()
    doc.id = querySnapshot.docs[0].id
  } else {
    doc = {
      userId: '',
      age: '',
      height: '',
      darkMode: ''
    }
  }

  return doc
}

/**
 * Create settings for the first time
 */
export const createSettings = async (data: {
  userId: string
  height: number | string
  age: number | string
  gender: 'male' | 'female'
  darkMode: boolean
}) => {
  await addDoc(collection(db, 'settings'), data)
}

/**
 * Update settings
 */
export const updateSettings = async (id: string, data: { height: number; age: number; gender: 'male' | 'female' }) => {
  const docRef = doc(db, 'settings', id)
  await updateDoc(docRef, data)
}

/**
 * Update dark mode
 */
export const updateDarkMode = async (id: string, darkMode: boolean) => {
  const docRef = doc(db, 'settings', id)
  await updateDoc(docRef, { darkMode })
}

/**
 * Types
 */
export type TSettings = {
  id: string
  age: number
  darkMode: boolean
  gender: 'male' | 'female'
  height: number
  userId: string
}
