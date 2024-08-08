import { endOfDay, startOfDay, subDays } from 'date-fns'

export function getPastWeekRange() {
  const currentDate = new Date()
  const startOfWeek = startOfDay(subDays(currentDate, 7))
  const endOfWeek = endOfDay(currentDate)

  return {
    startOfWeek,
    endOfWeek,
  }
}
