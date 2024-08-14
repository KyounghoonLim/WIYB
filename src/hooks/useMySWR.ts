'use client'

import { useContext, useLayoutEffect, useRef } from 'react'
import useSWRImmutable from 'swr/immutable'
import { SWRContext } from '../providers/SWRProvider'

export default function useMySWR(
  key: string | string[] | object,
  fetcher: (...params) => any | Promise<any>,
  onSucceed?,
  onFailed?
) {
  const { recognizeRequestTime, defaultErrorHandler } = useContext(SWRContext)
  const requestIndex = useRef<number>(recognizeRequestTime())

  const { data, error, isLoading } = useSWRImmutable(
    requestIndex && key,
    (key) => {
      if (typeof key === 'string') return fetcher(key)
      else return fetcher(...Object.values(key))
    },
    {
      shouldRetryOnError: false,
    }
  )

  useLayoutEffect(() => {
    if (!data) return
    else onSucceed?.(data)
  }, [data, onSucceed])

  useLayoutEffect(() => {
    if (!error) return
    else {
      onFailed?.(error) || defaultErrorHandler(error, requestIndex.current)
    }
  }, [error, onFailed])

  return { data, error, isLoading }
}
