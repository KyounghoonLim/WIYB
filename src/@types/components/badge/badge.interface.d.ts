import { FC, ReactNode } from 'react'

export { BadgeProps }

interface BadgeProps {
  text?: string
  icon?: FC<SVGProps<SVGElement>>
  children?: ReactNode
  onClick?: (text: string) => any
  className?: string
}
