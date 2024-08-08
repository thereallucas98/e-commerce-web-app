import { ComponentProps } from 'react'

interface CheckboxInputProps extends ComponentProps<'input'> {
  id: string
  label: string
}

export function CheckboxInput({ id, label, ...props }: CheckboxInputProps) {
  return (
    <div className="form-check">
      <input
        className="form-check-input rounded-0 p-2"
        type="checkbox"
        id={id}
        {...props}
      />
      <label className="form-check-label" htmlFor={id}>
        {label}
      </label>
    </div>
  )
}
