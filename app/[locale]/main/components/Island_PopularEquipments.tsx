import Button from "@/src/components/button/Button";
import List from "@/src/components/list/List";
import ListItem_Equipment from "@/src/components/list/listItem/ListItem_Equipment";
import React from "react";
import UserCardSecondary from "s/components/card/UserCardSecondary";
import Carousel from "s/components/carousel/Carousel";

export default function Island_PopularEquipments() {
  return (
    <section className="ISLAND-CONTAINER">
      <div className="w-full">
        <h3 className="typograph-16">
          지금 가장 많이 보는 장비 <strong className="font-semibold">Top 5</strong>
        </h3>
      </div>
      <div className="w-full mt-4">
        <List items={[1, 2, 3, 4, 5]} onClick={null} renderFunction={ListItem_Equipment} />
      </div>
      <Button text="장비 더 보러 가기" className="mt-2 button-secondary" />
    </section>
  );
}
