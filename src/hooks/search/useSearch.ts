"use client";

import { getCookie, setCookie } from "@/src/utils/cookieUtils";
import { useCallback, useMemo } from "react";

export default function useSearch() {
  const getRecentlySearches = useCallback(() => {
    const cookies = getCookie("recentlySearches");
    return cookies;
  }, []);

  const setRecentlySearches = useCallback((search) => {
    const prevCookie = getRecentlySearches();
    setCookie("recentlySearches", prevCookie + search);
  }, []);

  return { getRecentlySearches, setRecentlySearches };
}
