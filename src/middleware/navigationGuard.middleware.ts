import { isAuthorized, isRequiredAuth } from './utils/navigationUtils'
import { MiddlewareModule } from '../@types/middlewareModule.types'
import { PATH } from '../constants/path.constant'
import { COOKIE_KEYS } from '../constants/cookie.constant'

export const navigationGuardMiddleware: MiddlewareModule = async (req) => {
  const { nextUrl } = req

  console.log(nextUrl)
  console.log(isRequiredAuth(nextUrl))
  /// Authorization 이 필요한 경우 ///
  const authFlag = isAuthorized(req.cookies)
  if (isRequiredAuth(nextUrl)) {
    if (authFlag) {
      return {
        url: { path: nextUrl.pathname, search: nextUrl.search },
      }
    } else {
      const expires = new Date(Date.now())
      return {
        /// 로그인 페이지로 리다이렉트 ///
        url: {
          path: PATH.LOGIN,
          search: '',
          redirect: true,
        },
        cookies: [
          {
            key: COOKIE_KEYS.ACCESS_TOKEN,
            value: '',
            options: {
              expires,
            },
          },
          {
            key: COOKIE_KEYS.REFRESH_TOKEN,
            value: '',
            options: {
              expires,
            },
          },
        ],
      }
    }
  } else {
    /// authorization 이 필요 없는데 로그인 된 유저인 경우 메인페이지로 이동 ///
    if (authFlag) {
      return {
        url: {
          path: PATH.MAIN,
          search: '',
          redirect: true,
        },
      }
    } else {
      return {
        /// 바로 이동 ///
        url: {
          path: nextUrl.pathname,
          search: nextUrl.search,
        },
      }
    }
  }
}
