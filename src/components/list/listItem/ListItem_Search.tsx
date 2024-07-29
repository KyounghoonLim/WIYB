import React from "react";
import RecentIcon from "@/public/icons/icon_recent.svg";
import CloseIcon from "@/public/icons/icon_close.svg";

export default function ListItem_Search() {
  return (
    <div className="list-item gap-2">
      <RecentIcon />
      <p className="typograph-14">1234</p>
      <CloseIcon className="ml-auto fill-@-neutral-400" />
    </div>
  );
}
