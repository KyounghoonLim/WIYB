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
  onClick,
}: {
  children: ReactNode
  href: LinkProps['href']
  target?: HTMLAttributeAnchorTarget
  className?: string
  title?: string
  useLoadingOverlay?: boolean
  /**
   * 링크를 클릭했을 때 callback 함수
   * callback 이 있을 때에는 이 함수가 먼저 실행되며, 실행 이후 리턴값으로 다음 액션을 정함
   * true: 지정된 href 로 이동
   * false: 이동을 보류함
   */
  onClick?: (e?) => boolean | Promise<boolean>
} & LinkProps) {
  const { throttling } = useThrottle(useLoadingOverlay)

  const routeChangedRef = useRef<boolean>(false)
  const callbackFlagRef = useRef<boolean>(false)

  const pathname = usePathname()

  const scrollToTop = useCallback(() => {
    document.scrollingElement.scrollTo({ top: 0 })
  }, [])

  const clickHandler = useCallback(
    async (e) => {
      if (target !== '_self') return
      else {
        if (onClick && !callbackFlagRef.current) {
          e.preventDefault()
          const res = await onClick(e)
          if (!res) return
          else {
            callbackFlagRef.current = true
            e.target.click()
          }
        } else {
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
      }
    },
    [href, pathname, target, throttling, scrollToTop, onClick]
  )

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
