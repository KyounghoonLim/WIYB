import { ListProps } from '@/src/@types/components/list/list.interface'
import clsx from 'clsx'
import React from 'react'

export default function ListPrimary({ items, Component, className }: ListProps) {
  return (
    <ul className={clsx('list', className)}>
      {items.map((item, index) => (
        <li key={index}>
          <Component {...{ item, index }} />
        </li>
      ))}
    </ul>
  )
}
