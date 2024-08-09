import { Trash2 } from 'lucide-react'
import { useCallback } from 'react'

import { CartItem as CartItemModel, removeItem } from '~/redux/cart'
import { useAppDispatch } from '~/redux/store'

type CartItemProps = {
  item: CartItemModel
}

export function CartItem({ item }: CartItemProps) {
  const dispatch = useAppDispatch()

  const coverImg = item.product.fotos.find((pc) => pc.capa)

  const handleDeleteItemFromCart = useCallback(() => {
    dispatch(removeItem({ id: item.id }))
  }, [dispatch, item.id])

  return (
    <div className="px-2 py-1 d-flex gap-2 align-items-center justify-content-center">
      <img
        className="img-fluid rounded-1"
        style={{ width: 60, height: 60 }}
        src={coverImg?.url}
        alt={item.product.titulo}
      />
      <div>
        {/* TITULO */}
        <div className="d-flex gap-2 align-items-center justify-content-center">
          <span className="fs-6 fw-normal text-light">
            {item.product.titulo}
          </span>
          <span className="fs-5 fw-bold text-light">{item.product.valor}</span>
        </div>
        {/* CONFIG AND REMOVE */}
        <div className="d-flex gap-2 align-items-center justify-content-between">
          <div className="d-flex gap-2 align-items-center justify-content-center">
            <span className="fs-6 fw-normal text-light border p-1 px-2">
              {item.size}
            </span>
            <div
              className="rounded-circle border border-text-light"
              style={{ width: 30, height: 30, backgroundColor: item.color }}
            />
          </div>
          <button
            className="btn bg-transparent text-light"
            type="button"
            onClick={handleDeleteItemFromCart}
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}
