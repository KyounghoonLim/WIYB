'use client'

import { useContext, useLayoutEffect, useRef } from 'react'
import { queryContext } from '../providers/QueryProvider'
import { QueryKey, useQuery, UseQueryOptions, useSuspenseQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'

export default function useMyQuery<T = any>(
  key: QueryKey,
  fetcher: (...params) => Promise<T>,
  options?: Omit<UseQueryOptions<T>, 'queryKey' | 'queryFn'>,
  onSucceed?: (data: T) => any | Promise<any>,
  onFailed?: (error: AxiosError) => any | Promise<any>
): { data: T; error: unknown; isPending: boolean } {
  const { recognizeRequestTime, defaultErrorHandler } = useContext(queryContext)
  const requestIndex = useRef<number>(recognizeRequestTime())

  const { data, error, isPending } = useQuery<T, AxiosError>({
    queryKey: key,
    queryFn: (key) => fetcher(...key.queryKey),
    retry: false,
    retryOnMount: false,
    ...options,
  })

  useLayoutEffect(() => {
    data && onSucceed?.(data)
  }, [data, onSucceed])

  useLayoutEffect(() => {
    error && (onFailed?.(error) || defaultErrorHandler(error, requestIndex.current))
  }, [error, onFailed, defaultErrorHandler])

  return { data, error, isPending }
}
