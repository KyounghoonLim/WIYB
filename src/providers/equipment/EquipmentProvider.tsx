'use client'

import useMyQuery from 'hooks/useMyQuery'
import { createContext, ReactNode, useMemo } from 'react'
import { getEquipmentDetailApi } from 'services/equipmentApi'
import { EquipmentDetail, EquipmentEvaluationMetricAverage } from 'types/equipment.types'
import { exceptNull } from 'utils/nullUtils'

export const equipmentContext = createContext<{
  equipment: EquipmentDetail
  evaluationMetricAverage: EquipmentEvaluationMetricAverage
}>(null)

export default function EquipmentProvider({
  equipmentType,
  equipmentId,
  children,
}: {
  equipmentType: string
  equipmentId: string
  children: ReactNode
}) {
  const { data: equipment } = useMyQuery([equipmentId, equipmentType], getEquipmentDetailApi, {
    enabled: Boolean(equipmentId) && Boolean(equipmentType),
  })

  const evaluationMetricAverage = useMemo(
    () => exceptNull(equipment?.evaluationMetricAverage),
    [equipment]
  )

  return (
    <equipmentContext.Provider value={{ equipment, evaluationMetricAverage }}>
      {children}
    </equipmentContext.Provider>
  )
}
