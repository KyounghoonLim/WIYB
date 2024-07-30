"use client";

import React, { useLayoutEffect, useRef, useState } from "react";
import Input from "@/src/components/Input/Input";
import SearchIcon from "i/icon_search.svg";
import useSearch from "@/src/hooks/search/useSearch";
import CloseIcon from "i/icon_close.svg";
import CloseIconBold from "i/icon_close_bold.svg";
import clsx from "clsx";
import Bedge from "@/src/components/bedge/Bedge";
import List from "@/src/components/list/List";
import ListItem_Search from "@/src/components/list/listItem/ListItem_Search";
import useTheme from "@/src/hooks/theme/useTheme";
import { THEME } from "@/src/constants/theme.constant";

/// 검색 섹션 ///
export default function Island_Search() {
  const [search, setSearch] = useState<string>("");
  const [isFocus, setIsFocus] = useState<boolean>(false);

  const { getRecentlySearches, setRecentlySearches } = useSearch();
  const { changeTheme } = useTheme();

  useLayoutEffect(() => {
    if (!isFocus) {
      document.body.classList.remove("overflow-hidden");
      changeTheme(THEME.DEFAULT);
    } else {
      document.body.classList.add("overflow-hidden");
      changeTheme(THEME.WHITE);
    }
  }, [isFocus]);

  return (
    <section className={clsx(isFocus ? "SEARCH-CONTAINER" : "ISLAND-CONTAINER bg-transparent px-0 pt-3")}>
      <div className={clsx(isFocus && "CONTENT-CONTAINER pt-2 px-2")}>
        <article className="w-full flex gap-1 pr-2">
          {isFocus && <CloseIconBold width={44} height={44} className="shrink-0 grow-0 cursor-pointer fill-@-neutral-900" onClick={() => setIsFocus(false)} />}
          <Input
            value={search}
            onChange={setSearch}
            placeholder="장비, 플레이어를 검색해보세요 🧐"
            className={isFocus && "bg-@-bg-light"}
            icon={!isFocus && SearchIcon}
            maxLength={null}
            onFocus={() => setIsFocus(true)}
          />
        </article>
        {isFocus && (
          <>
            <section className="flex flex-col px-2 py-6 pb-4 gap-6">
              <h3 className="typograph-16">
                지금 <strong className="font-semibold">인기 검색어</strong>에요
              </h3>
              <div className="flex gap-2">
                <Bedge text="TSR2" />
                <Bedge text="T100" />
                <Bedge text="120 S400" />
              </div>
            </section>
            <section className="flex flex-col px-2 py-6 pb-4">
              <div className="w-full flex justify-between items-center">
                <h3 className="typograph-16">
                  <strong className="font-semibold">최근 검색</strong>
                </h3>
                <span className="typograph-12 text-@-text-label cursor-pointer">전체 삭제</span>
              </div>
              <List items={[1, 2, 3, 4]} renderFunction={ListItem_Search} onClick={null} />
            </section>
          </>
        )}
      </div>
    </section>
  );
}
