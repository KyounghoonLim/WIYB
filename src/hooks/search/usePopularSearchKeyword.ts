"use client";

import { useLayoutEffect, useMemo, useReducer } from "react";
import { getCookie, setCookie } from "@/src/utils/cookieUtils";
import { COOKIE_KEYS } from "@/src/constants/cookie.constant";
import useSWR from "swr";
import { getPopularKeywordsApi } from "@/src/services/searchApi";

export default function usePopularSearchKeywords() {
  const [flag, refresh] = useReducer((x) => !x, false);

  /// stored popular search keywords ///
  const storedData = useMemo((): string[] => {
    const cookies = getCookie(COOKIE_KEYS.POPULAR_SEARCH_KEYWORDS);
    return cookies ? JSON.parse(cookies) : [];
  }, [flag]);

  const { data } = useSWR(!storedData.length && "getPopularSearchKeywords", getPopularKeywordsApi);

  useLayoutEffect(() => {
    if (!data) return;
    else {
      const expireDate = new Date(Date.now() + 3600 * 1000);
      setCookie(COOKIE_KEYS.POPULAR_SEARCH_KEYWORDS, JSON.stringify(data), {
        expires: expireDate,
      });

      refresh();
    }
  }, [data]);

  return { popularSearchKeywords: storedData };
}
