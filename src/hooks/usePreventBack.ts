'use client'

import { useLayoutEffect } from 'react'

export default function usePreventBack() {
  useLayoutEffect(() => {
    history.pushState(null, null, location.pathname)

    let isForward = false

    const popstateHandler = () => {
      if (isForward) {
        isForward = false
      } else {
        isForward = true
        history.forward()
        if (window.confirm('정말로 나가시겠습니까?\n작성중인 내용은 저장되지 않습니다.')) {
          history.go(-2)
        }
      }
    }
    window.addEventListener('popstate', popstateHandler)
    return () => {
      window.removeEventListener('popstate', popstateHandler)
    }
  }, [])
}
