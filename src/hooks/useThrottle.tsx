'use client'

import React, { useCallback, useState } from 'react'
import usePortal from './usePortal'

export default function useThrottle(overlay?: boolean) {
  const [throttle, setThrottle] = useState<boolean>(false)

  const { attach, detach } = usePortal('overlay-portal')

  const throttling = useCallback(
    async (fn: () => any) => {
      if (throttle) return
      else {
        try {
          overlay && attach(<div className="loading-overlay" />)
          setThrottle(true)
          await fn()
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
