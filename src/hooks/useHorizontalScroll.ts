'use client'

import { useCallback, useLayoutEffect, useRef, useState } from 'react'

export default function useHorizontalScroll() {
  const ref = useRef<HTMLElement>(null)
  const hoverRef = useRef<boolean>(false)

  const mouseoverHandler = useCallback(() => (hoverRef.current = true), [])
  const mouseleaveHandler = useCallback(() => (hoverRef.current = false), [])

  const wheelHandler = useCallback((e: WheelEvent) => {
    if (!ref.current || !hoverRef.current) return
    else if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return
    else {
      e.preventDefault()
      ref.current.scrollLeft += e.deltaY
    }
  }, [])

  const horizontalScrollRef = useCallback((ele: HTMLElement) => {
    ref.current = ele
    ele.addEventListener('mouseover', mouseoverHandler)
    ele.addEventListener('mouseleave', mouseleaveHandler)
    ele.addEventListener('wheel', wheelHandler)
  }, [])

  /// clean up ///
  useLayoutEffect(() => {
    return () => {
      ref.current?.removeEventListener('mouseover', mouseoverHandler)
      ref.current?.removeEventListener('mouseleave', mouseleaveHandler)
      ref.current?.removeEventListener('wheel', wheelHandler)
    }
  }, [])

  return { horizontalScrollRef }
}
