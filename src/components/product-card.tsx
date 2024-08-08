import { Link } from 'react-router-dom'

import { Product } from '~/models/product.model'
import { formatStringToSlug } from '~/utils/formatter/string-to-slug'

type ProductCardProps = {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const coverImg = product.fotos.find((pc) => pc.capa)

  const productSlug = formatStringToSlug(product.titulo)

  return (
    <Link
      to={`shop/${productSlug}`}
      className="col container px-2 py-4 text-decoration-none"
    >
      <img
        className="img-fluid rounded-4"
        src={coverImg?.url}
        alt={product.titulo}
      />

      <span className="fs-5 mt-2 fw-normal text-secondary flex d-xl-flex align-items-center justify-content-between">
        {product.titulo}{' '}
        <strong className="badge text-bg-dark text-light fs-7">
          {product.tamanhos.join(', ')}
        </strong>
      </span>
    </Link>
  )
}
