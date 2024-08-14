import { IslandProps } from "@/src/@types/components/island/island.interface";
import clsx from "clsx";
import React from "react";

export default function Island({ children, className }: IslandProps) {
  return <article className={clsx("ISLAND-CONTAINER", className)}>{children}</article>;
}
