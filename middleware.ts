import { NextResponse, type NextRequest } from 'next/server'
import { localeMiddleware } from './src/middleware/locale.middleware'
import { navigationGuardMiddleware } from './src/middleware/navigationGuard.middleware'
import { COOKIE_KEYS } from './src/constants/cookie.constant'
import { PATH } from './src/constants/path.constant'

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const { nextUrl } = request

  if (nextUrl.pathname === '/') {
    nextUrl.pathname = PATH.MAIN
    return NextResponse.redirect(nextUrl)
  } else {
    /// 사용자의 요청에 대해 갈 수 있는지 판단 ///
    const result_1 = await navigationGuardMiddleware(request)
    /// 앞선 모듈들의 결과에서 locale 을 추가 ///
    const { url, cookies } = await localeMiddleware(request, result_1)
    /// 최종 응답 처리 ///
    nextUrl.pathname = url.path
    nextUrl.search = url.search

    const response = url.redirect ? NextResponse.redirect(nextUrl) : NextResponse.next()

    if (cookies) {
      cookies.forEach(({ key, value, options }) => {
        response.cookies.set(key, value, options)
      })
    }
    response.cookies.set(COOKIE_KEYS.REQUEST_TIME, String(Date.now()))

    return response
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/((?!images|_next).*)'],
}
