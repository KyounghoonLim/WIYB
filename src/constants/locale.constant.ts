export { LOCALE, localeList };

const LOCALE = {
  KO: "ko",
  EN: "en",
} as const;

const localeList = Object.values(LOCALE);
