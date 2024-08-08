import { Item } from '~/models/order-admin.model'
import { orderMeatMapperType } from '~/utils/mappers/order'

export function clipboardOrder(orderItems: Item[]): string {
  const itemsList = orderItems.map((item) => {
    const aditional = item.aditionals
      .filter((afNo) => afNo.amount !== 0)
      .map(
        (af, index) => `#${index + 1}:\n${af.name}\nQuantidade: ${af.amount}\n`,
      )
      .join(' ')

    return `${item.name} (${item.quantity}x) ${
      item.typeOfMeal === 'food' && orderMeatMapperType[item.type]
    }- \nAdicionais:\n${aditional}\n${item.note && `Observação: ${item.note}`}`
  })

  return `Itens do Pedido:\n${itemsList.join('\n==================\n')}`
}
