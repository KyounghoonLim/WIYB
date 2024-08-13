'use client'

import { getPopularEquipmentApi } from '@/src/services/equipmentApi'
import useMySWR from '../useMySWR'

export default function usePopularEquipments() {
  const { data } = useMySWR('getPopularEquipments', getPopularEquipmentApi)

  return { popularEquipments: data }
}
