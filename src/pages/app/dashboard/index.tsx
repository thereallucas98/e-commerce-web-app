/* eslint-disable @typescript-eslint/no-unused-vars */
import { useQuery } from '@tanstack/react-query'
import { ShoppingBag } from 'lucide-react'
import { useMemo } from 'react'
import { Helmet } from 'react-helmet-async'
import { useSearchParams } from 'react-router-dom'
import { z } from 'zod'

import { Loading } from '~/components/loading'
import { ProductCard } from '~/components/product-card'
import { getProducts } from '~/services/products/get-products.service'

import { Filters } from './components/filter'
import { MobileFilters } from './components/mobile-filters'

export function Dashboard() {
  const [searchParams, _] = useSearchParams()

  const searchValue = z.coerce
    .string()
    .transform((search) => search)
    .parse(searchParams.get('search') ?? '')

  const categoriesValue = useMemo(() => {
    return searchParams.get('categories')?.split(',') || []
  }, [searchParams])

  const colorsValue = useMemo(() => {
    return searchParams.get('colors')?.split(',') || []
  }, [searchParams])

  const {
    data: products,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ['get-products', searchValue, categoriesValue, colorsValue],
    queryFn: () =>
      getProducts({
        search: searchValue,
        categories: categoriesValue,
        colors: colorsValue,
      }),
  })

  const requestingProducts = isLoading || isFetching

  if (requestingProducts) {
    return <Loading />
  }

  return (
    <>
      <Helmet title="Dashboard" />
      <main className="w-100">
        <section className="bg-dark text-light px-4 py-3">
          <h1 className="fs-2 fs-bold">Shop {"Men's"}</h1>
          <p className="fs-6 fw-normal w-50">
            Revamp your sytyle with the latest designer trends in {"men's"}{' '}
            clothing or achieve a perfectly curated wardrobe thanks to our
            line-up of timeless pieces
          </p>
        </section>
        <section
          className="py-4 px-4 mx-auto d-flex gap-2"
          style={{ maxWidth: 1440 }}
        >
          <Filters />
          <div className="container pt-5">
            <div className="flex flex-row align-items-center justify-content-center">
              <div className="d-none">
                {/* TODO: WHY DOES THE MODAL IS NOT HIDDEN OVERLAY? */}
                <MobileFilters />
              </div>
              <p className="text-md-end mt-2">
                Showing {products?.length ?? 0} products
              </p>
            </div>
            {!products || products.length === 0 ? (
              <div className="d-flex flex-column align-items-center justify-content-center w-100 h-100 mt-4 gap-2 mb-4">
                <ShoppingBag className="w-25 h-25" />
                <span className="h5 fw-bold text-dark">
                  {"Couldn't"} find or load products
                </span>
              </div>
            ) : (
              <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 align-items-start justify-content-start">
                {products && products.length > 0
                  ? products.map((product) => (
                      <ProductCard key={product.titulo} product={product} />
                    ))
                  : null}
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  )
}
