import { ListItemProps, ListProps } from "@/src/@types/components/list/list.interface";
import React from "react";
import Thumbnail from "../../thumbnail/Thumbnail";
import Bedge from "../../bedge/Bedge";

export default function ListItem_Community<T = any>({ item, idx }: ListItemProps<T>) {
  return (
    <div className="list-item gap-3">
      <div className="flex flex-col gap-[6px]">
        {/* title */}
        <div className="flex flex-wrap gap-1 typograph-14 text-wrap">
          <h3 className="truncate-line">다골 S200 이랑 X100 이랑 많이 차이 날까요?</h3>
          <span className="text-@-text-comment">[3]</span>
        </div>
        {/* detail */}
        <div className="flex flex-col gap-[2px]">
          <span className="typograph-10 text-@-text-label">14시간 전</span>
          <span className="typograph-10 text-@-text-label">제나토리</span>
        </div>
      </div>
      <Thumbnail src={"/images/driver_dummy.png"} width={64} className="rounded-sm" />
    </div>
  );
}
