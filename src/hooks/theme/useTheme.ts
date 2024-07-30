"use client";

import { themeContext } from "app/(providers)/ThemeProvider";
import { useContext } from "react";

export default function useTheme() {
  const { setTheme } = useContext(themeContext);
  return { changeTheme: setTheme };
}
