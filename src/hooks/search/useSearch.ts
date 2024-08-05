"use client";

import { COOKIE_KEYS, COOKIE_OPTIONS } from "@/src/constants/cookie.constant";
import { searchApi } from "@/src/services/searchApi";
import { getCookie, removeCookie, setCookie } from "@/src/utils/cookieUtils";
import { useCallback, useMemo, useReducer } from "react";

export default function useSearch() {
  const [flag, refresh] = useReducer((x) => !x, false);

  /// search histories ///
  const searchHistory = useMemo((): string[] => {
    const cookies = getCookie(COOKIE_KEYS.RECENTLY_SEARCHES);
    try {
      const cookieJSON = JSON.parse(cookies);
      if (!("search" in cookieJSON)) throw 0;
      else return cookieJSON.search;
    } catch {
      return [];
    }
  }, [flag]);

  const setSearchHistory = useCallback(
    (searchKeyword: string) => {
      const expiresDate = new Date();
      expiresDate.setDate(expiresDate.getDate() + COOKIE_OPTIONS.EXPIRES_DATE);

      const cookieObj = {};
      let _searchHistory = [...searchHistory];

      /// 이미 검색어 리스트에 있으면, 삭제하고 최신으로 올림 ///
      if (_searchHistory.includes(searchKeyword)) {
        _searchHistory = _searchHistory.reduce((prev, curr) => {
          if (curr === searchKeyword) return prev;
          else return [...prev, curr];
        }, []);
      }
      /// 검색어 리스트에 없는 경우 최대 검색어 저장갯수 (default: 15) 에 맞추어서 최신으로 올림 ///
      else {
        _searchHistory = _searchHistory.slice(-(COOKIE_OPTIONS.MAXIMUM_COUNT - 1));
      }
      _searchHistory.push(searchKeyword);
      cookieObj["search"] = _searchHistory.reverse();

      setCookie(COOKIE_KEYS.RECENTLY_SEARCHES, JSON.stringify(cookieObj), {
        expires: expiresDate,
      });

      refresh();
    },
    [searchHistory]
  );

  const removeSearchHistory = useCallback(
    (searchKeyword: string) => {
      const expiresDate = new Date();
      expiresDate.setDate(expiresDate.getDate() + COOKIE_OPTIONS.EXPIRES_DATE);

      const cookieObj = {};
      let _searchHistory = [...searchHistory];
      _searchHistory = _searchHistory.reduce((prev, curr) => (curr === searchKeyword ? prev : [...prev, curr]), []);

      cookieObj["search"] = _searchHistory;
      setCookie(COOKIE_KEYS.RECENTLY_SEARCHES, JSON.stringify(cookieObj), {
        expires: expiresDate,
      });

      refresh();
    },
    [searchHistory]
  );

  const removeAllSearchHistory = useCallback(() => {
    removeCookie(COOKIE_KEYS.RECENTLY_SEARCHES);
    refresh();
  }, []);

  /// get search result ///
  const getSearchResult = useCallback(
    async (searchKeyword: string, callback?: () => any | Promise<any>) => {
      if (searchKeyword.length < 2) {
        alert("두 글자 이상부터 검색이 가능합니다.");
      } else {
        try {
          const searchResult = await searchApi(searchKeyword);
          setSearchHistory(searchKeyword);
          return searchResult;
        } catch (err) {
          throw err;
        } finally {
          callback && callback();
        }
      }
    },
    [setSearchHistory]
  );

  return { searchHistory, setSearchHistory, removeSearchHistory, removeAllSearchHistory, getSearchResult };
}
