'use client'

import useThrottle from '@/src/hooks/useThrottle'
import Link from 'next/link'
import React, { ReactNode, useCallback, useLayoutEffect, useRef } from 'react'

export default function MyLink({
  children,
  href,
  className,
}: {
  children: ReactNode
  href: string
  className?: string
}) {
  const { throttling } = useThrottle(true)
  const unmountFlag = useRef<boolean>(false)

  const clickHandler = useCallback(() => {
    throttling(() => {
      return new Promise((resolve) => {
        const interval = setInterval(() => {
          if (!unmountFlag.current) return
          else {
            clearInterval(interval)
            resolve(true)
          }
        }, 100)
      })
    })
  }, [])

  useLayoutEffect(() => {
    return () => {
      unmountFlag.current = true
    }
  }, [])

  return (
    <Link href={href} onClick={clickHandler} className={className}>
      {children}
    </Link>
  )
}
