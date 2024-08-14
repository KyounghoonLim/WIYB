import EquipGrid from "@/src/components/grid/myEquipment/EquipGrid";
import Island from "@/src/components/island/Island";
import { equipmentLabels } from "@/src/constants/equipment.constant";
import React, { useMemo } from "react";

/// 유저 장비 섹션 ///
export default function Island_Equipments() {
  const items = useMemo(() => {
    return equipmentLabels.map((label) => ({
      label: label,
      image: "",
      brandImage: "",
      name: "",
    }));
  }, []);

  return (
    <Island>
      <div className="w-full flex justify-between items-center">
        <h3 className="typograph-16">
          내가 <strong className="font-semibold">등록한 주전 장비</strong>들이에요 ⛳️
        </h3>
        <span className="typograph-12 text-@-text-label cursor-pointer">더보기</span>
      </div>
      <div className="w-full mt-4">
        <EquipGrid items={items} />
      </div>
    </Island>
  );
}
