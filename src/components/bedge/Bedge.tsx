import { BedgeProps } from "@/src/@types/components/bedge/bedge.interface";
import { convertStringToTSX } from "@/src/utils/convertStringToJSX";
import clsx from "clsx";
import React, { useMemo } from "react";

export default function Bedge({ text, icon, className }: BedgeProps) {
  const IconElement = useMemo(() => {
    if (!icon) return <></>;
    else return icon({ className: "shrink-0 grow-0" });
  }, [icon]);

  const TextElement = useMemo(() => {
    if (!text) return "";
    else {
      return convertStringToTSX(text, "font-black");
    }
  }, [text]);

  return (
    <span className={clsx("bedge", className)}>
      {IconElement}
      {TextElement}
    </span>
  );
}
