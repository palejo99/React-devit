import { useEffect, useState } from "react"
import { formatDate } from "./useDateTimeFormat"

const isRelativeTimeFormatSupported =
  typeof Intl !== "undefined" && Intl.RelativeTimeFormat

const DATE_UNITS = [
  ["day", 86400],
  ["hour", 3600],
  ["minute", 60],
  ["second", 1],
]

const getDateDiffs = (timestamp) => {
  const now = Date.now()
  const elapsed = (timestamp - now) / 1000 // se divide entre mil para eliminar los milisegundos

  for (const [unit, secondsInUnit] of DATE_UNITS) {
    if (Math.abs(elapsed) > secondsInUnit || unit === "second") {
      const value = Math.round(elapsed / secondsInUnit)
      return { value, unit }
    }
  }
}
export default function useTimeAgo(timestamp) {
  const [timeago, setTimeago] = useState(() => getDateDiffs(timestamp))
  useEffect(() => {
    if (isRelativeTimeFormatSupported) {
      const interval = setInterval(() => {
        const newTimeAgo = getDateDiffs(timestamp)
        setTimeago(newTimeAgo)
      }, 5000)

      return () => clearInterval(interval)
    }
  }, [timestamp])

  // Si no es compatible
  if (!isRelativeTimeFormatSupported) {
    return formatDate(timestamp)
  }

  const rtf = new Intl.RelativeTimeFormat("es", { style: "short" })
  const { value, unit } = timeago

  // console.log(value, unit)
  return rtf.format(value, unit)
}
