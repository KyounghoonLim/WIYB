"use client";

import { themeContext } from "@/src/providers/ThemeProvider";
import { useContext } from "react";

export default function useTheme() {
  const { setTheme } = useContext(themeContext);
  return { changeTheme: setTheme };
}
