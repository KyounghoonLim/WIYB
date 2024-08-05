import { EquipmentType } from "@/src/@types/equipment.types";
import Portal from "@/src/components/portal/Portal";
import React from "react";
import BackIcon from "i/icon_back.svg";
import { useRouter } from "next/navigation";

export default function EquipmentDetailNav({ equip }: { equip: EquipmentType }) {
  const { back } = useRouter();
  return (
    <Portal target="nav">
      <div className="w-full flex justify-between items-center">
        <BackIcon onClick={back} />
        <h1 className="mx-auto">{equip?.name || "디테일 페이지"}</h1>
      </div>
    </Portal>
  );
}
