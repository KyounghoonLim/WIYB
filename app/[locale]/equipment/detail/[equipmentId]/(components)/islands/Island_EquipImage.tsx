import React from "react";
import Island from "comp/island/Island";
import Image from "next/image";

export default function Island_EquipImage({ imageUrl }: { imageUrl?: string }) {
  return (
    <Island>
      <div className="w-full h-[192px] flex-row-center">
        <div className="h-full aspect-square relative">
          <Image src={imageUrl || "/images/driver_dummy.png"} alt="" className="bg-cover bg-center" fill quality={100} />
        </div>
      </div>
    </Island>
  );
}
