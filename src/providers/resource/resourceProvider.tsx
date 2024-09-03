'use client'

import useMyQuery from 'hooks/useMyQuery'
import { createContext } from 'react'
import { getBrandResourceApi, getEquipmentTypeResourceApi } from 'services/resourceApi'
import { Resource_Brand, Resource_EquipmentType } from 'types/resource.types'

export const resourceContext = createContext<{
  brandResource: Resource_Brand[]
  equipmentTypeResource: Resource_EquipmentType[]
}>(null)

export default function ResourceProvider({ children }) {
  const { data: brandResource }: { data: Resource_Brand[] } = useMyQuery(
    ['brand-resource'],
    getBrandResourceApi
  )
  const { data: equipmentTypeResource }: { data: Resource_EquipmentType[] } = useMyQuery(
    ['equipment-type-resource'],
    getEquipmentTypeResourceApi
  )

  return (
    <resourceContext.Provider
      value={{
        brandResource,
        equipmentTypeResource,
      }}
    >
      {children}
    </resourceContext.Provider>
  )
}
