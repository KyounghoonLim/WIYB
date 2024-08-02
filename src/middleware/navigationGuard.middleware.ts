import { isRequiredAuth } from "./utils/navigationUtils";
import { MiddlewareModule } from "../@types/middlewareModule.types";
import { COOKIE_KEYS } from "../constants/cookie.constant";
import { PATH } from "../constants/path.constant";
import { _validateUser } from "./services/_validateUser";

export const navigationGuardMiddleware: MiddlewareModule = async (req) => {
  const { nextUrl } = req;
  /// Authorization 이 필요한 경우 ///
  if (isRequiredAuth(nextUrl)) {
    try {
      const user = await _validateUser(req);
      console.log(user, "1234");
      return {
        /// 요청이 들어온 패스로 이동 ///
        url: {
          path: nextUrl.pathname,
        },
        /// 유저 데이터를 쿠키로 반환 ///
        cookie: {
          key: COOKIE_KEYS.USER,
          value: JSON.stringify(user),
        },
      };
    } catch {
      console.log("error!");
      return {
        /// 로그인 페이지로 리다이렉트 ///
        url: {
          path: PATH.LOGIN,
          redirect: true,
        },
        /// 클라이언트에 있을 수 있는 유저에 대한 정보 쿠키 삭제 ///
        cookie: {
          key: COOKIE_KEYS.USER,
          value: "",
          options: {
            maxAge: 0,
          },
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
