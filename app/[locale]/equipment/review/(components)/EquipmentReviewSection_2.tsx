import { Review } from "@/src/@types/review.types";
import Bedge from "@/src/components/bedge/Bedge";
import List from "@/src/components/list/List";
import ListItem_Review from "@/src/components/list/listItem/ListItem_Review";
import React from "react";

export default function EquipmentReviewSection_2({ reviewCount, reviews }: { reviewCount: number; reviews: Review[] }) {
  return (
    <section className="h-full flex flex-col p-4">
      {reviewCount > 0 ? (
        <>
          <div className="flex justify-between items-center h-11">
            <span className="flex typograph-16">
              리뷰
              <p className="font-bold">{reviewCount}</p>개
            </span>
            <Bedge text={"최신순"} />
          </div>
          <List items={reviews} Component={ListItem_Review} />
        </>
      ) : (
        <span className="w-full h-[200px] flex-row-center typograph-14 text-@-text-label">
          등록된 리뷰가 없습니다!
          <br />첫 리뷰를 등록해보세요 🤩
        </span>
      )}
    </section>
  );
}
