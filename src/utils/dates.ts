import { Timestamp } from 'firebase/firestore'

/**
 * Convert Firestore date to dot format
 */
export const convertDateToDotFormat = (date: Timestamp): string => {
  return date
    .toDate()
    .toLocaleDateString('en-CA', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    })
    .replace(/-/g, '.')
}

/**
 * Convert Firestore date to readable text
 */
export const convertDateToReadableText = (date: Timestamp): string => {
  const d = date.toDate()
  const day = d.getDate()
  const suffix = getOrdinalSuffix(day)
  const monthYear = date.toDate().toLocaleDateString('en-gb', {
    month: 'long',
    year: 'numeric'
  })

  return `${day}${suffix} ${monthYear}`
}

/**
 * Get suffix for days in dates
 */
function getOrdinalSuffix(day) {
  if (day > 3 && day < 21) return 'th' // 4-20 end with "th"
  switch (day % 10) {
    case 1:
      return 'st'
    case 2:
      return 'nd'
    case 3:
      return 'rd'
    default:
      return 'th'
  }
}
