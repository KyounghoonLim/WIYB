import { ListItemProps, ListProps } from "@/src/@types/components/list/list.interface";
import React from "react";
import Thumbnail from "../../thumbnail/Thumbnail";
import Bedge from "../../bedge/Bedge";
import { EquipmentType } from "@/src/@types/equipment.types";

export default function ListItem_Equipment({ item: equip, idx, listing }: ListItemProps<EquipmentType>) {
  return (
    <div className="list-item">
      {listing && <span className="typograph-16 text-neutral-900">{idx + "."}</span>}
      <Thumbnail src={equip?.imageUrl || "/images/driver_dummy.png"} width={40} className="rounded-none" />
      <div className="flex flex-col gap-1">
        <h3 className="typograph-14 font-semibold">{equip?.name || "TSR2"}</h3>
        <div className="flex gap-1">
          <Bedge text={equip?.brand || "titleist"} className="bedge-sm" />
          <Bedge text={equip?.category || "드라이버"} className="bedge-sm" />
          <Bedge text={`리뷰 ${equip?.review?.length || 0}`} className="bedge-sm" />
        </div>
      </div>
    </div>
  );
}
