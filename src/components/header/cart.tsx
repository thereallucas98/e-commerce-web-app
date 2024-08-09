import { ShoppingBag, ShoppingBasket } from 'lucide-react'
import { useMemo } from 'react'

import { useAppSelector } from '~/redux/store'
import { formatCurrency } from '~/utils/formatter/currency'

import { CartItem } from './cart-item'

export function Cart() {
  const cart = useAppSelector((state) => state.cart.currentOrder)

  const totalAmount = useMemo(() => {
    if (cart && cart?.length > 0) {
      const totalAmount = cart.reduce((acc, item) => {
        const currentPrice = parseFloat(item.product.valor.split('$')[1])

        acc += currentPrice
        return acc
      }, 0)

      return totalAmount
    }

    return 0
  }, [cart])

  return (
    <div className="dropdown">
      <button
        className="btn text-light"
        type="button"
        id="cartSummary"
        data-bs-toggle="dropdown"
        aria-expanded="false"
        aria-haspopup="true"
      >
        <ShoppingBag size={24} />
        {cart && cart?.length > 0 && (
          <span className="badge text-light">{cart?.length}</span>
        )}
      </button>
      <section
        className="dropdown-menu h-auto bg-dark"
        style={{
          width: 300,
          marginRight: 0,
        }}
        aria-labelledby="cartSummary"
      >
        {cart && cart?.length > 0 ? (
          <div className="flex gap-2 px-2">
            {cart.map((cItem) => (
              <CartItem key={cItem.id} item={cItem} />
            ))}

            <div className="flex pt-2 border-t border-t-light">
              <span className="text-light d-flex align-items-center justify-content-between mb-2">
                Total{' '}
                <strong>
                  {formatCurrency(totalAmount ?? 0, 'us-EN', 'usd')}
                </strong>
              </span>
              <button
                className="btn bg-light text-dark container"
                type="button"
              >
                Checkout
              </button>
            </div>
          </div>
        ) : (
          <div className="d-flex flex-column align-items-center justify-content-center w-100 h-100 mt-4 gap-2 mb-4">
            <ShoppingBasket className="text-light" size={32} />
            <span className="fs-6 text-center fw-bold text-light">
              You still do not have items in your cart
            </span>
          </div>
        )}
      </section>
    </div>
  )
}
