"use client";

import { COOKIE_OPTIONS } from "@/src/constants/cookie.constant";
import { getCookie, setCookie } from "@/src/utils/cookieUtils";
import { useCallback, useMemo } from "react";

export default function useSearch() {
  const getRecentlySearches = useCallback((): { search: string[] } => {
    const cookies = getCookie("recentlySearches");
    try {
      const cookieJSON = JSON.parse(cookies);
      if (!("search" in cookieJSON)) throw 0;
      else return cookieJSON;
    } catch {
      return { search: [] };
    }
  }, []);

  const setRecentlySearches = useCallback((search) => {
    const expiresDate = new Date();
    expiresDate.setDate(expiresDate.getDate() + COOKIE_OPTIONS.EXPIRES_DATE);

    const cookieJSON = getRecentlySearches();
    cookieJSON.search = cookieJSON.search.slice(-(COOKIE_OPTIONS.MAXIMUM_COUNT - 1));
    cookieJSON.search.push(search);
    setCookie("recentlySearches", JSON.stringify(cookieJSON), {
      expires: expiresDate,
    });
  }, []);

  return { getRecentlySearches, setRecentlySearches };
}
