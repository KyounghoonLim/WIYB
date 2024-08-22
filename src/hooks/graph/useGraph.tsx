'use client'

import { Chart } from 'chart.js/auto'
import { useCallback } from 'react'
import { customLabelPlugin } from './plugin/label/customLabelPlugin'

export default function useGraph() {
  const initGraph = useCallback(
    (canvas: HTMLCanvasElement, label: string[] | readonly string[], data?: number[]) => {
      return new Chart(canvas, {
        type: 'radar',
        plugins: [customLabelPlugin],
        options: {
          responsive: false,
          aspectRatio: 1,
          plugins: {
            legend: {
              display: false,
            },
          },
          layout: {
            padding: 16,
          },
          scales: {
            r: {
              grid: {
                color: '#F5F5F5',
              },
              angleLines: {
                display: false,
              },
              ticks: {
                display: false,
                stepSize: 1,
              },
              suggestedMin: 0,
              suggestedMax: 5,
              pointLabels: {
                color: 'transparent',
                font: {
                  size: 14,
                },
              },
              //@ts-ignore
              labels: () => {
                return label.map((l, idx) => {
                  return [l, data[idx]?.toString()]
                })
              },
            },
          },
        },
        data: {
          datasets: [
            data && {
              label: 'data',
              data,
              fill: true,
              backgroundColor: '#00871E1A',
              borderColor: '#00871E',
              pointRadius: 0,
            },
            {
              label: 'default',
              data: Array(label?.length).fill(3),
              fill: true,
              backgroundColor: '#C8C8C81A',
              borderColor: '#C8C8C8',
              borderWidth: 2,
              pointRadius: 0,
            },
          ].filter(Boolean),
        },
      })
    },
    []
  )

  return { initGraph }
}
