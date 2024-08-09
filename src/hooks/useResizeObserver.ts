'use client'

import { useCallback, useRef } from 'react'

type ObserverCallback = (width: number, height: number) => void

export default function useResizeObserver() {
  const observerRef = useRef<ResizeObserver>()
  const debounceRef = useRef<NodeJS.Timeout>()

  const initObserver = useCallback((target: HTMLElement, callback: ObserverCallback) => {
    destroyObserver()

    const observer = new ResizeObserver(([entry]) => {
      clearTimeout(debounceRef.current)
      debounceRef.current = setTimeout(() => {
        const { width, height } = entry.contentRect
        callback(width, height)
      }, 16.7)
    })
    observerRef.current = observer
  }, [])

  const destroyObserver = useCallback(() => {
    observerRef.current?.disconnect()
  }, [])

  return { observer: observerRef.current, initObserver, destroyObserver }
}
