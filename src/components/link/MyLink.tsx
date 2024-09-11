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
  title,
  useLoadingOverlay = true,
  replace,
}: {
  children: ReactNode
  href: LinkProps['href']
  target?: HTMLAttributeAnchorTarget
  className?: string
  title?: string
  useLoadingOverlay?: boolean
} & LinkProps) {
  const pathname = usePathname()
  const { throttling } = useThrottle(useLoadingOverlay)
  const routeChangedRef = useRef<boolean>(false)

  const scrollToTop = useCallback(() => {
    document.scrollingElement.scrollTo({ top: 0 })
  }, [])

  const clickHandler = useCallback(() => {
    if (target !== '_self') return
    else {
      throttling(() => {
        return new Promise((resolve) => {
          const interval = setInterval(() => {
            if (href === pathname || href === '#') {
              clearInterval(interval)
              resolve(true)
              location.reload()
              scrollToTop()
            } else if (!routeChangedRef.current) return
            else {
              clearInterval(interval)
              resolve(true)
              scrollToTop()
            }
          }, 100)
        })
      })
    }
  }, [href, pathname, target, throttling, scrollToTop])

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
  }, [pathname, href])

  return (
    <Link
      target={target}
      href={typeof href === 'string' ? href.toLowerCase() : href}
      onClick={clickHandler}
      className={className}
      title={title}
      replace={replace}
      scroll={false}
    >
      {children}
    </Link>
  )
}
