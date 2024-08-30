import { RequestCookies } from 'next/dist/compiled/@edge-runtime/cookies'
import { COOKIE_KEYS } from 'constants/cookie.constant'
import { TOKEN_ROLE } from 'constants/tokenRole.constant'
import { jwtDecode } from 'jwt-decode'

export function getIsAuthorized(cookie: RequestCookies) {
  const accessToken = cookie.get(COOKIE_KEYS.ACCESS_TOKEN)?.value
  const refreshToken = cookie.get(COOKIE_KEYS.REFRESH_TOKEN)?.value

  if (!accessToken || !refreshToken) return false
  else {
    const accDecoded = jwtDecode(accessToken)
    const refDecoded = jwtDecode(refreshToken)

    const accRole = accDecoded['role'] || undefined
    const accSid = accDecoded['sid'] || 0
    const refSid = refDecoded['sid'] || 1
    const accExp = accDecoded.exp || 0
    const refExp = refDecoded.exp || 0

    const currTimeStamp = Date.now() / 1000

    if (accSid !== refSid) return false
    else if (refExp <= currTimeStamp) return false
    else if (accRole === TOKEN_ROLE.GUEST) return false
    else return true
  }
}
