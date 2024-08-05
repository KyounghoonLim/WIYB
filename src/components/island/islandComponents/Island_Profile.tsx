"use client";

import UserCardPrimary from "@/src/components/card/UserCardPrimary";
import Island from "@/src/components/island/Island";
import useUser from "@/src/hooks/user/useUser";
import React from "react";

/// 유저 프로필 섹션 ///
export default function Island_Profile() {
  const { user } = useUser();

  return (
    <Island className="bg-transparent px-0 py-4">
      <UserCardPrimary user={user} />
    </Island>
  );
}
