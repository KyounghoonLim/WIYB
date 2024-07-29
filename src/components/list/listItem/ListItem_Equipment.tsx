import { ListItemProps, ListProps } from "@/src/@types/components/list/list.interface";
import React from "react";
import Thumbnail from "../../thumbnail/Thumbnail";
import Bedge from "../../bedge/Bedge";

export default function ListItem_Equipment<T = any>({ item, idx }: ListItemProps<T>) {
  return (
    <div className="list-item">
      <span className="typograph-16 text-neutral-900">{idx + "."}</span>
      <Thumbnail src={"/images/driver_dummy.png"} width={40} className="rounded-none" />
      <div className="flex flex-col gap-1">
        <h3 className="typograph-14 font-semibold">NAME</h3>
        <div className="flex gap-1">
          <Bedge text="titleist" className="!bedge-sm" />
          <Bedge text="드라이버" className="!bedge-sm" />
          <Bedge text="리뷰 12" className="!bedge-sm" />
        </div>
      </div>
    </div>
  );
}
