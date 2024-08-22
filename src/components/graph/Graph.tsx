'use client'

import { Chart } from 'chart.js'
import useGraph from 'hooks/graph/useGraph'
import { useCallback, useRef } from 'react'
import { EquipmentEvaluationMetric } from 'types/equipment.types'

export default function Graph({
  evaluationMetric,
  labels,
  width = 300,
  height = 300,
}: {
  evaluationMetric: EquipmentEvaluationMetric
  labels: string[]
  width?: number
  height?: number
}) {
  const canvasRef = useRef<HTMLCanvasElement>()
  const graphRef = useRef<Chart>()
  const { initGraph } = useGraph()

  const getGraph = useCallback((element: HTMLCanvasElement) => {
    canvasRef.current = element
    graphRef.current = initGraph(element, labels, evaluationMetric)
  }, [])

  return <canvas ref={getGraph} width={width} height={height} />
}
