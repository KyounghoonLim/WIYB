'use client'

import React, { useCallback, useState } from 'react'
import usePortal from './usePortal'

export default function useThrottle(overlay?: boolean) {
  const [throttle, setThrottle] = useState<boolean>(false)

  const { attach, detach } = usePortal('overlay')

  const throttling = useCallback(
    async (fn: () => any | Promise<any>) => {
      if (throttle) return
      else {
        try {
          overlay && attach(<div className="loading-overlay" />)
          setThrottle(true)
          return await fn()
        } finally {
          overlay && detach()
          setThrottle(false)
        }
      }
    },
    [throttle, overlay]
  )

  return { throttle, throttling }
}
