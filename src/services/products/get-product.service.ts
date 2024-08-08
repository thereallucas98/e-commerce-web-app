import { pokeApi } from '~/api/poke-api.service'
import { Product } from '~/models/product.model'

export async function getProducts() {
  const delay = Math.random() * 2000 + 1000

  await new Promise((resolve) => setTimeout(resolve, delay))

  const { data } = await pokeApi.get<Product[]>(
    '060e82b4801b0841fc683b0ce5efa06d/raw/e3cc555d9c71fd1b1160e20d7b10c083b5abcd61/desafio_front_end',
  )

  return data
}
