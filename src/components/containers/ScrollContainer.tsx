'use client'

import React, { useCallback, useMemo, useRef } from 'react'
import AutoSizer from 'react-virtualized-auto-sizer'
import SimpleBar from 'simplebar-react'
import SimpleBarCore from 'simplebar-core'
import 'simplebar-react/dist/simplebar.min.css'
import clsx from 'clsx'

interface ScrollContainerProps {
  children: ({ scrollableNodeRef, contentNodeRef, width, height }) => React.ReactNode
  style?: (w, h) => { width: number; height: number }
  className?: string
  allowTransition?: boolean
  onScroll?: (e: Event) => void
  onResize?: (e: Event) => void
}

export default function ScrollContainer({
  children,
  style = (width, height) => ({ width, height }),
  className,
  allowTransition = true,
  onScroll,
  onResize,
}: ScrollContainerProps) {
  const simplebarRef = useRef<SimpleBarCore>(null)
  const scrollDebounceRef = useRef<NodeJS.Timeout>(null)
  const resizeDebounceRef = useRef<NodeJS.Timeout>(null)

  const transition = useMemo(
    () =>
      allowTransition
        ? {
            transitionProperty: 'width, height',
            transitionDuration: '200ms',
            transitionTimingFunction: 'ease-in-out',
          }
        : {},
    [allowTransition]
  )

  const scrollHandler = useCallback(
    (e) => {
      clearTimeout(scrollDebounceRef.current)
      scrollDebounceRef.current = setTimeout(() => {
        onScroll?.(e)
      }, 16.7)
    },
    [onScroll]
  )

  const resizeHandler = useCallback(
    (e) => {
      clearTimeout(resizeDebounceRef.current)
      resizeDebounceRef.current = setTimeout(() => {
        onResize?.(e)
        console.log('resized!')
      }, 200)
    },
    [onResize]
  )

  return (
    <AutoSizer onResize={resizeHandler} className={clsx(className)}>
      {({ width, height }) => (
        <SimpleBar
          ref={simplebarRef}
          onScrollCapture={scrollHandler}
          style={{
            ...style(width, height),
            ...transition,
          }}
          classNames={{
            contentWrapper: 'w-full',
            track: 'simplebar-track chat-container-scrollbar',
          }}
          clickOnTrack
        >
          {({ scrollableNodeRef, contentNodeRef }) =>
            children({ scrollableNodeRef, contentNodeRef, width, height })
          }
        </SimpleBar>
      )}
    </AutoSizer>
  )
}
