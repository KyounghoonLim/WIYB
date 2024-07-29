"use client";

import Cookie, { CookieSerializeOptions } from "cookie";
import { getDateBefore } from "./dateUtils";

export { getCookie, setCookie, removeCookie };

function getCookie(key: string) {
  const cookies = Cookie.parse(document.cookie);
  return cookies[key];
}

function setCookie(key: string, value: string, options: CookieSerializeOptions = { path: "/", expires: new Date(Date.now() + 3600000) }) {
  const cookie = Cookie.serialize(key, value, options);
  document.cookie = cookie;
}

function removeCookie(key: string) {
  const cookie = Cookie.serialize(key, "", { expires: getDateBefore(new Date()) });
  document.cookie = cookie;
}
