'use client'

import useThrottle from 'hooks/useThrottle'
import Link, { LinkProps } from 'next/link'
import { usePathname } from 'next/navigation'
import React, {
  HTMLAttributeAnchorTarget,
  ReactNode,
  useCallback,
  useLayoutEffect,
  useRef,
} from 'react'

export default function MyLink({
  children,
  href,
  target = '_self',
  className,
}: {
  children: ReactNode
  href: LinkProps['href']
  target?: HTMLAttributeAnchorTarget
  className?: string
}) {
  const pathname = usePathname()
  const { throttling } = useThrottle(true)
  const routeChangedRef = useRef<boolean>(false)

  const clickHandler = useCallback(() => {
    if (target !== '_self') return
    else {
      throttling(() => {
        return new Promise((resolve) => {
          const interval = setInterval(() => {
            console.log(routeChangedRef.current)
            if (href === pathname || href === '#') {
              clearInterval(interval)
              resolve(true)
              location.reload()
            } else if (!routeChangedRef.current) return
            else {
              clearInterval(interval)
              resolve(true)
            }
          }, 100)
        })
      })
    }
  }, [href, pathname, target])

  /// unmount 되었을 때 throttle 해제 ///
  useLayoutEffect(() => {
    return () => {
      routeChangedRef.current = true
    }
  }, [])

  /// unmount 되지 않았지만 route 가 변경 되었을 때 throttle 해제 ///
  useLayoutEffect(() => {
    if (pathname !== href) return
    else {
      routeChangedRef.current = true
    }
  }, [pathname])

  return (
    <Link target={target} href={href} onClick={clickHandler} className={className}>
      {children}
    </Link>
  )
}
