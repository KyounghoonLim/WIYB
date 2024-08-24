'use client'

import useMyQuery from 'hooks/useMyQuery'
import { createContext, ReactNode } from 'react'
import { getEquipmentDetailApi } from 'services/equipmentApi'
import { EquipmentDetail } from 'types/equipment.types'

export const equipmentContext = createContext<{ equipment: EquipmentDetail }>(null)

export default function EquipmentProvider({
  id,
  type,
  children,
}: {
  id: string
  type: string
  children: ReactNode
}) {
  const { data: equipment } = useMyQuery([id, type], getEquipmentDetailApi, {
    enabled: Boolean(id) && Boolean(type),
  })

  return <equipmentContext.Provider value={{ equipment }}>{children}</equipmentContext.Provider>
}
