'use client'

import { dummy_searchResultEquipment } from '@/@dummy'
import { EquipmentType } from 'constants/equipment.constant'
import useMyQuery from 'hooks/useMyQuery'
import { createContext, Dispatch, SetStateAction, useState } from 'react'
import popluarEquipmentKeys from 'constants/json/popular.keys.constant.json'

export const popularContext = createContext<{
  type: EquipmentType
  setType: Dispatch<SetStateAction<EquipmentType>>
}>(null)

export default function PopluarProvider({ children }) {
  const [type, setType] = useState<EquipmentType>(null)

  // const { data: popularItemsByType } = useMyQuery([type], (type: EquipmentType) => {
  //   if (!type) {
  //     const top100 = Array(20).fill(dummy_searchResultEquipment).flat()
  //     return top100
  //   } else {
  //     const top5 = dummy_searchResultEquipment
  //     return Promise.resolve(
  //       (popluarEquipmentKeys[type] as object[]).reduce((prev, curr: object) => {
  //         return {
  //           ...prev,
  //           [curr['key']]: {
  //             content: top5,
  //             label: curr['label'],
  //           },
  //         }
  //       }, {})
  //     )
  //   }
  // })

  return <popularContext.Provider value={{ type, setType }}>{children}</popularContext.Provider>
}
