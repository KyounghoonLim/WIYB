"use client";

import { EquipmentEvaluationMetric } from "@/src/@types/equipment.types";
import { evaluationMetricLabels } from "@/src/constants/equipment.constant";
import useGraph from "@/src/hooks/useGraph";
import { Chart } from "chart.js";
import { useLayoutEffect, useRef } from "react";

export default function Graph({ evaluationMetric }: { evaluationMetric: EquipmentEvaluationMetric }) {
  const canvasRef = useRef<HTMLCanvasElement>();
  const graphRef = useRef<Chart>();
  const { getGraph } = useGraph();

  useLayoutEffect(() => {
    graphRef.current = getGraph(canvasRef.current, evaluationMetricLabels, evaluationMetric);
    console.log(graphRef.current);
  }, []);

  return <canvas ref={canvasRef} width={300} height={300} />;
}
