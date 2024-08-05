"use client";

import React from "react";
import UserThumbnail from "../thumbnail/UserThumbnail";
import Bedge from "../bedge/Bedge";
import { UserCardProps } from "@/src/@types/components/card/userCard.interface";

export default function UserCardSecondary({ user }: UserCardProps) {
  return (
    <article className="card-user-secondary">
      <div className="flex w-full gap-[6px]">
        <UserThumbnail src="/images/image_dummy_profile.png" width={40} />
        <div className="flex flex-col typograph-14 gap-1">
          <h3 className="font-bold">{user?.nickname || "제나토리"}</h3>
          <div className="flex gap-1">
            <Bedge text={user?.handy ? `${user.handy}${user.handy > 0 ? "+" : ""}` : "핸디 정보가 없습니다."} className="bedge-sm" />
            <Bedge
              text={user?.height || user?.weight ? `${user?.height || "???"}cm/${user?.weight || "???"}kg` : "체형 정보가 없습니다."}
              className="bedge-sm"
            />
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
