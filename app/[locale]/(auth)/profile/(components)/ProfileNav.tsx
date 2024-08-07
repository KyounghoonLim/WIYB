import Portal from "@/src/components/portal/Portal";
import React from "react";
import BackIcon from "i/icon_back.svg";
import Link from "next/link";
import { PATH } from "@/src/constants/path.constant";

export default function ProfileNav() {
  return (
    <Portal target="nav">
      <div className="w-full flex justify-between items-center relative">
        <Link href={PATH.MAIN} className="absolute left-0">
          <BackIcon />
        </Link>
        <h1 className="mx-auto">프로필 수정하기</h1>
      </div>
    </Portal>
  );
}
