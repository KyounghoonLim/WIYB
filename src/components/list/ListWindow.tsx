'use client'

import { ListProps } from '@/src/@types/components/list/list.interface'
import useList from '@/src/hooks/list/useList'
import useMyMap from '@/src/hooks/useMyMap'
import clsx from 'clsx'
import React, { createContext, useCallback } from 'react'
import { VariableSizeList } from 'react-window'
import ListWrapper from './ListWrapper'

export const listContext = createContext<{ setItem }>(null)

export default function ListWindow({ items, Component, autoSize = true, className }: ListProps) {
  const { listRef } = useList(items)
  const { getItem, setItem } = useMyMap()

  const listItemRef = useCallback(
    (ele: HTMLElement) => {
      if (!ele) return
      else {
        const idx = ele.dataset.index
        const h = ele.scrollHeight
        setItem(idx, h)
      }
    },
    [items]
  )

  return (
    <ListWrapper autoSize={autoSize}>
      {({ width, height }) => (
        <VariableSizeList
          ref={listRef}
          itemSize={getItem}
          width={width}
          height={height}
          itemCount={items?.length}
          className={clsx('list no-overscroll hide-scrollbar', className)}
          initialScrollOffset={0}
          overscanCount={10}
        >
          {({ index, style }) => (
            <li ref={listItemRef} style={style} data-index={index}>
              <Component
                {...{ item: items[index], index, isLast: items.length - 1 === index, setItem }}
              />
            </li>
          )}
        </VariableSizeList>
      )}
    </ListWrapper>
  )
}
