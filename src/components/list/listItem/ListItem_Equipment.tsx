import { ListItemProps } from "@/src/@types/components/list/list.interface";
import React from "react";
import Thumbnail from "../../thumbnail/Thumbnail";
import Bedge from "../../bedge/Bedge";
import { Equipment } from "@/src/@types/equipment.types";
import { PATH } from "@/src/constants/path.constant";
import Link from "next/link";

export default function ListItem_Equipment({ item: equip, idx, listing }: ListItemProps<Equipment>) {
  return (
    <Link href={PATH.EQUIPMENT_DETAIL + `?id=${equip?.id}`} className="list-item">
      {listing && <span className="typograph-16 text-neutral-900">{idx + "."}</span>}
      <Thumbnail src={equip?.imageUrls?.[0] || "/images/driver_dummy.png"} width={40} className="rounded-none" />
      <div className="flex flex-col gap-1">
        <h3 className="typograph-14 font-semibold">{equip?.name || "TSR2"}</h3>
        <div className="flex gap-1">
          <Bedge text={equip?.brand || "titleist"} className="bedge-sm" />
          <Bedge text={equip?.type || "드라이버"} className="bedge-sm" />
          <Bedge text={`리뷰 ${equip?.reviewCount || 0}`} className="bedge-sm" />
        </div>
      </div>
    </Link>
  );
}
