'use client'

import Graph from 'components/graph/Graph'
import Island from 'components/island/Island'
import React, { useContext } from 'react'
import LoadingSpinner from 'components/loading/LoadingSpinner'
import { equipmentContext } from 'providers/EquipmentProvider'
import { evaluationMetricLabels } from 'constants/equipment.constant'

export default function Island_Equipment_Graph() {
  const { equipment } = useContext(equipmentContext)

  return (
    <Island className="w-[268px] h-[264px] rounded-xl p-0">
      {equipment?.evaluationMetricAverage ? (
        <Graph
          width={268}
          height={264}
          evaluationMetric={[3, 3.5, 4.2, 4.5, 2.8, 5]}
          labels={[...evaluationMetricLabels]}
          // evaluationMetric={equipment.evaluationMetricAverage}
        />
      ) : (
        <LoadingSpinner />
      )}
    </Island>
  )
}
