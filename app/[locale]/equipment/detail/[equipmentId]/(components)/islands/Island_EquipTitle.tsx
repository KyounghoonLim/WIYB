import { EquipmentType } from "@/src/@types/equipment.types";
import Island from "@/src/components/island/Island";
import React from "react";

export default function Island_EquipTitle({ name, brand, category }: Pick<EquipmentType, "name" | "brand" | "category">) {
  return (
    <Island>
      <div className="flex flex-col gap-2">
        <h1 className="typograph-24 font-bold">{name}</h1>
        <span className="flex-row-start typograph-14 text-@-text-label gap-1">
          <p>#{brand}</p>
          <p>#{category}</p>
        </span>
      </div>
    </Island>
  );
}
