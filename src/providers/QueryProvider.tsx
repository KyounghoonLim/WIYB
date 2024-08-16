'use client'

import { AxiosError } from 'axios'
import { createContext, useCallback, useRef } from 'react'
import { setCookie } from '../utils/cookieUtils'
import { COOKIE_KEYS } from '../constants/cookie.constant'
import { PATH } from '../constants/path.constant'
import useMyMap from '../hooks/useMyMap'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

export const queryContext = createContext<{ recognizeRequestTime; defaultErrorHandler }>(null)

export default function QueryProvider({ children }) {
  /// request time 기록 ///
  const { getItem, setItem } = useMyMap()
  const lastErrorHandledTime = useRef<number>(0)
  const currRequestIndex = useRef<number>(0)

  const recognizeRequestTime = useCallback(() => {
    setItem(currRequestIndex.current, Date.now())
    return currRequestIndex.current++
  }, [])

  const defaultErrorHandler = useCallback((err: AxiosError, requestIndex: number) => {
    if (err?.response?.data?.['status'] !== 401) return
    else {
      if (getItem(requestIndex) - lastErrorHandledTime.current < 100) return
      else {
        lastErrorHandledTime.current = getItem(requestIndex)
        window.alert('로그인 정보가 만료되었습니다.\n로그인페이지로 이동합니다.')
        setCookie(COOKIE_KEYS.REMOVE_SESSION, 'true')
        location.replace(PATH.LOGIN)
      }
    }
  }, [])

  return (
    <QueryClientProvider client={new QueryClient()}>
      <queryContext.Provider value={{ recognizeRequestTime, defaultErrorHandler }}>
        {children}
      </queryContext.Provider>
    </QueryClientProvider>
  )
}
