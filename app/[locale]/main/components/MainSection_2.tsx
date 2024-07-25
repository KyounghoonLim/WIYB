"use client";

import React, { useState } from "react";
import Input from "@/src/components/Input/Input";
import SearchIcon from "i/icon_search.svg";

/// 검색 섹션 ///
export default function MainSection_2() {
  const [search, setSearch] = useState<string>("");

  return (
    <section className="w-full h-[64px] flex-row-center">
      <Input value={search} onChange={setSearch} placeholder="장비, 플레이어를 검색해보세요 🧐" icon={SearchIcon} maxLength={null} />
    </section>
  );
}
