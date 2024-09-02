import { ReactNode } from 'react'

export { PaginatorProps }

interface PaginatorProps {
  children: ReactNode
  page: number
  totalPage: number
  onChange: (page: number) => any | Promise<any>
}
