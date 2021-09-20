import { useEffect, useState } from 'react'

const DATE_UNITS = [
  ['day', 86400],
  ['hour', 3600],
  ['minute', 60],
  ['second', 1]
]

const getDateDiffs = (ts) => {
  const now = Date.now()
  const timestamp = new Date(ts)
  const elapsed = (timestamp - now) / 1000

  for (const [unit, secondsInUnit] of DATE_UNITS) {
    if (Math.abs(elapsed) > secondsInUnit || unit === 'second') {
      const value = Math.round(elapsed / secondsInUnit)
      return { value, unit }
    }
  }
}

export default function useTimeAgo(timestamp) {
  if (!timestamp) return null

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
