export { InputProps }

interface InputProps {
  type?: HTMLInputElement.type
  value?: string
  placeholder?: string
  id?: string
  className?: string
  disabled?: boolean
  maxLength?: number
  onChange?: (value: string) => any
  onFocus?: (value: string) => any
  onBlur?: (value: string) => any
  preprocessor?: (value: string) => string
}
