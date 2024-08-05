"use client";

import useGraph from "@/src/hooks/useGraph";
import { Chart } from "chart.js";
import { useLayoutEffect, useRef } from "react";

export default function Graph() {
  const canvasRef = useRef<HTMLCanvasElement>();
  const graphRef = useRef<Chart>();
  const { getGraph } = useGraph();

  useLayoutEffect(() => {
    graphRef.current = getGraph(canvasRef.current, ["비거리", "난이도", "디자인", "정확도", "가격", "관용성"]);
    console.log(graphRef.current);
  }, []);

  return <canvas ref={canvasRef} width={300} height={300} />;
}
