'use client'

import { useLayoutEffect, useMemo, useReducer } from 'react'
import { getCookie, setCookie } from '@/src/utils/cookieUtils'
import { COOKIE_KEYS } from '@/src/constants/cookie.constant'
import { getPopularEquipmentApi } from '@/src/services/equipmentApi'
import useMySWR from '../useMySWR'

export default function usePopularEquipments() {
  const { data } = useMySWR('getPopularEquipments', getPopularEquipmentApi)

  return { popularEquipments: data }
}
