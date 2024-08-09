import { ShoppingBag, ShoppingBasket } from 'lucide-react'

import { useAppSelector } from '~/redux/store'

import { CartItem } from './cart-item'

export function Cart() {
  const cart = useAppSelector((state) => state.cart.currentOrder)

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
        className="dropdown-menu bg-dark"
        style={{
          width: 300,
          marginRight: 0,
        }}
        aria-labelledby="cartSummary"
      >
        {cart && cart?.length > 0 ? (
          cart.map((cItem) => <CartItem key={cItem.id} item={cItem} />)
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
