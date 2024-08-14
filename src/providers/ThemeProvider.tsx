"use client";

import { THEME, ThemeType } from "@/src/constants/theme.constant";
import React, { createContext, Dispatch, SetStateAction, useLayoutEffect, useRef, useState } from "react";

export const themeContext = createContext<{ theme: ThemeType; setTheme: Dispatch<SetStateAction<ThemeType>> }>(null);

export default function ThemeProvider({ children }) {
  const metaRef = useRef<HTMLMetaElement>(null);

  const [theme, setTheme] = useState<ThemeType>(THEME.DEFAULT);

  useLayoutEffect(() => {
    if (metaRef.current) return;
    else {
      metaRef.current = document.getElementsByName("theme-color")[0] as HTMLMetaElement;
    }
  }, []);

  useLayoutEffect(() => {
    if (!metaRef.current) return;
    else {
      metaRef.current.content = theme;
    }
  }, [theme]);

  return <themeContext.Provider value={{ theme, setTheme }}>{children}</themeContext.Provider>;
}
