"use client";

import { COOKIE_OPTIONS } from "@/src/constants/cookie.constant";
import { getCookie, removeCookie, setCookie } from "@/src/utils/cookieUtils";
import { useCallback, useMemo, useReducer } from "react";

export default function useSearch() {
  const [flag, refresh] = useReducer((x) => !x, false);

  const getRecentlySearches = useMemo((): { search: string[] } => {
    const cookies = getCookie("recentlySearches");
    try {
      const cookieJSON = JSON.parse(cookies);
      if (!("search" in cookieJSON)) throw 0;
      else return cookieJSON;
    } catch {
      return { search: [] };
    }
  }, [flag]);

  const setRecentlySearches = useCallback(
    (search: string) => {
      const expiresDate = new Date();
      expiresDate.setDate(expiresDate.getDate() + COOKIE_OPTIONS.EXPIRES_DATE);

      const cookieJSON = getRecentlySearches;
      cookieJSON.search = cookieJSON.search.slice(-(COOKIE_OPTIONS.MAXIMUM_COUNT - 1));
      cookieJSON.search.push(search);
      setCookie("recentlySearches", JSON.stringify(cookieJSON), {
        expires: expiresDate,
      });

      refresh();
    },
    [getRecentlySearches]
  );

  const removeRecentlySearch = useCallback(
    (search: string) => {
      const expiresDate = new Date();
      expiresDate.setDate(expiresDate.getDate() + COOKIE_OPTIONS.EXPIRES_DATE);

      const cookieJSON = getRecentlySearches;
      cookieJSON.search = cookieJSON.search.reduce((prev, curr) => (curr === search ? prev : [...prev, curr]), []);

      setCookie("recentlySearches", JSON.stringify(cookieJSON), {
        expires: expiresDate,
      });

      refresh();
    },
    [getRecentlySearches]
  );

  const removeAllRecentlySearch = useCallback(() => {
    removeCookie("recentlySearches");
    refresh();
  }, []);

  return { getRecentlySearches, setRecentlySearches, removeRecentlySearch, removeAllRecentlySearch };
}
