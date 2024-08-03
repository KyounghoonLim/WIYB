"use client";

import UserCardPrimary from "@/src/components/card/UserCardPrimary";
import useUser from "@/src/hooks/user/useUser";
import React from "react";

/// 유저 프로필 섹션 ///
export default function Island_Profile() {
  const { user } = useUser();

  return (
    <section className="ISLAND-CONTAINER bg-transparent px-0 py-4">
      <UserCardPrimary user={user} />
    </section>
  );
}
