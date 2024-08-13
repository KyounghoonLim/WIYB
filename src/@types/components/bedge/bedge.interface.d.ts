import { FC } from 'react'

export { BedgeProps }

interface BedgeProps {
  text?: string | number
  icon?: FC<SVGProps<SVGElement>>
  onClick?: (text: string | number) => any
  className?: string
}
