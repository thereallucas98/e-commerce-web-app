import { zodResolver } from '@hookform/resolvers/zod'
import { Lock, ShoppingBag } from 'lucide-react'
import { useCallback, useEffect, useMemo } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import Input from '~/components/form/input'
import { resetCart } from '~/redux/cart'
import { useAppDispatch, useAppSelector } from '~/redux/store'
import { formatCurrency } from '~/utils/formatter/currency'

import { ItemCard } from './components/item-card'

const months = Array.from({ length: 12 }, (_, i) => (i + 1).toString())
const years = Array.from({ length: 11 }, (_, i) => (2024 + i).toString())

const MonthsEnum = z.enum([
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  '11',
  '12',
])

const YearsEnum = z.enum([
  '2024',
  '2025',
  '2026',
  '2027',
  '2028',
  '2029',
  '2030',
  '2031',
  '2032',
  '2033',
  '2034',
])

const createCheckoutSchema = z.object({
  cardNumber: z
    .string()
    .max(19, { message: 'Card number must have 15 or 16 numeric digits.' }),
  cardHolderName: z
    .string()
    .min(3, {
      message: 'Cardholder name must be at least three characters long.',
    })
    .refine((val) => val.trim().split(' ').length >= 2, {
      message: 'Cardholder name must include both first and last names.',
    }),
  expirationMonth: MonthsEnum,
  expirationYear: YearsEnum,
  cvv: z.string().refine((val) => /^\d{3,4}$/.test(val), {
    message: 'CVV must have 3 or 4 numeric digits.',
  }),
})

type CreateCheckoutInput = z.infer<typeof createCheckoutSchema>

export function Checkout() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const cart = useAppSelector((state) => state.cart.currentOrder)

  const totalAmount = useMemo(() => {
    if (cart && cart?.length > 0) {
      const totalAmount = cart.reduce((acc, item) => {
        const currentPrice = parseFloat(item.product.valor.split('$')[1])

        acc += currentPrice
        return acc
      }, 0)

      return totalAmount
    }

    return 0
  }, [cart])

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<CreateCheckoutInput>({
    resolver: zodResolver(createCheckoutSchema),
    mode: 'all',
  })

  const handleConfirmCheckout = useCallback(() => {
    toast.success('Order successfully created', { position: 'top-right' })
    dispatch(resetCart())
    navigate('/confirmation')
  }, [dispatch, navigate])

  useEffect(() => {
    if (cart && cart?.length === 0) {
      navigate(-1)
      toast.info('Não há produtos no carrinho', { position: 'top-right' })
    }
  }, [cart, navigate])

  return (
    <main
      className="container-fluid mt-5 row align-items-center justify-content-center mx-auto"
      style={{ maxWidth: 1440 }}
    >
      <section className="col align-items-center justify-content-between">
        <div className="flex gap-4">
          <span className="text-dark fs-2">
            <ShoppingBag size={48} />
            Your bag
          </span>
          <div className="mt-4">
            {cart &&
              cart?.length > 0 &&
              cart.map((iCard) => <ItemCard key={iCard.id} item={iCard} />)}
          </div>
        </div>
        <div className="alert alert-dark mt-4" role="alert">
          <span>
            <Lock className="mr-2 text-dark" />
            Security & Privacy
          </span>
          <p>
            Every transaction on <strong>Lifters Shop</strong> is secure. Any
            personal information you give us will be handled according to our
            <span className="text-decoration-underline"> Privacy Policy</span>.
          </p>
        </div>
      </section>
      <section className="col flex align-items-end jusfity-content-end">
        <button
          type="button"
          className="ms-auto mb-2 btn btn-secondary"
          onClick={() => navigate(-1)}
        >
          Back
        </button>
        <form
          onSubmit={handleSubmit(handleConfirmCheckout)}
          className="bg-dark h-100 px-2 py-2 rounded-2 "
        >
          <span className="text-light fs-4 mt-2 d-flex align-items-center justify-content-between mb-2">
            Total{' '}
            <strong>{formatCurrency(totalAmount ?? 0, 'us-EN', 'usd')}</strong>
          </span>
          <Input
            label="Card Number"
            id="cardNumber"
            placeholder="Card Number"
            {...register('cardNumber', {
              onChange: (e) => {
                const inputVal = e.target.value.replace(/\D/g, '')
                const formattedValue = inputVal.replace(/(\d{4})(?=\d)/g, '$1 ')
                e.target.value = formattedValue
              },
            })}
            error={errors.cardNumber}
            maxLength={19}
          />
          <Input
            label="Cardholder Name"
            id="cardHolderName"
            placeholder="Card Holder Number"
            {...register('cardHolderName')}
            error={errors.cardHolderName}
          />
          <div className="d-flex gap-2">
            <fieldset className="w-100">
              <legend className="form-label fs-5 text-light">
                Expiry Month
              </legend>
              <Controller
                control={control}
                name="expirationMonth"
                render={({ field }) => (
                  <select
                    {...field}
                    className="w-100 form-select form-control bg-secondary border-secondary"
                    aria-label="Select Month"
                  >
                    <option value="">Select Month</option>
                    {months.map((month) => (
                      <option key={month} value={month}>
                        {month}
                      </option>
                    ))}
                  </select>
                )}
              />
            </fieldset>
            <fieldset className="w-100">
              <legend className="form-label fs-5 text-light">
                Expiry Year
              </legend>
              <Controller
                control={control}
                name="expirationYear"
                render={({ field }) => (
                  <select
                    {...field}
                    className="w-100 form-select form-control bg-secondary border-secondary"
                    aria-label="Select Year"
                  >
                    <option value="">Select Year</option>
                    {years.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                )}
              />
            </fieldset>
          </div>
          <Input
            label="CVV"
            id="cvv"
            placeholder="CVV"
            {...register('cvv')}
            error={errors.cvv}
          />
          <fieldset className="mt-2">
            <input
              type="checkbox"
              className="form-check-input rounded-circle p-2"
              id="allterms"
            />
            <label
              className="ms-2 form-check-label text-light"
              htmlFor="allterms"
            >
              Accept all terms
            </label>
          </fieldset>

          <button
            type="submit"
            className="mt-2 btn container btn-light  text-dark"
            disabled={!isValid || isSubmitting}
          >
            Checkout
          </button>
        </form>
      </section>
    </main>
  )
}
