"use client";

import Cookie, { CookieSerializeOptions } from "cookie";

export { getCookie, setCookie, removeCookie };

function getCookie(key: string) {
  if (!globalThis["window"]) return;
  else {
    const cookies = Cookie.parse(document.cookie);
    return cookies[key];
  }
}

function setCookie(key: string, value: string, options: CookieSerializeOptions = { path: "/" }) {
  const cookie = Cookie.serialize(key, value, options);
  document.cookie = cookie;
}

function removeCookie(key: string) {
  const cookie = Cookie.serialize(key, getCookie(key), { maxAge: 0 });
  document.cookie = cookie;
}
