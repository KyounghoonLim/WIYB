import { Equipment } from "@/src/@types/equipment.types";
import Island from "@/src/components/island/Island";
import React from "react";

export default function Island_EquipTitle({ name, brand, type }: Pick<Equipment, "name" | "brand" | "type">) {
  return (
    <Island>
      <div className="flex flex-col gap-2">
        <h1 className="typograph-24 font-bold">{name}</h1>
        <span className="flex-row-start typograph-14 text-@-text-label gap-1">
          <p>#{brand}</p>
          <p>#{type}</p>
        </span>
      </div>
    </Island>
  );
}
