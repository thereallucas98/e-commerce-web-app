import { Trash2 } from 'lucide-react'
import { useCallback } from 'react'

import { CartItem as CartItemModel, removeItem } from '~/redux/cart'
import { useAppDispatch } from '~/redux/store'

type ItemCardProps = {
  item: CartItemModel
}

export function ItemCard({ item }: ItemCardProps) {
  const dispatch = useAppDispatch()

  const coverImg = item.product.fotos.find((pc) => pc.capa)

  const handleDeleteItemFromCart = useCallback(() => {
    dispatch(removeItem({ id: item.id }))
  }, [dispatch, item.id])

  return (
    <div className="container py-1 mb-2 d-flex gap-2 align-items-center justify-content-between">
      <img
        className="img-fluid rounded-1"
        style={{ width: 100, height: 100 }}
        src={coverImg?.url}
        alt={item.product.titulo}
      />
      <div className="w-100 h-100 flex align-items-center justify-content-between">
        {/* TITULO */}
        <div className="d-flex gap-2 align-items-center justify-content-between">
          <span className="fs-6 fw-normal text-dark">
            {item.product.titulo}
          </span>
          <span className="fs-5 fw-bold text-dark">{item.product.valor}</span>
        </div>
        {/* CONFIG AND REMOVE */}
        <div className="d-flex gap-2 align-items-center justify-content-between">
          <div className="d-flex gap-2 align-items-center justify-content-center">
            <span className="fs-6 fw-normal text-dark border p-1 px-2">
              {item.size}
            </span>
            <div
              className="rounded-circle border border-text-dark"
              style={{ width: 30, height: 30, backgroundColor: item.color }}
            />
          </div>
          <button
            className="btn bg-transparent text-dark"
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
