export function convertTimeTo24HoursFormat(time: string): string {
  const hour = parseInt(time)
  const indicator = time.slice(-2).toLowerCase()

  let hour24 = hour
  if (indicator === 'pm') {
    hour24 += 12
  }

  const formattedHour = hour24.toString().padStart(2, '0')

  return `às ${formattedHour}h`
}
