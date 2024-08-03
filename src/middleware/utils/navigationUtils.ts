import { AUTH_REQUIRED_PATH } from "@/src/constants/path.constant";
import { RequestCookies } from "next/dist/compiled/@edge-runtime/cookies";
import { NextURL } from "next/dist/server/web/next-url";
import { COOKIE_KEYS } from "@/src/constants/cookie.constant";
import { jwtDecode } from "jwt-decode";

export { isRequiredAuth, isAuthorized };

function isRequiredAuth(url: NextURL | string) {
  const pathname = typeof url === "string" ? url : url.pathname;
  return AUTH_REQUIRED_PATH.some((path) => pathname.includes(path));
}

function isAuthorized(cookie: RequestCookies) {
  const accessToken = cookie.get(COOKIE_KEYS.ACCESS_TOKEN)?.value;
  const refreshToken = cookie.get(COOKIE_KEYS.REFRESH_TOKEN)?.value;

  if (!accessToken || !refreshToken) return false;
  else {
    const accDecoded = jwtDecode(accessToken);
    const refDecoded = jwtDecode(refreshToken);

    const accSid = accDecoded["sid"] || 0;
    const refSid = refDecoded["sid"] || 1;
    const refExp = refDecoded.exp || 0;

    const currTimeStamp = Date.now() / 1000;

    console.log("sid test: ", accSid === refSid);
    console.log("exp test: ", refExp > currTimeStamp);
    if (accSid !== refSid) return false;
    else if (refExp <= currTimeStamp) return false;
    else return true;
  }
}
