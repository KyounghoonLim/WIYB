'use client'

import { useLayoutEffect, useMemo, useRef, useState } from 'react'

interface IntersectionObserverInit {
  root?: Element | Document | null
  rootMargin?: string
  threshold?: number | number[]
}

type cb = () => any | Promise<any>

export default function useIntersection({
  onEnter = () => console.log('enter'),
  onLeave = () => console.log('leave'),
  delay = 0,
  options = { threshold: [0, 1] },
  condition,
}: {
  onEnter?: cb
  onLeave?: cb
  delay?: number
  options?: IntersectionObserverInit
  condition?: boolean
}) {
  const intersectionRef = useRef<any>(null)
  const [isEntered, setIsEntered] = useState<boolean>(false)
  const [throttle, setThrottle] = useState<any>()

  const observer = useMemo<IntersectionObserver>(() => {
    if (!globalThis['window']) return
    else {
      return new IntersectionObserver(([entry]) => {
        if (throttle || !condition) return
        else {
          switch (entry.isIntersecting) {
            case true: {
              if (isEntered) return
              else {
                setThrottle(
                  setTimeout(() => {
                    setThrottle(null)
                  }, delay)
                )
                setIsEntered(true)
                onEnter()
              }
              break
            }
            case false: {
              if (!isEntered) return
              else {
                setThrottle(
                  setTimeout(() => {
                    setThrottle(null)
                  }, delay)
                )
                setIsEntered(false)
                onLeave()
              }
              break
            }
          }
        }
      }, options)
    }
  }, [onEnter, onLeave, isEntered, throttle, condition])

  useLayoutEffect(() => {
    if (!intersectionRef.current) return
    else {
      observer.observe(intersectionRef.current)

      return () => {
        observer.disconnect()
      }
    }
  }, [intersectionRef.current, observer])

  return { intersectionRef, observer }
}
