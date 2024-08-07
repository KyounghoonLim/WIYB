"use client";

import { Chart } from "chart.js/auto";
import { useCallback } from "react";

export default function useGraph() {
  const getGraph = useCallback((canvas: HTMLCanvasElement, label: string[] | readonly string[], data?: number[]) => {
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
        layout: {
          padding: 8,
        },
        scales: {
          r: {
            grid: {
              color: "#F5F5F5",
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
          },
        },
      },
      data: {
        labels: [...label],
        datasets: [
          data && {
            label: "data",
            data,
            fill: true,
            backgroundColor: "#00871E1A",
            borderColor: "#00871E",
            pointRadius: 0,
          },
          {
            label: "default",
            data: Array(label?.length).fill(3),
            fill: true,
            backgroundColor: "#C8C8C81A",
            borderColor: "#C8C8C8",
            borderWidth: 2,
            pointRadius: 0,
          },
        ].filter(Boolean),
      },
    });
  }, []);

  return { getGraph };
}
