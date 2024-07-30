import React from "react";
import UserThumbnail from "../thumbnail/UserThumbnail";
import Bedge from "../bedge/Bedge";
import { PATH } from "@/src/constants/path.constant";
import Link from "next/link";

export default function UserCardPrimary({ user }) {
  return (
    <Link href={PATH.PROFILE}>
      <article className="card-user-primary">
        <div className="flex w-full gap-3">
          <UserThumbnail src="/images/1200x1200.png" />
          <div className="flex-col items-center typograph-24">
            안녕하세요 👋
            <h3 className="font-bold">제나토리</h3>
          </div>
        </div>
        <div className="flex gap-3 py-[6px]">
          <Bedge text="80+" />
          <Bedge text="180cm/70kg" />
        </div>
      </article>
    </Link>
  );
}
