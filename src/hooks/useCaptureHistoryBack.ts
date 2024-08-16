'use client'

import { useLayoutEffect } from 'react'
import { isNull } from '../utils/nullUtils'

export default function useCaptureHistoryBack(callback: () => any, condition?: boolean) {
  useLayoutEffect(() => {
    if (!callback || (!isNull(condition) && !condition)) return
    else {
      history.pushState(null, '', location.href)
      window.addEventListener('popstate', callback)
      return () => {
        window.removeEventListener('popstate', callback)
      }
    }
  }, [callback, condition])
}
