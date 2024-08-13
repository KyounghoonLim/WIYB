'use client'

import { useLayoutEffect } from 'react'
import useSWRImmutable from 'swr/immutable'

export default function useMySWR(
  key: string | string[] | object,
  fetcher: any,
  onSucceed?,
  onFailed?
) {
  const { data, error } = useSWRImmutable(key, fetcher, { shouldRetryOnError: false })

  useLayoutEffect(() => {
    if (!data) return
    else onSucceed?.(data)
  }, [data, onSucceed])

  useLayoutEffect(() => {
    if (!error) return
    else onFailed?.(error)
  }, [error, onFailed])

  return { data, error }
}
