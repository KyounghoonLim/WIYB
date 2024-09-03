'use client'

import { COOKIE_KEYS } from 'constants/cookie.constant'
import { AUTHORITY_PATH, PATH } from 'constants/path.constant'
import useMyQuery from 'hooks/useMyQuery'
import { usePathname } from 'next/navigation'
import { createContext, Dispatch, SetStateAction, useCallback, useMemo, useState } from 'react'
import { logoutApi } from 'services/authApi'
import { getUserProfileApi } from 'services/userApi'
import { User } from 'types/user.interface'
import { getCookie, removeCookie, setCookie } from 'utils/cookieUtils'

export const userContext = createContext<{
  user: User
  setUser: Dispatch<SetStateAction<User>>
  userRequiredAction: (cb?: () => any | Promise<any>) => void
  manualLogout: () => Promise<void>
}>(null)

export default function UserProvider({ children }) {
  const pathname = usePathname()

  const [user, setUser] = useState<User>(null)

  const userFetchEnabled = useMemo(() => {
    //@ts-ignore
    return !AUTHORITY_PATH.GUEST.includes(pathname)
  }, [pathname])

  const userRequiredAction = useCallback(
    (cb?: () => any | Promise<any>) => {
      if (user) {
        cb?.()
      } else if (window.confirm('로그인이 필요합니다.\n로그인 페이지로 이동하시겠습니까?')) {
        location.href = PATH.LOGIN
      }
    },
    [user]
  )

  const manualLogout = useCallback(async () => {
    if (window.confirm('로그아웃 하시겠습니까?')) {
      try {
        await logoutApi()
      } catch {
        removeCookie(COOKIE_KEYS.ACCESS_TOKEN)
        removeCookie(COOKIE_KEYS.REFRESH_TOKEN)
      } finally {
        setUser(null)
      }
    }
  }, [])

  /// fetch success handler ///
  const successHandler = useCallback((user: User) => {
    setUser(user)
  }, [])

  /// fetch failure handler ///
  const failHandler = useCallback(() => {
    if (pathname === PATH.SIGN) return
    else {
      setUser(null)
    }
  }, [pathname])

  useMyQuery(
    ['getUser'],
    () => getUserProfileApi(),
    { enabled: userFetchEnabled },
    successHandler,
    failHandler
  )

  return (
    <userContext.Provider value={{ user, setUser, userRequiredAction, manualLogout }}>
      {children}
    </userContext.Provider>
  )
}
