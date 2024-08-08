import { endOfMonth, startOfMonth } from 'date-fns'

export function getCurrentMonthRange() {
  const currentDate = new Date()
  const startOfMonthDate = startOfMonth(currentDate)
  const endOfMonthDate = endOfMonth(currentDate)

  return {
    startOfMonth: startOfMonthDate,
    endOfMonth: endOfMonthDate,
  }
}
