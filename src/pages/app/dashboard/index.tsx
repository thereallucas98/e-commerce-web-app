import { useQuery } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'

import { CheckboxInput } from '~/components/form/checkbox-input'
import { Loading } from '~/components/loading'
import { ProductCard } from '~/components/product-card'
import { getProducts } from '~/services/products/get-products.service'

export function Dashboard() {
  const {
    data: products,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ['get-products'],
    queryFn: () => getProducts(),
  })

  const requestingProducts = isLoading || isFetching

  if (requestingProducts) {
    return <Loading />
  }

  return (
    <>
      <Helmet title="Dashboard" />
      <main>
        <section className="bg-dark text-light px-4 py-3">
          <h1 className="fs-2 fs-bold">Shop {"Men's"}</h1>
          <p className="fs-6 fw-normal w-50">
            Revamp your sytyle with the latest designer trends in {"men's"}{' '}
            clothing or achieve a perfectly curated wardrobe thanks to our
            line-up of timeless pieces
          </p>
        </section>
        <section className="py-4 px-4 d-flex gap-2 justify-content-between">
          <aside className="d-none d-xl-flex flex-xl-column flex gap-4">
            <div className="d-flex align-items-center gap-4">
              <span className="fs-5 fw-medium">Filters</span>{' '}
              <button
                className="btn btn-light border-0 text-decoration-underline"
                type="button"
              >
                Clear filter
              </button>
            </div>
            <div className="flex gap-2">
              <span className="fs-6 fw-medium">Categories</span>
              <CheckboxInput id="jackets" label="Jackets" />
              <CheckboxInput id="fleece" label="Fleece" />
              <CheckboxInput id="sweatshirts" label="Sweatshirts & Hoodies" />
              <CheckboxInput id="sweaters" label="Sweaters" />
              <CheckboxInput id="shirts" label="Shirts" />
              <CheckboxInput id="tshirts" label="T-shirts" />
              <CheckboxInput id="pants" label="Pants & Jeans" />
            </div>
            <div className="flex gap-2">
              <span className="fs-6 fw-medium">Colors</span>
              <CheckboxInput id="jackets" label="Jackets" />
              <CheckboxInput id="fleece" label="Fleece" />
              <CheckboxInput id="sweatshirts" label="Sweatshirts & Hoodies" />
              <CheckboxInput id="sweaters" label="Sweaters" />
              <CheckboxInput id="shirts" label="Shirts" />
              <CheckboxInput id="tshirts" label="T-shirts" />
              <CheckboxInput id="pants" label="Pants & Jeans" />
            </div>
          </aside>
          <div className="container pt-5">
            <div>
              <p className="text-end">
                Showing {products?.length ?? 0} products
              </p>
            </div>
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 align-items-start justify-content-start">
              {products && products.length > 0
                ? products.map((product) => (
                    <ProductCard key={product.titulo} product={product} />
                  ))
                : null}
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
