import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { AditionalIngredient, IFood } from '~/models/food.model'

import { useAppSelector } from '../store'

export type FoodMenu = {
  food: IFood
  aditionals: AditionalIngredient[]
  beverages: AditionalIngredient[]
  note?: string
  type: string
  hasCombo: boolean
  typeOfMeal: 'combo' | 'food' | 'drink' | 'water' | 'food-accompaniment'
}

type CartState = {
  currentOrder: FoodMenu[] | null
}

type AddShoppingDTO = {
  item: {
    food: IFood
    aditionals: AditionalIngredient[]
    beverages: AditionalIngredient[]
    note?: string
    type: string
    hasCombo: boolean
    typeOfMeal: 'combo' | 'food' | 'drink' | 'water'
  }
}

type RemoveShoppingItemDTO = {
  id: string
}

type UpdateShoppingItemDTO = RemoveShoppingItemDTO & {
  item: AddShoppingDTO
}

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    currentOrder: [],
  } as CartState,
  reducers: {
    addNewFood: (
      state,
      { payload: { item } }: PayloadAction<AddShoppingDTO>,
    ) => {
      const newFood: IFood = {
        ...item.food,
        amount: item.food.amount,
      }

      const foodMenu = {
        food: newFood,
        aditionals: item.aditionals,
        beverages: item.beverages,
        note: item.note ?? '',
        type: item.type,
        hasCombo: item.hasCombo,
        typeOfMeal: item.typeOfMeal,
      }

      if (state.currentOrder && state.currentOrder.length > 0) {
        state.currentOrder = [...state.currentOrder, foodMenu]
      } else {
        state.currentOrder = [foodMenu]
      }
    },
    updateFood: (
      state,
      { payload: { id, item } }: PayloadAction<UpdateShoppingItemDTO>,
    ) => {
      const currentIndex = state.currentOrder?.findIndex(
        (cOItem) => cOItem?.food.id === id,
      )

      if (currentIndex !== undefined) {
        if (state.currentOrder) {
          const updatedCurrentOrderList = [
            ...state.currentOrder.slice(0, currentIndex),
            item.item,
            ...state.currentOrder.slice(
              currentIndex + 1,
              state.currentOrder.length,
            ),
          ]

          state.currentOrder = updatedCurrentOrderList
        }
      }
    },
    removeFood: (
      state,
      { payload: { id } }: PayloadAction<RemoveShoppingItemDTO>,
    ) => {
      const updatedCart =
        state.currentOrder?.filter((f) => f.food.id !== id) ?? []

      state.currentOrder = updatedCart
    },
    resetCart: (state) => {
      state.currentOrder = []
    },
  },
})

export const { addNewFood, removeFood, resetCart, updateFood } =
  cartSlice.actions

export default cartSlice.reducer

export const useCurrentCartItems = () => {
  return useAppSelector((state) => {
    return state.cart.currentOrder
  })
}
