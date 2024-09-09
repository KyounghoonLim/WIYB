import { RequestCookies } from 'next/dist/compiled/@edge-runtime/cookies'
import { COOKIE_KEYS } from 'constants/cookie.constant'
import { TOKEN_ROLE } from 'constants/tokenRole.constant'
import { jwtDecode } from 'jwt-decode'
import { PATH, PATH_PARAMS } from 'constants/path.constant'

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

export function getTokenRole(cookie: RequestCookies) {
  const accessToken = cookie.get(COOKIE_KEYS.ACCESS_TOKEN)?.value
  const accDecoded = jwtDecode(accessToken)
  const accRole = accDecoded['role'] || undefined
  return accRole
}

/**
 * dynamic path 가 적용된 path들이 있기 떄문에
 * path 규격을 변환해서 반환
 * @param path string
 * @returns string
 */
export function getMatchedPathname(path: string) {
  const relativePath = Object.values(PATH).reduce((prev, curr) => {
    if (!path.startsWith(curr)) return prev
    else {
      return curr.length > prev.length ? curr : prev
    }
  }, '')

  /// 규격 판단 ///
  switch (relativePath) {
    case PATH.EQUIPMENT_DETAIL: {
      const condition =
        (PATH.EQUIPMENT_DETAIL + PATH_PARAMS.EQUIPMENT_DETAIL).split('/').length ===
        path.split('/').length

      return condition ? PATH.EQUIPMENT_DETAIL : path
    }
    /// param 이 없는 경우도 존재 ///
    case PATH.EQUIPMENT_POPULAR: {
      const sub =
        (PATH.EQUIPMENT_POPULAR + PATH_PARAMS.EQUIPMENT_POPULAR).split('/').length -
        path.split('/').length

      return sub === 0 || sub === 1 ? PATH.EQUIPMENT_POPULAR : path
    }
    /// 게시글로 가는 경우도 존재 ///
    case PATH.COMMUNITY: {
      const sub =
        (PATH.COMMUNITY + PATH_PARAMS.COMMUNITY + PATH_PARAMS.COMMUNITY_POST).split('/').length -
        path.split('/').length
      return sub === 0 || sub === 1 ? PATH.COMMUNITY : path
    }
    /// 나머지 경우 완전히 같은 경우에만 true ///
    default: {
      return path
    }
  }
}
