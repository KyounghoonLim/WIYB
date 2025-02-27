export { RadioProps, RadioOption }

interface RadioProps<T> {
  options: RadioOption<T>[]
  value: T
  name: string
  onChange: (val: T) => any
  id?: string
  className?: string
  itemClassName?: string
  indicatorClassName?: string
}

interface RadioOption<T> {
  label: string
  value: T
}
