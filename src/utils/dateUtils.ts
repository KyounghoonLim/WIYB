import { LOCALE } from "c/locale.constant";
import { DATE_FORMAT, DateFormatType } from "c/date.constant";
import { LocaleType } from "t/locale.types";

export { isSameTime, timeReset, isPreviousMonth, dateToString, getDateFormat, stringToDate, getDateBefore, getDateAfter };

function isSameTime(target_1: Date | string, target_2: Date | string, strict: boolean = false) {
  target_1 = typeof target_1 === "string" ? new Date(target_1) : target_1;
  target_2 = typeof target_2 === "string" ? new Date(target_2) : target_2;

  for (const method of ["getFullYear", "getMonth", "getDate", "getHours", "getMinutes", strict ? "getSeconds" : undefined]) {
    if (!method) break;
    else if (target_1[method]() !== target_2[method]()) return false;
  }
  return true;
}

function timeReset(date: Date) {
  date.setHours(0, 0, 0, 0);
  return date;
}

function isPreviousMonth(target_1: Date, target_2: Date) {
  const y = target_1.getFullYear();
  const Y = target_2.getFullYear();
  const m = target_1.getMonth();
  const M = target_2.getMonth();
  if (y !== Y) return y < Y;
  else return m < M;
}

function dateToString(date: Date, locale?: string, isUTC?: boolean) {
  if (!date) return "";
  else {
    let Y: number | string, M: number | string, D: number | string;
    if (!isUTC) {
      Y = date.getFullYear();
      M = date.getMonth() + 1;
      D = date.getDate();

      if (Y < 1000) {
        Y = "0" + Y;
      }
      if (M < 10) {
        M = "0" + M;
      }
      if (D < 10) {
        D = "0" + D;
      }
    } else {
      const defaultFormat = date?.toISOString().split("T")[0].split("-");
      (Y = defaultFormat[0]), (M = defaultFormat[1]), (D = defaultFormat[2]);
    }

    switch (locale) {
      case "en-US":
        return M + "." + D + "." + Y;
      default:
        return Y + "." + M + "." + D;
    }
  }
}

function getDateFormat(locale: LocaleType): DateFormatType {
  if (locale === LOCALE.KO) return DATE_FORMAT.KO;
  else return DATE_FORMAT.EN;
}

function stringToDate(string: string) {
  const date = new Date(string);
  return date instanceof Date && !isNaN(date.getTime()) ? date : null;
}

function getDateBefore(date: Date, millisecondsBefore: number = 60 * 1000) {
  const ts = date.getTime();
  return new Date(ts - millisecondsBefore);
}

function getDateAfter(date: Date, millisecondsAfter: number = 60 * 1000) {
  const ts = date.getTime();
  return new Date(ts + millisecondsAfter);
}
