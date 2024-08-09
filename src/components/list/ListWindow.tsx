'use client'

import { ListProps } from '@/src/@types/components/list/list.interface'
import useList from '@/src/hooks/list/useList'
import useSizeMap from '@/src/hooks/useSizeMap'
import clsx from 'clsx'
import React, { createContext, useCallback } from 'react'
import { VariableSizeList } from 'react-window'
import AutoSizer from 'react-virtualized-auto-sizer'

export const listContext = createContext<{ setItemSize }>(null)

export default function ListWindow({ items, Component, className }: ListProps) {
  const { listRef } = useList(items)
  const { getItemSize, setItemSize } = useSizeMap()

  const listItemRef = useCallback(
    (ele: HTMLElement) => {
      if (!ele) return
      else {
        const idx = ele.dataset.index
        const h = ele.scrollHeight
        setItemSize(idx, h)
      }
    },
    [items]
  )

  return (
    <AutoSizer>
      {({ width, height }) => (
        <VariableSizeList
          ref={listRef}
          itemSize={getItemSize}
          width={width}
          height={height}
          itemCount={items?.length}
          className={clsx('list no-overscroll', className)}
          initialScrollOffset={0}
        >
          {({ index, style }) => (
            <li ref={listItemRef} style={style} data-index={index}>
              <Component {...{ item: items[index], index, setItemSize }} />
            </li>
          )}
        </VariableSizeList>
      )}
    </AutoSizer>
  )
}
