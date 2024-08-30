import { getIsAuthorized } from './navigationGuard.util'
import { AUTORITY_PATH, PATH } from 'constants/path.constant'
import { NextResponse } from 'next/server'

export function navigationGuard(req) {
  const { nextUrl } = req
  const isAuthorized = getIsAuthorized(req.cookies)

  const { pathname } = nextUrl
  if (isAuthorized) {
    //@ts-ignore
    const isAllowed = [...AUTORITY_PATH.ALL, ...AUTORITY_PATH.USER].includes(pathname)
    if (isAllowed) return NextResponse.next()
    else {
      nextUrl.pathname = PATH.MAIN
      return NextResponse.redirect(nextUrl)
    }
  } else {
    //@ts-ignore
    const isAllowed = [...AUTORITY_PATH.ALL, ...AUTORITY_PATH.GUEST].includes(pathname)

    if (isAllowed) return NextResponse.next()
    else {
      nextUrl.pathname = PATH.LOGIN
      return NextResponse.redirect(nextUrl)
    }
  }
}
