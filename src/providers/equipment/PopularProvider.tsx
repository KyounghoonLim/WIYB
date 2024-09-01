'use client'

import { dummy_searchResultEquipment } from '@/@dummy'
import { EquipmentType } from 'constants/equipment.constant'
import useMyQuery from 'hooks/useMyQuery'
import { createContext, Dispatch, SetStateAction, useCallback, useState } from 'react'
import popularKeys from 'constants/json/popular.keys.constant.json'
import { Equipment } from 'types/equipment.types'
import { getPopularEquipmentApi } from 'services/equipmentApi'

export const popularContext = createContext<{
  type: EquipmentType
  setType: Dispatch<SetStateAction<EquipmentType>>
  popularEquipments: { [key: string]: Equipment[] }
  isLoading: boolean
}>(null)

export default function PopularProvider({ children }) {
  const [type, setType] = useState<EquipmentType>(null)

  const popularEquipmentFetcher = useCallback(async (type: EquipmentType) => {
    /// 전체 조회인 경우 더미 제공 ///
    if (!type) {
      const items = Array(20)
        .fill(await getPopularEquipmentApi())
        .flat() as Equipment[]
      return { total: items }
    }
    /// 타입이 있는 경우 해당 타입으로 조회 ///
    else {
      const items = await getPopularEquipmentApi(type)
      if (!popularKeys[type]) return { total: items }
      else
        return ['total', ...popularKeys[type]].reduce((prev, key) => {
          return { ...prev, [key]: items }
        }, {})
    }
  }, [])

  const { data: popularEquipments, isLoading } = useMyQuery([type], popularEquipmentFetcher)

  return (
    <popularContext.Provider value={{ type, setType, popularEquipments, isLoading }}>
      {children}
    </popularContext.Provider>
  )
}
