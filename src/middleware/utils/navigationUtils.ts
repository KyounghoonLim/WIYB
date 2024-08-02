import { AUTH_REQUIRED_PATH } from "@/src/constants/path.constant";
import { NextURL } from "next/dist/server/web/next-url";

export { isRequiredAuth };

function isRequiredAuth(url: NextURL | string) {
  const pathname = typeof url === "string" ? url : url.pathname;
  return AUTH_REQUIRED_PATH.some((path) => pathname.includes(path));
}
