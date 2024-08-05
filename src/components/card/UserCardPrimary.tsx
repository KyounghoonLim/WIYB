import React from "react";
import UserThumbnail from "../thumbnail/UserThumbnail";
import Bedge from "../bedge/Bedge";
import { PATH } from "@/src/constants/path.constant";
import Link from "next/link";
import { UserCardProps } from "@/src/@types/components/card/userCard.interface";

export default function UserCardPrimary({ user }: UserCardProps) {
  return (
    <Link href={PATH.PROFILE}>
      <article className="card-user-primary">
        <div className="flex w-full gap-3">
          <UserThumbnail src={user?.imageUrl || "/images/image_default_profile.png"} />
          <div className="flex-col items-center typograph-24">
            안녕하세요 👋
            <h3 className="font-bold">{user?.nickname || ""}</h3>
          </div>
        </div>
        <div className="flex gap-3 py-[6px]">
          <Bedge text={user?.handy ? `${user.handy}${user.handy > 0 ? "+" : ""}` : "핸디 정보가 없습니다."} />
          <Bedge text={user?.height || user?.weight ? `${user?.height || "???"}cm/${user?.weight || "???"}kg` : "체형 정보가 없습니다."} />
        </div>
      </article>
    </Link>
  );
}
