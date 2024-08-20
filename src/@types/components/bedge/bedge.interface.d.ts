import { FC, ReactNode } from 'react'

export { BedgeProps }

interface BedgeProps {
  text?: string
  icon?: FC<SVGProps<SVGElement>>
  children?: ReactNode
  onClick?: (text: string) => any
  className?: string
}
