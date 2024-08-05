"use client";

import { Chart, ChartDataset } from "chart.js/auto";
import { useCallback } from "react";

export default function useGraph() {
  const getGraph = useCallback((canvas: HTMLCanvasElement, label: string[], data?: Pick<ChartDataset, "data">) => {
    return new Chart(canvas, {
      type: "radar",
      options: {
        responsive: false,
        aspectRatio: 1,
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          r: {
            grid: {
              lineWidth: [1, 0, 1, 1, 1, 1],
            },
            ticks: {
              display: false,
            },
          },
        },
      },
      data: {
        labels: label,
        datasets: [
          {
            label: "default",
            data: Array(label?.length).fill(3),
            fill: true,
            backgroundColor: "#C8C8C81A",
            borderColor: "#C8C8C8",
            pointRadius: 0,
          },
        ],
      },
    });
  }, []);

  return { getGraph };
}
