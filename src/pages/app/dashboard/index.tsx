/* eslint-disable @typescript-eslint/no-unused-vars */
import { useQuery } from '@tanstack/react-query'
import { ShoppingBag } from 'lucide-react'
import { useCallback, useMemo } from 'react'
import { Helmet } from 'react-helmet-async'
import { useSearchParams } from 'react-router-dom'
import { z } from 'zod'

import { CheckboxInput } from '~/components/form/checkbox-input'
import { Loading } from '~/components/loading'
import { ProductCard } from '~/components/product-card'
import { COLORS } from '~/constants'
import { getProducts } from '~/services/products/get-products.service'

export function Dashboard() {
  const [searchParams, setSearchParams] = useSearchParams()

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

  const handleSetCategories = useCallback(
    (key: string) => {
      const currentCategories = categoriesValue

      const newCategories = currentCategories.includes(key)
        ? currentCategories.filter((category) => category !== key)
        : [...currentCategories, key]

      setSearchParams((state) => {
        state.set('categories', newCategories.join(','))

        return state
      })
    },
    [categoriesValue, setSearchParams],
  )

  const handleSetColors = useCallback(
    (key: string) => {
      const currentColors = colorsValue

      const newColors = currentColors.includes(key)
        ? currentColors.filter((category) => category !== key)
        : [...currentColors, key]

      setSearchParams((state) => {
        state.set('colors', newColors.join(','))

        return state
      })
    },
    [colorsValue, setSearchParams],
  )

  const handleClearFilters = useCallback(() => {
    setSearchParams((state) => {
      state.delete('search')
      state.delete('categories')
      state.delete('colors')

      return state
    })
  }, [setSearchParams])

  const isChecked = (key: string) => {
    const currentCategories = categoriesValue
    return currentCategories.includes(key)
  }

  const isSelected = (key: string) => {
    const currentColors = colorsValue
    return currentColors.includes(key)
  }

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
          <aside className="d-none d-xl-flex flex-xl-column flex gap-4">
            <div className="d-flex align-items-center gap-4">
              <span className="fs-5 fw-medium">Filters</span>{' '}
              <button
                className="btn btn-light border-0 text-decoration-underline"
                type="button"
                onClick={handleClearFilters}
              >
                Clear filter
              </button>
            </div>
            <div className="flex gap-2">
              <span className="fs-6 fw-medium">Categories</span>
              <CheckboxInput
                id="jackets"
                label="Jackets"
                checked={isChecked('jackets')}
                onChange={() => handleSetCategories('jackets')}
              />
              <CheckboxInput
                id="fleece"
                label="Fleece"
                checked={isChecked('fleece')}
                onChange={() => handleSetCategories('fleece')}
              />
              <CheckboxInput
                id="sweatshirts"
                label="Sweatshirts & Hoodies"
                checked={isChecked('sweatshirts')}
                onChange={() => handleSetCategories('sweatshirts')}
              />
              <CheckboxInput
                id="sweaters"
                label="Sweaters"
                checked={isChecked('sweaters')}
                onChange={() => handleSetCategories('sweaters')}
              />
              <CheckboxInput
                id="shirts"
                label="Shirts"
                checked={isChecked('shirts')}
                onChange={() => handleSetCategories('shirts')}
              />
              <CheckboxInput
                id="tshirts"
                label="T-shirts"
                checked={isChecked('tshirts')}
                onChange={() => handleSetCategories('tshirts')}
              />
              <CheckboxInput
                id="pants"
                label="Pants & Jeans"
                checked={isChecked('pants')}
                onChange={() => handleSetCategories('pants')}
              />
            </div>
            <div className="container flex gap-2">
              <span className="fs-6 fw-medium">Colors</span>
              <div className="row row-cols-4 gap-2">
                {Object.entries(COLORS).map(([colorName, colorValue]) => (
                  <button
                    type="button"
                    className={`col border rounded-circle ${isSelected(colorValue) ? 'border-success' : 'border-dark'}`}
                    title={colorName}
                    key={colorName}
                    onClick={() => handleSetColors(colorValue)}
                    style={{
                      backgroundColor: colorValue,
                      width: 32,
                      height: 32,
                      borderWidth: isSelected(colorValue) ? 2 : 1,
                    }}
                  />
                ))}
              </div>
            </div>
          </aside>
          <div className="container pt-5">
            <div>
              <p className="text-end">
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
