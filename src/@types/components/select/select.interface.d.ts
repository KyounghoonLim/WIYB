export { SelectProps, SelectOption }

interface SelectProps {
  options: SelectOption[]
  value?: string
  placeholder?: string
  onChange?: (value: string) => any | Promise<any>
  className?: string
}

type SelectOption = {
  value: string
  label: string
  className?: string
}
