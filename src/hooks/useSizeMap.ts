'use client'

import { useCallback, useRef } from 'react'

export default function useSizeMap() {
  const { current: sizeMap } = useRef<Map<string, number>>(new Map())

  const getItemSize = useCallback((key: string | number): number => {
    key = typeof key === 'number' ? key.toString() : key
    return sizeMap.get(key) || 0
  }, [])

  const setItemSize = useCallback((key: string | number, value: number): void => {
    key = typeof key === 'number' ? key.toString() : key
    sizeMap.set(key, value)
  }, [])

  return { sizeMap, getItemSize, setItemSize }
}
