import { ListProps } from "@/src/@types/components/list/list.interface";
import clsx from "clsx";
import React, { useCallback } from "react";

export default function List({ items, onClick, renderFunction, className }: ListProps) {
  return (
    <ul className={clsx("list", className)}>
      {items.map((item, idx) => (
        <li key={idx}>{renderFunction({ idx, item })}</li>
      ))}
    </ul>
  );
}
