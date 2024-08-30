'use client'

import { dummy_searchResultEquipment } from '@/@dummy'
import { EQUIPMENT_TYPE, EquipmentType } from 'constants/equipment.constant'
import useMyQuery from 'hooks/useMyQuery'
import { createContext, Dispatch, SetStateAction, useCallback, useState } from 'react'
import popularKeys from 'constants/json/popular.keys.constant.json'
import { Equipment } from 'types/equipment.types'

export const popularContext = createContext<{
  type: EquipmentType
  setType: Dispatch<SetStateAction<EquipmentType>>
  popularEquipments: { [key: string]: Equipment[] }
}>(null)

export default function PopluarProvider({ children }) {
  const [type, setType] = useState<EquipmentType>(null)

  const dummyFetcher = useCallback((type: EquipmentType) => {
    if (!type) {
      const items = Array(20).fill(dummy_searchResultEquipment).flat() as Equipment[]
      return { total: items }
    } else {
      const items = dummy_searchResultEquipment as Equipment[]
      if (!popularKeys[type]) return { total: items }
      else
        return ['total', ...popularKeys[type]].reduce((prev, key) => {
          return { ...prev, [key]: items }
        }, {})
    }
  }, [])

  const { data: popularEquipments } = useMyQuery([type], dummyFetcher)

  return (
    <popularContext.Provider value={{ type, setType, popularEquipments }}>
      {children}
    </popularContext.Provider>
  )
}
