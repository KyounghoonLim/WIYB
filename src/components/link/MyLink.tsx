'use client'

import useThrottle from 'hooks/useThrottle'
import Link, { LinkProps } from 'next/link'
import { usePathname } from 'next/navigation'
import React, { ReactNode, useCallback, useLayoutEffect, useRef } from 'react'

export default function MyLink({
  children,
  href,
  className,
}: {
  children: ReactNode
  href: LinkProps['href']
  className?: string
}) {
  const pathname = usePathname()
  const { throttling } = useThrottle(true)
  const unmountFlag = useRef<boolean>(false)

  const clickHandler = useCallback(() => {
    throttling(() => {
      return new Promise((resolve) => {
        const interval = setInterval(() => {
          if (href === pathname) {
            clearInterval(interval)
            resolve(true)
            location.reload()
          } else if (!unmountFlag.current) return
          else {
            clearInterval(interval)
            resolve(true)
          }
        }, 100)
      })
    })
  }, [href, pathname])

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
