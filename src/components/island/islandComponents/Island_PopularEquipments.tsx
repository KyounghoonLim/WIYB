import Button from "@/src/components/button/Button";
import Island from "@/src/components/island/Island";
import List from "@/src/components/list/List";
import ListItem_Equipment from "@/src/components/list/listItem/ListItem_Equipment";
import React from "react";

export default function Island_PopularEquipments() {
  return (
    <Island>
      <div className="w-full">
        <h3 className="typograph-16">
          지금 가장 많이 보는 장비 <strong className="font-semibold">Top 5</strong>
        </h3>
      </div>
      <div className="w-full mt-4">
        {/* <List items={[1, 2, 3, 4, 5]} Component={ListItem_Equipment} /> */}
        <List items={[1, 2, 3, 4, 5]} Component={({ item, idx }) => ListItem_Equipment({ item, idx, listing: true })} />
      </div>
      <Button text="장비 더 보러 가기" className="mt-2 button-secondary" />
    </Island>
  );
}
