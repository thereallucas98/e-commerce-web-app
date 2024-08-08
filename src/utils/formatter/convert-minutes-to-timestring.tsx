export function convertMinutesToTimeString(minutes: number) {
  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60
  const paddedHours = String(hours).padStart(2, '0')
  const paddedMinutes = String(remainingMinutes).padStart(2, '0')

  return `${paddedHours}:${paddedMinutes}`
}
