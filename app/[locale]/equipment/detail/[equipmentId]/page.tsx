"use client";

import EquipmentDetailNav from "./(components)/EquipmentDetailNav";
import Island_EquipGraph from "./(components)/islands/Island_EquipGraph";
import Island_EquipImage from "./(components)/islands/Island_EquipImage";
import Island_EquipSpec from "./(components)/islands/Island_EquipSpec";
import Island_EquipTitle from "./(components)/islands/Island_EquipTitle";

export default function EquipmentDetailPage({ equipmentId }: { equipmentId: string }) {
  console.log(equipmentId);

  return (
    <main className="SCROLLABLE-CONTAINER gap-4">
      <EquipmentDetailNav equip={null} />
      <Island_EquipImage imageUrl="/images/driver_dummy.png" />
      <Island_EquipTitle name="TSR" brand="Titlest" category="드라이버" />
      <Island_EquipSpec />
      <Island_EquipGraph />
    </main>
  );
}
