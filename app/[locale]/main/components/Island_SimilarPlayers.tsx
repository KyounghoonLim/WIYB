import React from "react";
import UserCardSecondary from "s/components/card/UserCardSecondary";
import Carousel from "s/components/carousel/Carousel";

export default function Island_SimilarPlayers() {
  return (
    <section className="ISLAND-CONTAINER bg-transparent px-0">
      <div className="w-full flex justify-between items-center">
        <h3 className="typograph-16">
          나와 <strong className="font-semibold">비슷한 신체의 플레이어</strong>는?
        </h3>
        <span className="typograph-12 text-@-text-label cursor-pointer">더보기</span>
      </div>
      <Carousel name="similar-users" items={[1, 2, 3, 4, 5, 6, 7, 8, 9]} renderFunction={UserCardSecondary} onClick={null} />
    </section>
  );
}
