'use client'

import { Chart } from 'chart.js'
import useGraph from 'hooks/graph/useGraph'
import { useCallback, useRef } from 'react'

export default function Graph({
  label,
  data,
  width = 300,
  height = 300,
}: {
  label: string[]
  data: number[]
  width?: number
  height?: number
}) {
  const canvasRef = useRef<HTMLCanvasElement>()
  const graphRef = useRef<Chart>()
  const { initGraph } = useGraph()

  const getGraph = useCallback(
    (element: HTMLCanvasElement) => {
      canvasRef.current = element
      graphRef.current = initGraph(element, label, data)
    },
    [data, label, initGraph]
  )

  return <canvas ref={getGraph} width={width} height={height} />
}
