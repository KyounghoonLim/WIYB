'use client'

import { useLayoutEffect } from 'react'
import { isNull } from '../utils/nullUtils'

export default function useCaptureHistoryBack(callback: () => any, condition?: boolean) {
  useLayoutEffect(() => {
    if (!callback || (!isNull(condition) && !condition)) return
    else {
      console.log('hello')
      const popStateHandler = () => {
        history.pushState(null, '', location.href)
        callback()
      }
      history.pushState(null, '', location.href)
      window.addEventListener('popstate', popStateHandler)
      return () => window.removeEventListener('popstate', popStateHandler)
    }
  }, [callback, condition])
}
