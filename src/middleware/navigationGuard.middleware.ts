import { isAuthorized, isRequiredAuth } from "./utils/navigationUtils";
import { MiddlewareModule } from "../@types/middlewareModule.types";
import { PATH } from "../constants/path.constant";

export const navigationGuardMiddleware: MiddlewareModule = async (req) => {
  const { nextUrl } = req;

  /// Authorization 이 필요한 경우 ///
  const authFlag = isAuthorized(req.cookies);

  if (isRequiredAuth(nextUrl)) {
    if (authFlag) {
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
    /// authorization 이 필요 없는데 로그인 된 유저인 경우 메인페이지로 이동 ///
    if (authFlag) {
      return {
        url: {
          path: PATH.MAIN,
          redirect: true,
        },
      };
    } else {
      return {
        /// 바로 이동 ///
        url: {
          path: nextUrl.pathname,
        },
      };
    }
  }
};
