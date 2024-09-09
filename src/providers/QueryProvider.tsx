'use client'

import { AxiosError } from 'axios'
import { createContext, ReactNode, useCallback, useRef } from 'react'
import useMyMap from 'hooks/useMyMap'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

export const queryContext = createContext<{
  recognizeRequestTime: () => number
  defaultErrorHandler: (err: AxiosError, idx: number) => void
}>(null)

export default function QueryProvider({ children }: { children: ReactNode }) {
  /// request time 기록 ///
  const { getItem, setItem } = useMyMap()
  const lastErrorHandledTime = useRef<number>(0)
  const currRequestIndex = useRef<number>(0)

  const recognizeRequestTime = useCallback(() => {
    setItem(currRequestIndex.current, Date.now())
    return currRequestIndex.current++
  }, [setItem])

  const isTooClose = useCallback(
    (requestIndex: number) => getItem(requestIndex) - lastErrorHandledTime.current < 100,
    [getItem]
  )

  const defaultErrorHandler = useCallback(
    (err: AxiosError, requestIndex: number) => {
      console.log('is too close latest handled error?', isTooClose(requestIndex))
      return
    },
    [isTooClose]
  )

  return (
    <QueryClientProvider client={new QueryClient()}>
      <queryContext.Provider value={{ recognizeRequestTime, defaultErrorHandler }}>
        {children}
      </queryContext.Provider>
    </QueryClientProvider>
  )
}
