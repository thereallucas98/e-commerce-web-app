import { format } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

export function convertOrderDateToString(orderDateSeconds: number) {
  const orderDate = new Date(orderDateSeconds * 1000)

  const formattedDate = format(orderDate, 'dd, MMM ~ HH:mm', {
    locale: ptBR,
  })

  return formattedDate
}
