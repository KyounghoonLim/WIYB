import { NextRequest, NextResponse } from "next/server";
import { localeList } from "s/constants/locale.constant";

export function localeMiddleware(req: NextRequest) {
  const { nextUrl } = req;
  if (localeList.some((locale) => locale === nextUrl.pathname.split("/")[1])) return NextResponse.next();
  else {
    const acceptLanguages = (req.headers.get("Accept-Language") as string).split(";").join(",").split(",");
    const supportedLanguage =
      localeList.find((locale) => {
        return acceptLanguages.find((lang) => {
          return locale === lang;
        });
      }) || "ko";

    nextUrl.pathname = `/${supportedLanguage}` + req.nextUrl.pathname;
    return NextResponse.redirect(nextUrl);
  }
}
