export { COOKIE_OPTIONS, COOKIE_KEYS };

const COOKIE_OPTIONS = {
  MAXIMUM_COUNT: 15,
  EXPIRES_DATE: 15,
} as const;

const COOKIE_KEYS = {
  RECENTLY_SEARCHES: "rs",
  POPULAR_SEARCH_KEYWORDS: "psk",
  POPULAR_EQUIPMENTS: "pe",
  USER: "us",
  ACCESS_TOKEN: "access",
  REFRESH_TOKEN: "refresh",
  /// REQUEST ID ///
  REQUEST_TIME: "rtime",
} as const;
