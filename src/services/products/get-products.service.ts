import { pokeApi } from '~/api/poke-api.service'
import { Product } from '~/models/product.model'

type GetProductsParams = {
  search?: string
  categories?: string[]
  colors?: string[]
}

export async function getProducts({
  search = '',
  categories = [],
  colors = [],
}: GetProductsParams) {
  const delay = Math.random() * 1200

  console.log('colors', colors)

  await new Promise((resolve) => setTimeout(resolve, delay))

  const { data } = await pokeApi.get<Product[]>(
    '060e82b4801b0841fc683b0ce5efa06d/raw/e3cc555d9c71fd1b1160e20d7b10c083b5abcd61/desafio_front_end',
  )

  console.log('data', data)

  return data
    .filter((product) =>
      search
        ? product.titulo.toLowerCase().includes(search.toLowerCase())
        : product,
    )
    .filter((product) =>
      categories.length > 1
        ? categories.includes(product.categoria.toLowerCase())
        : product,
    )
    .filter((product) =>
      colors.length > 1
        ? product.cores.some((color) => colors.includes(color.codigo))
        : product,
    )
}
