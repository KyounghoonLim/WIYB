import Button from "@/src/components/button/Button";
import Graph from "@/src/components/graph/Graph";
import Island from "@/src/components/island/Island";
import React from "react";

export default function Island_EquipGraph() {
  return (
    <Island className="flex flex-col gap-4">
      <div className="flex flex-col gap-6">
        <h3 className="typograph-16 font-bold">평가 지표</h3>
        <Graph />
      </div>
      <Button text="리뷰/평가 등록하기" />
    </Island>
  );
}
