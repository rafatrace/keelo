import { Timestamp } from 'firebase/firestore'

export const convertFirestoreDateToReadable = (date: Timestamp): string => {
  return date
    .toDate()
    .toLocaleDateString('en-CA', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    })
    .replace(/-/g, '.')
}
