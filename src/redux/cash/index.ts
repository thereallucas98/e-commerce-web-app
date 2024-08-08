import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type RegisterCash = {
  twohundred: number
  onehundred: number
  fifty: number
  twenty: number
  ten: number
  five: number
  two: number
  onecent: number
  fiftycent: number
  twentyfivecent: number
  tencent: number
  fivecent: number
}

type RegisterCashState = {
  cash: RegisterCash
}

type UpdateRegisterCashDTO = {
  cash: RegisterCash
}

const registerCashSlice = createSlice({
  name: 'registerCash',
  initialState: {
    cash: {
      twohundred: 0,
      onehundred: 0,
      fifty: 0,
      twenty: 0,
      ten: 0,
      five: 0,
      two: 0,
      onecent: 0,
      fiftycent: 0,
      twentyfivecent: 0,
      tencent: 0,
      fivecent: 0,
    },
  } as RegisterCashState,
  reducers: {
    updateRegisterCash: (
      state,
      { payload: { cash } }: PayloadAction<UpdateRegisterCashDTO>,
    ) => {
      Object.entries(cash).forEach(([key, value]) => {
        if (key in state.cash) {
          state.cash[key as keyof RegisterCash] = value as number
        }
      })
    },
  },
})

export const { updateRegisterCash } = registerCashSlice.actions
export default registerCashSlice.reducer
