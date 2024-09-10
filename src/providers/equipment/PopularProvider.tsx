'use client'

import { EquipmentType } from 'constants/equipment.constant'
import useMyQuery from 'hooks/useMyQuery'
import { createContext, Dispatch, SetStateAction, useCallback, useState } from 'react'
import equipmentMetricKeys from 'constants/json/popular.keys.constant.json'
import { Equipment } from 'types/equipment.types'
import {
  getPopularEquipment_Top100_Api,
  getPopularEquipment_Top5_Api,
  getPopularEquipment_Metric_Api,
} from 'services/equipmentApi'

export const popularContext = createContext<{
  category: EquipmentType
  setCategory: Dispatch<SetStateAction<EquipmentType>>
  popularEquipments: { [key: string]: Equipment[] }
  isLoading: boolean
}>(null)

export default function PopularProvider({ equipmentType, children }) {
  const [category, setCategory] = useState<EquipmentType>(equipmentType)

  const popularEquipmentFetcher = useCallback(async (category: EquipmentType) => {
    /// 전체 조회인 경우 더미 제공 ///
    if (!category) {
      const all = await getPopularEquipment_Top100_Api()
      return { all }
    }
    /// 타입이 있는 경우 해당 타입으로 조회 ///
    else {
      const all = await (await getPopularEquipment_Top5_Api(category)).slice(0, 5)
      if (!equipmentMetricKeys[category]) return { all }
      else {
        const itemsByMetric = await Promise.all(
          equipmentMetricKeys[category].map(async (metric) => ({
            [metric]: (await getPopularEquipment_Metric_Api(category, metric)).slice(0, 5),
          }))
        )

        return itemsByMetric.reduce(
          (prev, curr) => {
            return { ...prev, ...curr }
          },
          { all }
        )
      }
    }
  }, [])

  const { data: popularEquipments, isLoading } = useMyQuery([category], popularEquipmentFetcher)

  return (
    <popularContext.Provider value={{ category, setCategory, popularEquipments, isLoading }}>
      {children}
    </popularContext.Provider>
  )
}
