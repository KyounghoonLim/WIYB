import { isAuthorized, isRequiredAuth } from "./utils/navigationUtils";
import { MiddlewareModule } from "../@types/middlewareModule.types";
import { PATH } from "../constants/path.constant";

export const navigationGuardMiddleware: MiddlewareModule = async (req) => {
  const { nextUrl } = req;
  /// Authorization 이 필요한 경우 ///
  if (isRequiredAuth(nextUrl)) {
    if (isAuthorized(req.cookies)) {
      return {
        url: { path: nextUrl.pathname },
      };
    } else {
      console.log("token expired!");
      return {
        /// 로그인 페이지로 리다이렉트 ///
        url: {
          path: PATH.LOGIN,
          redirect: true,
        },
      };
    }
  } else {
    return {
      /// authorization 이 필요 없으면 바로 이동 ///
      url: {
        path: nextUrl.pathname,
      },
    };
  }
};
