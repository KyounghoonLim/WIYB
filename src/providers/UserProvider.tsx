'use client'

import { COOKIE_KEYS } from 'constants/cookie.constant'
import { PATH } from 'constants/path.constant'
import useMyQuery from 'hooks/useMyQuery'
import { usePathname } from 'next/navigation'
import { createContext, Dispatch, SetStateAction, useCallback, useState } from 'react'
import { getUserProfileApi } from 'services/userApi'
import { User } from 'types/user.interface'
import { getCookie, removeCookie, setCookie } from 'utils/cookieUtils'

export const userContext = createContext<{
  user: User
  setUser: Dispatch<SetStateAction<User>>
  userRequiredAction: (cb?: () => any | Promise<any>) => void
}>(null)

export default function UserProvider({ children }) {
  const pathname = usePathname()

  const [user, setUser] = useState<User>(
    (() => {
      const userCookie = getCookie(COOKIE_KEYS.USER)
      return userCookie ? JSON.parse(userCookie) : null
    })()
  )

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

  /// fetch success handler ///
  const successHandler = useCallback((user: User) => {
    setCookie(COOKIE_KEYS.USER, JSON.stringify(user))
    setUser(user)
  }, [])

  /// fetch failure handler ///
  const failHandler = useCallback(() => {
    if (pathname === PATH.SIGN) return
    else {
      removeCookie(COOKIE_KEYS.USER)
      setUser(null)
    }
  }, [pathname])

  useMyQuery(['getUser'], () => getUserProfileApi(), undefined, successHandler, failHandler)

  return (
    <userContext.Provider value={{ user, setUser, userRequiredAction }}>
      {children}
    </userContext.Provider>
  )
}
