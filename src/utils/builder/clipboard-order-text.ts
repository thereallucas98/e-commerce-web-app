import { Order } from '~/models/order-admin.model'

import { formatCurrency } from '../formatter/currency'

function getPaymentLabel(payment: string) {
  switch (payment) {
    case 'pix':
      return 'PIX'
    case 'money':
      return 'Dinheiro'
    case 'deliverycard':
      return 'Cartão'
    default:
      break
  }
}

export function formatOrderText(data: Order) {
  const totalAmount = data.items?.reduce((acc: number, item) => {
    const aditionalAmount = item.aditionals?.reduce((adt, add) => {
      adt += add.amount * add.price

      return adt
    }, 0)

    const beveragesAmount = item.beverage?.reduce((abv, bev) => {
      abv += bev.amount * bev.price

      return abv
    }, 0)

    const sum =
      (aditionalAmount + beveragesAmount + item.amount) * item.quantity

    acc += sum + (item.typeOfMeal === 'combo' ? 0 : item.hasCombo ? 15 : 0)

    return acc
  }, 0)

  const itemsText = data.items.map((item) => {
    const aditionals = item.aditionals
      .filter((ad) => ad.amount > 0)
      .map(
        (add) =>
          ` -${add.amount}x - ${add.name} R$ ${formatCurrency(add.amount * add.price, 'pt-BR', 'brl')}`,
      )
      .join('\n')
    const beverages = item.beverage
      .filter((bv) => bv.amount > 0)
      .map(
        (bev) =>
          ` -${bev.amount}x - ${bev.name} R$ ${formatCurrency(bev.amount * bev.price, 'pt-BR', 'brl')}`,
      )
      .join('\n')

    const aditionalAmount = item.aditionals?.reduce((adt, add) => {
      adt += add.amount * add.price

      return adt
    }, 0)

    const beveragesAmount = item.beverage?.reduce((abv, bev) => {
      abv += bev.amount * bev.price

      return abv
    }, 0)

    return `
      ${item.quantity}x ${item.name} ${item.quantity > 1 ? `(${formatCurrency(item.amount, 'pt-br', 'brl')}) - ${formatCurrency(item.amount * item.quantity, 'pt-br', 'brl')}` : `${formatCurrency(item.amount, 'pt-br', 'brl')}`}
      ${item.hasCombo ? `${item.note}\n` : ''}
      ${aditionals}
      ${beverages}
      Subtotal do item: R$ ${formatCurrency(item.amount * item.quantity + (item.hasCombo ? 15 : 0) + aditionalAmount + beveragesAmount, 'pt-BR', 'brl')}
      -  -  -  -  -  -  -  -  -  -  -
    `
  })

  const orderStatusLink = `https://maxburguerjp.com.br/order-status/${data.id}`

  return `
      -----------------------------
      ▶️ RESUMO DO PEDIDO 

      Pedido #${data.id}

      Link para acompanhar status do pedido:
      ${orderStatusLink}

      ${itemsText}

      SUBTOTAL: R$ ${totalAmount}

      ------------------------------------------
      ▶️ Dados para ${data.type === 'delivery' ? 'Entrega' : 'Retirada'} 
      
      Nome: ${data.customer.name}
      ${data.type === 'delivery' ? `Endereço: ${data.customer.address}` : 'Retirada na Max Burguer'}
      Telefone: ${data.customer.phone}

      ${data.type === 'delivery' ? `Taxa de Entrega: R$ ${formatCurrency(data.feeValue, 'pt-BR', 'brl')}` : 'Sem taxa'}

      🕙 Tempo de ${data.type === 'delivery' ? 'Entrega' : 'Retirada'}: aprox. 40m a 1h

      ------------------------------- 
      ▶️ TOTAL = ${formatCurrency(totalAmount + data.feeValue, 'pt-BR', 'brl')}
      ------------------------------ 

      ▶️ PAGAMENTO 
      
      ${getPaymentLabel(data.cashType)}
  `
}
