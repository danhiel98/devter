import { useEffect, useState } from 'react'

const DATE_UNITS = [
  ['day', 86400],
  ['hour', 3600],
  ['minute', 60],
  ['second', 1]
]

// const getDateDiffs = (timestamp) => {
//   const now = Date.now()
//   const elapsed = (timestamp - now) / 1000

//   for (const [unit, secondsInUnit] of DATE_UNITS) {
//     if (Math.abs(elapsed) > secondsInUnit || unit === 'second') {
//       const value = Math.floor(elapsed / secondsInUnit)
//       return { value, unit }
//     }
//   }
// }

// export default function useTimeAgo(timestamp) {
//   const [timeAgo, setTimeAgo] = useState(() => getDateDiffs(timestamp))

//   useEffect(() => {
//     const interval = setInterval(() => {
//       const newTimeAgo = getDateDiffs(timestamp)
//       setTimeAgo(newTimeAgo)
//     }, 1000)

//     return () => clearTimeout(interval)
//   }, [timestamp])
//   const rtf = new Intl.RelativeTimeFormat('es', { style: 'short' })
//   const { value, unit } = timeAgo

//   return rtf.format({ value, unit })
// }

const getDateDiffs = (timestamp) => {
  console.log('getDateDiffs')
  const now = Date.now()
  const elapsed = (timestamp - now) / 1000

  for (const [unit, secondsInUnit] of DATE_UNITS) {
    if (Math.abs(elapsed) > secondsInUnit || unit === 'second') {
      const value = Math.round(elapsed / secondsInUnit)
      return { value, unit }
    }
  }
}

export default function useTimeAgo(timestamp) {
  const [timeAgo, setTimeago] = useState(() => getDateDiffs(timestamp))

  useEffect(() => {
    const interval = setInterval(() => {
      const newTimeAgo = getDateDiffs(timestamp)
      setTimeago(newTimeAgo)
    }, 60000)

    return () => clearInterval(interval)
  }, [timestamp])

  const rtf = new Intl.RelativeTimeFormat('es', { style: 'short' })

  const { value, unit } = timeAgo

  return rtf.format(value, unit)
}
