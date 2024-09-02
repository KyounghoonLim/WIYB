import { ReactElement } from 'react'

export { DropdownProps, DropdownOption }

interface DropdownProps {
  options: DropdownOption[]
  closeDropdown: () => void
}

type DropdownOption = {
  label: string
  element?: ReactElement
  onClick?: () => any | Promise<any>
  className?: string
}
