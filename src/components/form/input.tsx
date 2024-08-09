import { ComponentProps, forwardRef } from 'react'
import { FieldError } from 'react-hook-form'

interface InputProps extends ComponentProps<'input'> {
  label: string
  error?: FieldError
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, ...props }, ref) => {
    return (
      <fieldset>
        <legend
          className={`form-label fs-5 ${error ? 'text-danger' : 'text-light'}`}
        >
          {label}
        </legend>
        <input
          className={`form-control bg-secondary ${error ? 'text-danger border-danger' : 'text-light border-secondary'}`}
          ref={ref}
          {...props}
        />
        {error && error.message && (
          <span className="text-danger">{error.message}</span>
        )}
      </fieldset>
    )
  },
)

Input.displayName = 'Input' // For better debugging with React DevTools

export default Input
