import { ListProps } from "@/src/@types/components/list/list.interface";
import clsx from "clsx";
import React, { useCallback } from "react";

export default function List({ items, Component, className }: ListProps) {
  return (
    <ul className={clsx("list", className)}>
      {items.map((item, idx) => (
        <li key={idx}>
          <Component {...{ item, idx }} />
        </li>
      ))}
    </ul>
  );
}
