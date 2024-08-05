import Island from "@/src/components/island/Island";
import React from "react";

export default function Island_EquipSpec() {
  return (
    <Island>
      <div className="flex flex-col gap-6">
        <h3 className="typograph-16 font-bold">스펙 옵션</h3>
        <div className="flex flex-col typograph-15 gap-2">
          <span className="flex gap-[6px] flex-nowrap text-nowrap">
            로프트각
            <p className="font-semibold truncate">9, 9.5, 10, 10.5</p>
          </span>
          <span className="flex gap-[6px] flex-nowrap text-nowrap">
            색상
            <p className="font-semibold truncate">레드, 블루, 블랙</p>
          </span>
          <span className="flex gap-[6px] flex-nowrap text-nowrap">
            체적
            <p className="font-semibold truncate">430cc</p>
          </span>
          <span className="flex gap-[6px] flex-nowrap text-nowrap">
            출시연도
            <p className="font-semibold truncate">430cc</p>
          </span>
        </div>
      </div>
    </Island>
  );
}
