"use client";

import React, { useCallback, useLayoutEffect, useMemo, useState } from "react";
import Input from "@/src/components/Input/Input";
import SearchIcon from "i/icon_search.svg";
import useSearch from "@/src/hooks/search/useSearch";
import CloseIconBold from "i/icon_close_bold.svg";
import clsx from "clsx";
import useTheme from "@/src/hooks/theme/useTheme";
import { THEME } from "@/src/constants/theme.constant";
import Form from "@/src/components/form/Form";
import Button from "@/src/components/button/Button";
import SearchSection_Before from "@/src/components/search/SearchSection_Before";
import { SearchResult } from "@/src/@types/search.types";
import { SEARCH_PROGRESS } from "@/src/constants/search.constant";
import LoadingSpinner from "@/src/components/loading/LoadingSpinner";
import SearchSection_After from "@/src/components/search/SearchSection_After";
import Island from "@/src/components/island/Island";

/// 검색 섹션 ///
export default function Island_Search() {
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [searchResult, setSearchResult] = useState<SearchResult>();

  const { searchHistory, removeSearchHistory, removeAllSearchHistory, getSearchResult } = useSearch();
  const { changeTheme } = useTheme();

  const searchProgress = useMemo(() => {
    if (isLoading) return SEARCH_PROGRESS.LOADING;
    else if (!isFocus) return SEARCH_PROGRESS.HIDDEN;
    else if (!searchResult) return SEARCH_PROGRESS.BEFORE_SEARCH;
    else return SEARCH_PROGRESS.AFTER_SEARCH;
  }, [isFocus, isLoading, searchResult]);

  const closeSearchIsland = useCallback(() => {
    setIsFocus(false);
    setIsLoading(false);
    setSearchKeyword("");
    setSearchResult(null);
  }, []);

  const search = useCallback(
    async (searchKeyword: string) => {
      if (isLoading) return;
      else {
        try {
          setSearchKeyword(searchKeyword);
          setIsLoading(true);
          const searchResult = await getSearchResult(searchKeyword);
          setSearchResult(searchResult);
        } catch {
          /// pass
        } finally {
          setIsLoading(false);
        }
      }
    },
    [isLoading, getSearchResult]
  );

  useLayoutEffect(() => {
    if (!isFocus) {
      document.body.classList.remove("overflow-hidden");
      changeTheme(THEME.DEFAULT);
    } else {
      document.body.classList.add("overflow-hidden");
      changeTheme(THEME.WHITE);
    }
  }, [isFocus, changeTheme]);

  return (
    <Island className={clsx(isFocus ? "!SEARCH-CONTAINER" : "bg-transparent px-0 pt-3")}>
      <div className={clsx(isFocus && "CONTENT-CONTAINER pt-2 px-2")}>
        <article className="w-full">
          <Form onSubmit={() => search(searchKeyword)} className="w-full flex gap-1 pr-2 flex-row">
            {isFocus && (
              <>
                <CloseIconBold width={44} height={44} className="shrink-0 grow-0 cursor-pointer fill-@-neutral-900" onClick={closeSearchIsland} />
                <Button type="submit" className="hidden" />
              </>
            )}
            <Input
              value={searchKeyword}
              onChange={setSearchKeyword}
              placeholder="장비, 플레이어를 검색해보세요 🧐"
              className={isFocus && "bg-@-bg-light"}
              icon={!isFocus && SearchIcon}
              maxLength={null}
              onFocus={() => setIsFocus(true)}
            />
          </Form>
        </article>
        <article>
          {searchProgress === SEARCH_PROGRESS.HIDDEN ? (
            <></>
          ) : searchProgress === SEARCH_PROGRESS.LOADING ? (
            <LoadingSpinner />
          ) : searchProgress === SEARCH_PROGRESS.BEFORE_SEARCH ? (
            <SearchSection_Before {...{ searchHistory, removeSearchHistory, removeAllSearchHistory, search }} />
          ) : (
            <SearchSection_After searchKeyword={searchKeyword} searchResult={searchResult} />
          )}
        </article>
      </div>
    </Island>
  );
}
