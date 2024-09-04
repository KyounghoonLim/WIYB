'use client'

import { EquipmentType } from 'constants/equipment.constant'
import useMyQuery from 'hooks/useMyQuery'
import { createContext, Dispatch, SetStateAction, useCallback, useState } from 'react'
import popularKeys from 'constants/json/popular.keys.constant.json'
import { Equipment } from 'types/equipment.types'
import { getPopularEquipmentApi } from 'services/equipmentApi'

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
      const items = Array(20)
        .fill(await getPopularEquipmentApi())
        .flat() as Equipment[]
      return { total: items }
    }
    /// 타입이 있는 경우 해당 타입으로 조회 ///
    else {
      const items = await getPopularEquipmentApi(category)
      if (!popularKeys[category]) return { total: items }
      else
        return ['total', ...popularKeys[category]].reduce((prev, key) => {
          return { ...prev, [key]: items }
        }, {})
    }
  }, [])

  const { data: popularEquipments, isLoading } = useMyQuery([category], popularEquipmentFetcher)

  return (
    <popularContext.Provider value={{ category, setCategory, popularEquipments, isLoading }}>
      {children}
    </popularContext.Provider>
  )
}
