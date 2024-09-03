export { InputDateProps }

interface InputDateProps {
  onChange: (d: Date | string) => any
  id?: string
  value?: Date | string
  placeholder?: string
  maxDate?: string | number
  className?: string
}
