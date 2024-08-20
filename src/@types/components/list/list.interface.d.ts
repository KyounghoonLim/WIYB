import { FC } from 'react'

export { ListProps, ListItemProps }

interface ListProps<T = any> {
  items: T[]
  Component: FC<ListItemProps>
  autoSize?: boolean
  className?: string
}

interface ListItemProps<T> {
  item: T
  index: number
  isLast?: boolean
  [key: string]: any
}
