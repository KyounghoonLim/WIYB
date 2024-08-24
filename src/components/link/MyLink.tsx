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
  const unmountFlag = useRef<boolean>(false)

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
            } else if (!unmountFlag.current) return
            else {
              clearInterval(interval)
              resolve(true)
            }
          }, 100)
        })
      })
    }
  }, [href, pathname, target])

  useLayoutEffect(() => {
    return () => {
      unmountFlag.current = true
    }
  }, [])

  return (
    <Link target={target} href={href} onClick={clickHandler} className={className}>
      {children}
    </Link>
  )
}
