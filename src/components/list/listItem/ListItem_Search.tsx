import React from "react";
import RecentIcon from "@/public/icons/icon_recent.svg";
import CloseIcon from "@/public/icons/icon_close.svg";
import { ListItemProps } from "@/src/@types/components/list/list.interface";

export default function ListItem_Search({ item, idx, callback }: ListItemProps<string>) {
  return (
    <div className="list-item gap-2">
      <RecentIcon />
      <p className="typograph-14">{item}</p>
      <CloseIcon className="ml-auto fill-@-neutral-400" onClick={callback} />
    </div>
  );
}
