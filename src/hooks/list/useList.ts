'use client'

import { createContext, useCallback, useRef } from 'react'
import { VariableSizeList } from 'react-window'

export default function useList(items) {
  const containerRef = useRef<VariableSizeList>()
  const heightRef = useRef<number>(0)
  const offsetRef = useRef<number>(0)

  const getHeight = useCallback(() => {
    const height = containerRef.current?.props.height as number
    return height || 0
  }, [])

  const getOffset = useCallback(() => {
    // const offset = (containerRef.current?.state as any).scrollOffset as number
    return 0
  }, [])

  const renderListItem = useCallback(
    (index: number = 0) => {
      containerRef.current?.resetAfterIndex(0)
      containerRef.current?.scrollToItem(index)
    },
    [items]
  )

  const listRef = useCallback(
    (ref: VariableSizeList) => {
      if (!ref) return
      else {
        containerRef.current = ref
        const height = getHeight()
        const offset = getOffset()
        heightRef.current = height
        offsetRef.current = offset
        renderListItem(0)
      }
    },
    [items]
  )

  return { listRef, renderListItem }
}
