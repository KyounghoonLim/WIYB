'use client'

import React, { useLayoutEffect } from 'react'
import { isAndroid, isIOS } from 'react-device-detect'

export default function AppSizeController() {
  useLayoutEffect(() => {
    let isTouched = false
    let resizeDebounce

    const touchStartHandler = () => (isTouched = true)
    const touchEndHandler = () => (isTouched = false)

    const resizeHandler = () => {
      if (isTouched) return
      else {
        resizeDebounce && clearTimeout(resizeDebounce)
        resizeDebounce = setTimeout(() => {
          document.documentElement.style.setProperty(
            '--vh',
            `${window.visualViewport.height * 0.01}px`
          )
        }, 16.7)
      }
    }

    resizeHandler()
    window.addEventListener('touchstart', touchStartHandler)
    window.addEventListener('touchend', touchEndHandler)
    window.visualViewport.addEventListener('resize', resizeHandler, { passive: true })

    return () => {
      resizeDebounce && clearTimeout(resizeDebounce)
      window.removeEventListener('touchstart', touchStartHandler)
      window.removeEventListener('touchend', touchEndHandler)
      window.visualViewport.removeEventListener('resize', resizeHandler)
    }
  }, [])

  /// 인앱 브라우저 처리 ///
  useLayoutEffect(() => {
    const inappRegex =
      /KAKAOTALK|Instagram|NAVER|zumapp|Whale|FB|Snapchat|Line|everytimeApp|WhatsApp|Electron|wadiz|AliApp|FB_IAB|FB4A|FBAN|FBIOS|FBSS/
    if (!inappRegex.test(navigator.userAgent)) return
    else {
      const { host, pathname, protocol } = location
      if (isAndroid) {
        window.open(
          `intent://${host + pathname}#Intent;scheme=${protocol.replace(
            ':',
            ''
          )};package=com.android.chrome;end`
        )
      } else if (isIOS) {
        window.open(`googlechrome://${host + pathname}`)
      }
      /// try to close inApp browser ///
      window.close()
      window.location.href = 'kakaotalk://inappbrowser/close'
    }
  }, [isAndroid, isIOS])

  return <></>
}
