import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery } from '@tanstack/react-query'
import { ShoppingBag } from 'lucide-react'
import { useCallback } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { Loading } from '~/components/loading'
import { addItem, CartItem } from '~/redux/cart'
import { useAppDispatch } from '~/redux/store'
import { getProductBySlug } from '~/services/products/get-product-by-slug.service'
import { formatStringToSlug } from '~/utils/formatter/string-to-slug'

const createItemToCartSchema = z.object({
  color: z.string(),
  size: z.string(),
})

type CreateItemToCartInput = z.infer<typeof createItemToCartSchema>

export function Shop() {
  const { slug } = useParams()

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const {
    data: product,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ['get-products'],
    queryFn: () => getProductBySlug({ slug: slug ?? '' }),
  })

  const {
    control,
    handleSubmit,
    formState: { isValid, isSubmitting },
  } = useForm<CreateItemToCartInput>({
    resolver: zodResolver(createItemToCartSchema),
    mode: 'all',
  })

  const handleAddItemToCart = useCallback(
    (data: CreateItemToCartInput) => {
      if (product) {
        const item: CartItem = {
          id: formatStringToSlug(product?.titulo),
          product,
          color: data.color,
          size: data.size,
        }

        dispatch(addItem({ item }))

        toast.success(
          `Product ${product.titulo} was successfully add to cart`,
          { position: 'top-right' },
        )
      }
    },
    [dispatch, product],
  )

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
      <form onSubmit={handleSubmit(handleAddItemToCart)} className="col">
        <div>
          <div className="mb-3 text-dark">
            <p className="fs-3 fw-medium">{product?.titulo}</p>
            <p className="fs-6 fw-normal">{product?.valor}</p>
            <p className="fs-6 fw-normal">{product?.descricao}</p>
          </div>

          <div className="flex flex-column gap-2 mb-3">
            <span>Color</span>
            <Controller
              control={control}
              name="color"
              render={({ field }) => {
                return (
                  <div className="d-flex flex-wrap gap-1">
                    {product?.cores.map((col) => (
                      <button
                        title={col.nome}
                        type="button"
                        className={`rounded-circle ${field.value === col.codigo ? 'border border-success' : 'border border-dark'}`}
                        key={col.codigo}
                        onClick={() => field.onChange(col.codigo)}
                        style={{
                          width: 40,
                          height: 40,
                          backgroundColor: col.codigo,
                        }}
                      />
                    ))}
                  </div>
                )
              }}
            />
          </div>
          <div className="flex flex-column gap-2 mb-3">
            <span>Size</span>
            <Controller
              control={control}
              name="size"
              render={({ field }) => {
                return (
                  <div className="d-flex flex-wrap gap-1">
                    {product?.tamanhos.map((size) => (
                      <button
                        type="button"
                        className={`p-2 px-3 ${field.value === size ? 'bg-dark text-light' : 'bg-transparent border border-dark'}`}
                        key={size}
                        onClick={() => field.onChange(size)}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                )
              }}
            />
          </div>
        </div>

        <div className="d-flex gap-2">
          <button
            type="submit"
            className="w-50 btn btn-dark text-light rounded-0 px-4 gap-2 align-items-center justify-content-center"
            disabled={!isValid || isSubmitting}
          >
            <ShoppingBag /> Add to bag
          </button>

          <button
            type="button"
            className="btn btn-secondary text-light rounded-0 px-2"
            disabled={isSubmitting}
            onClick={() => navigate(-1)}
          >
            Back
          </button>
        </div>
      </form>
    </main>
  )
}
