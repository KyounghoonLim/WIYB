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

  const horizontalScrollRef = useCallback(
    (ele: HTMLElement) => {
      if (!ele) return
      else if (ele.parentElement.clientWidth >= ele.scrollWidth)
        return // 가로 스크롤이 되지 않는 사이즈인 경우 이벤트 추가하지 않음
      else {
        ref.current = ele
        ele?.addEventListener('mouseover', mouseoverHandler)
        ele?.addEventListener('mouseleave', mouseleaveHandler)
        ele?.addEventListener('wheel', wheelHandler)
      }
    },
    [mouseoverHandler, mouseleaveHandler, wheelHandler]
  )

  /// clean up ///
  useLayoutEffect(() => {
    return () => {
      ref.current?.removeEventListener('mouseover', mouseoverHandler)
      ref.current?.removeEventListener('mouseleave', mouseleaveHandler)
      ref.current?.removeEventListener('wheel', wheelHandler)
    }
  }, [mouseoverHandler, mouseleaveHandler, wheelHandler])

  return { horizontalScrollRef }
}
