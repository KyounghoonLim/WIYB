import { FC, ReactNode } from 'react'

export { BedgeProps }

interface BedgeProps {
  text?: string | number
  icon?: FC<SVGProps<SVGElement>>
  children?: ReactNode
  onClick?: (text: string | number) => any
  className?: string
}
