export function isCurrentDate(nanoseconds: number, seconds: number): boolean {
  const timestampInMilliseconds = seconds * 1000 + nanoseconds / 1e6

  const providedDate = new Date(timestampInMilliseconds)

  const currentDate = new Date()

  const isEqual = providedDate.getDate() === currentDate.getDate()

  return isEqual
}
