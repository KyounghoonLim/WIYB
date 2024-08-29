'use client'

import Graph from 'components/graph/Graph'
import Island from 'components/island/Island'
import React, { useContext, useMemo } from 'react'
import LoadingSpinner from 'components/loading/LoadingSpinner'
import { equipmentContext } from 'providers/EquipmentProvider'
import useMyTranslate from 'hooks/useMyTranslate'

export default function Island_Equipment_Graph() {
  const { evaluationMetricAverage } = useContext(equipmentContext)
  const { t } = useMyTranslate('equipment.evaluation.key')

  const { label, data } = useMemo(() => {
    return {
      label: Object?.keys(evaluationMetricAverage || {}).map(t),
      data: Object?.values(evaluationMetricAverage || {}) as number[],
    }
  }, [evaluationMetricAverage, t])

  return (
    <Island className="w-[268px] h-[264px] rounded-xl p-0">
      {evaluationMetricAverage ? (
        <Graph width={268} height={264} label={label} data={data} />
      ) : (
        <LoadingSpinner />
      )}
    </Island>
  )
}
