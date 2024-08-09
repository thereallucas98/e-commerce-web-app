import { useQuery } from '@tanstack/react-query'
import { ShoppingBag } from 'lucide-react'
import { useParams } from 'react-router-dom'

import { Loading } from '~/components/loading'
import { getProductBySlug } from '~/services/products/get-product-by-slug.service'

export function Shop() {
  const { slug } = useParams()

  const {
    data: product,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ['get-products'],
    queryFn: () => getProductBySlug({ slug: slug ?? '' }),
  })

  const requestingProducts = isLoading || isFetching

  if (requestingProducts) {
    return <Loading />
  }

  return (
    <main
      className="container-fluid vh-100 row align-items-center justify-content-center mx-auto"
      style={{ maxWidth: 1440 }}
    >
      <section className="col row row-cols-2">
        {product?.fotos.map((pic, index) => (
          <img
            key={pic.url}
            className="img-fluid rounded-4 mb-2"
            src={pic?.url ?? ''}
            alt={`${product.titulo} image ${index + 1}`}
          />
        ))}
      </section>
      <section className="col">
        <div>
          <div className="mb-3 text-dark">
            <p className="fs-3 fw-medium">{product?.titulo}</p>
            <p className="fs-6 fw-normal">{product?.valor}</p>
            <p className="fs-6 fw-normal">{product?.descricao}</p>
          </div>

          <div className="flex flex-column gap-2 mb-3">
            <span>Color</span>
            <div className="d-flex flex-wrap gap-1">
              {product?.cores.map((col) => (
                <button
                  title={col.nome}
                  type="button"
                  className="border border-dark rounded-circle"
                  key={col.codigo}
                  style={{
                    width: 40,
                    height: 40,
                    backgroundColor: col.codigo,
                  }}
                />
              ))}
            </div>
          </div>
          <div className="flex flex-column gap-2 mb-3">
            <span>Size</span>
            <div className="d-flex flex-wrap gap-1">
              {product?.tamanhos.map((size) => (
                <button
                  type="button"
                  className="border bg-transparent border-dark p-2 px-3"
                  key={size}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="d-flex gap-2">
          <button
            type="button"
            className="w-50 btn btn-dark text-light rounded-0 px-4 gap-2 align-items-center justify-content-center"
          >
            <ShoppingBag /> Add to bag
          </button>

          <button
            type="button"
            className="btn btn-secondary text-light rounded-0 px-2"
          >
            Back
          </button>
        </div>
      </section>
    </main>
  )
}
