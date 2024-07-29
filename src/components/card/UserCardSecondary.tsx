"use client";

import React from "react";
import UserThumbnail from "../thumbnail/UserThumbnail";
import Bedge from "../bedge/Bedge";

export default function UserCardSecondary({ user }) {
  return (
    <article className="card-user-secondary">
      <div className="flex w-full gap-[6px]">
        <UserThumbnail src="/images/1200x1200.png" width={40} />
        <div className="flex flex-col typograph-14 gap-1">
          <h3 className="font-bold">제나토리</h3>
          <div className="flex gap-1">
            <Bedge text="80+" className="!bedge-sm" />
            <Bedge text="180cm/70kg" className="!bedge-sm" />
          </div>
        </div>
      </div>
      <div className="flex flex-col typograph-12">
        <span className="flex gap-[6px] flex-nowrap text-nowrap">
          드라이버
          <p className="font-semibold truncate">Paradym TD</p>
        </span>
        <span className="flex gap-[6px] flex-nowrap text-nowrap">
          우드/유틸
          <p className="font-semibold truncate">Super Hybrid</p>
        </span>
        <span className="flex gap-[6px] flex-nowrap text-nowrap">
          아이언
          <p className="font-semibold truncate">P7MC</p>
        </span>
        <span className="flex gap-[6px] flex-nowrap text-nowrap">
          웨지
          <p className="font-semibold truncate">Vokey SM9</p>
        </span>
        <span className="flex gap-[6px] flex-nowrap text-nowrap">
          퍼터
          <p className="font-semibold truncate">Scotty Cameron Circle T GSS</p>
        </span>
        <span className="flex gap-[6px] flex-nowrap text-nowrap">
          공<p className="font-semibold truncate">Pro V1X</p>
        </span>
      </div>
    </article>
  );
}
