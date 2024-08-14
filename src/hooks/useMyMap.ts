'use client'

import { useCallback, useRef } from 'react'

export default function useMyMap() {
  const { current: myMap } = useRef<Map<string, number>>(new Map())

  const getItem = useCallback((key: string | number): number => {
    key = typeof key === 'number' ? key.toString() : key
    return myMap.get(key) || 0
  }, [])

  const setItem = useCallback((key: string | number, value: number): void => {
    key = typeof key === 'number' ? key.toString() : key
    myMap.set(key, value)
  }, [])

  return { myMap, getItem, setItem }
}
