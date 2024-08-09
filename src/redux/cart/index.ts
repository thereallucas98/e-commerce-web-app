import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Product } from '~/models/product.model'

import { useAppSelector } from '../store'

export type CartItem = {
  id: string
  product: Product
  color: string
  size: string
}

type CartState = {
  currentOrder: CartItem[] | null
}

type AddShoppingDTO = {
  item: CartItem
}

type RemoveShoppingItemDTO = {
  id: string
}

// type UpdateShoppingItemDTO = RemoveShoppingItemDTO & {
//   item: AddShoppingDTO
// }

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    currentOrder: [],
  } as CartState,
  reducers: {
    addItem: (state, { payload: { item } }: PayloadAction<AddShoppingDTO>) => {
      if (state.currentOrder && state.currentOrder.length > 0) {
        state.currentOrder = [...state.currentOrder, item]
      } else {
        state.currentOrder = [item]
      }
    },
    // updateItem: (
    //   state,
    //   { payload: { id, item } }: PayloadAction<UpdateShoppingItemDTO>,
    // ) => {},
    removeItem: (
      state,
      { payload: { id } }: PayloadAction<RemoveShoppingItemDTO>,
    ) => {
      const updatedCart =
        state.currentOrder?.filter((rIid) => rIid.id === id) ?? []

      state.currentOrder = updatedCart
    },
    resetCart: (state) => {
      state.currentOrder = []
    },
  },
})

export const { addItem, removeItem, resetCart } = cartSlice.actions

export default cartSlice.reducer

export const useCurrentCartItems = () => {
  return useAppSelector((state) => {
    return state.cart.currentOrder
  })
}
