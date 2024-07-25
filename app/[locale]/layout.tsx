"use client";

import { createContext } from "react";
import { LocaleType } from "@/src/@types/locale.types";

export const localeContext = createContext<{ locale: LocaleType }>({ locale: null });

export default function LocaleProvider({ params: { locale }, children }: { params: { locale: LocaleType }; children: React.ReactNode }) {
  return <localeContext.Provider value={{ locale }}>{children}</localeContext.Provider>;
}
