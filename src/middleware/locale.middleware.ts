import { getSupportedLocale, isPathnameHasLocale } from "./utils/localeUtils";
import { MiddlewareModule } from "../@types/middlewareModule.types";

export const localeMiddleware: MiddlewareModule = (req, res) => {
  const { url, cookie } = res;
  /// 앞선 모듈에서 받은 응답 url 에 locale 정보가 있는지 판단, 추가 ///
  if (isPathnameHasLocale(url.path)) return res;
  else {
    const locale = getSupportedLocale(req);
    return {
      url: {
        path: `/${locale}${url.path}`,
        redirect: true,
      },
      cookie,
    };
  }
};
