'use client'

import { useLayoutEffect, useMemo, useReducer } from 'react'
import { getCookie, setCookie } from '@/src/utils/cookieUtils'
import { COOKIE_KEYS } from '@/src/constants/cookie.constant'
import { getPopularEquipmentApi } from '@/src/services/equipmentApi'
import useSWRImmutable from 'swr/immutable'

export default function usePopularEquipments() {
  const [flag, refresh] = useReducer((x) => !x, false)

  /// stored popular search keywords ///
  const storedData = useMemo((): string[] => {
    const cookies = getCookie(COOKIE_KEYS.POPULAR_EQUIPMENTS)
    return cookies ? JSON.parse(cookies) : []
  }, [flag])

  const { data } = useSWRImmutable(
    !storedData.length && 'getPopularEquipments',
    getPopularEquipmentApi,
    { shouldRetryOnError: false }
  )

  useLayoutEffect(() => {
    if (!data) return
    else {
      const expireDate = new Date(Date.now() + 3600 * 1000)
      setCookie(COOKIE_KEYS.POPULAR_EQUIPMENTS, JSON.stringify(data), {
        expires: expireDate,
      })

      refresh()
    }
  }, [data])

  return { popularEquipments: storedData }
}
