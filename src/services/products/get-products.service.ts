import { pokeApi } from '~/api/poke-api.service'
import { Product } from '~/models/product.model'

type GetProductsParams = {
  search?: string
}

export async function getProducts({ search = '' }: GetProductsParams) {
  const delay = Math.random() * 1200

  await new Promise((resolve) => setTimeout(resolve, delay))

  const { data } = await pokeApi.get<Product[]>(
    '060e82b4801b0841fc683b0ce5efa06d/raw/e3cc555d9c71fd1b1160e20d7b10c083b5abcd61/desafio_front_end',
  )

  if (search) {
    return data.filter((product) =>
      product.titulo.toLowerCase().includes(search.toLowerCase()),
    )
  }

  return data
}
