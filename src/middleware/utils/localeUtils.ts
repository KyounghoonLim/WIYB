import { localeList } from "@/src/constants/locale.constant";
import { NextURL } from "next/dist/server/web/next-url";
import { NextRequest } from "next/server";

export { isPathnameHasLocale, getSupportedLocale };

function isPathnameHasLocale(url: NextURL | string) {
  const pathname = typeof url === "string" ? url : url.pathname;
  return localeList.some((locale) => locale === pathname.split("/")[1]);
}

function getSupportedLocale(req: NextRequest) {
  const acceptLanguages = (req.headers.get("Accept-Language") as string).split(";").join(",").split(",");
  const supportedLanguage =
    localeList.find((locale) => {
      return acceptLanguages.find((lang) => {
        return locale === lang;
      });
    }) || "ko";

  return supportedLanguage;
}
