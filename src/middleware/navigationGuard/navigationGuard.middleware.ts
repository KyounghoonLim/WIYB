import { COOKIE_KEYS } from 'constants/cookie.constant'
import { getIsAuthorized, getMatchedPathname } from './navigationGuard.util'
import { AUTHORITY_PATH, PATH } from 'constants/path.constant'
import { NextResponse } from 'next/server'

export function navigationGuard(req) {
  const { nextUrl } = req
  /**
   * authority 검증
   * 여기에서 검증 하는 요소는 회원가입이 된 유저인지 판단함
   * (즉, 토큰이 없거나 GUEST 인 경우 false)
   */
  const isAuthorized = getIsAuthorized(req.cookies)

  const { pathname } = nextUrl
  const matchedPathname = getMatchedPathname(pathname)

  return NextResponse.next()

  if (isAuthorized) {
    //@ts-ignore
    const isAllowed = [...AUTHORITY_PATH.ALL, ...AUTHORITY_PATH.USER].includes(matchedPathname)
    if (isAllowed) return NextResponse.next()
    else {
      nextUrl.pathname = PATH.MAIN
      return NextResponse.redirect(nextUrl)
    }
  } else {
    //@ts-ignore
    const isAllowed = (() => {
      switch (matchedPathname) {
        /**
         * 회원가입 페이지로 요청이 왔을 때 엑세스 토큰이 없으면 로그인 페이지로 보냄
         * 앞서 authority 검증이 되었으므로, 여기에서 토큰이 있으면 GUEST 임
         * */
        case PATH.SIGN: {
          if (req.cookies.get(COOKIE_KEYS.ACCESS_TOKEN)) return true
          else return false
        }
        default:
          //@ts-ignore
          return [...AUTHORITY_PATH.ALL, ...AUTHORITY_PATH.GUEST].includes(matchedPathname)
      }
    })()

    if (isAllowed) {
      return NextResponse.next()
    } else {
      nextUrl.pathname = PATH.LOGIN
      return NextResponse.redirect(nextUrl)
    }
  }
}
