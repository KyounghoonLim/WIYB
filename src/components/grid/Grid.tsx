import { GridProps } from "@/src/@types/components/grid/grid.interface";
import React from "react";

export default function Grid<T>({ items, row = 3, col = 3, renderFunc = DefaultGridItem }: GridProps<T>) {
  return (
    <div
      style={{
        gridTemplateRows: `repeat(${row}, 1fr)`,
        gridTemplateColumns: `repeat(${col}, 1fr)`,
      }}
      className="grid-primary"
    >
      {items.map((item, idx) => (
        <div key={"grid-item-" + idx}>{renderFunc({ item, idx })}</div>
      ))}
    </div>
  );
}

function DefaultGridItem({ item, idx }) {
  return <div id={"grid-item-" + idx}>{item}</div>;
}
