"use client";

import React, { createContext, useRef } from "react";
import { getCookie } from "../utils/cookieUtils";
import { COOKIE_KEYS } from "../constants/cookie.constant";

export const requestTimeContext = createContext<{ requestTime: string }>(null);

export default function RequestTimeProvider({ children }) {
  const { current: requestTime } = useRef<string>(
    (() => {
      if (!globalThis["window"]) return "";
      else return getCookie(COOKIE_KEYS.REQUEST_TIME);
    })()
  );
  return <requestTimeContext.Provider value={{ requestTime }}>{children}</requestTimeContext.Provider>;
}
