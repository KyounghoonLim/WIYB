export { InputProps, Input_Checkbox_Props }

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

interface Input_Checkbox_Props {
  name: string
  value: string
  isChecked: boolean
  label?: string
  onChange?: (value: string) => any
  className?: string
}
