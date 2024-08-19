import { ListProps } from '@/src/@types/components/list/list.interface'
import clsx from 'clsx'
import React from 'react'
import ListWrapper from './ListWrapper'

export default function ListPrimary({ items, Component, autoSize, className }: ListProps) {
  return (
    <ListWrapper autoSize={autoSize}>
      {({ width, height }) => (
        <ul className={clsx('list overflow-auto', className)} style={{ width, height }}>
          {items.map((item, index) => (
            <li key={index}>
              <Component {...{ item, index, isLast: items.length - 1 === index }} />
            </li>
          ))}
        </ul>
      )}
    </ListWrapper>
  )
}
