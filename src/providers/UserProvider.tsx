'use client'

import { COOKIE_KEYS } from 'constants/cookie.constant'
import { AUTHORITY_PATH, PATH } from 'constants/path.constant'
import { STORAGE_KEY, STORAGE_TYPE } from 'constants/storage.constant'
import useMyQuery from 'hooks/useMyQuery'
import { usePathname } from 'next/navigation'
import {
  createContext,
  Dispatch,
  SetStateAction,
  useCallback,
  useLayoutEffect,
  useMemo,
  useState,
} from 'react'
import { logoutApi } from 'services/authApi'
import { getUserProfileApi } from 'services/userApi'
import { User } from 'types/user.types'
import { removeCookie } from 'utils/cookieUtils'
import { getStorageItem, removeStorageItem, setStorageItem } from 'utils/storageUtils'

export const userContext = createContext<{
  user: User
  setUser: Dispatch<SetStateAction<User>>
  userRequiredAction: (cb?: () => any | Promise<any>, pathname?: string) => Promise<any>
  manualLogout: () => Promise<void>
}>(null)

export default function UserProvider({ children }) {
  const pathname = usePathname()

  const [user, setUser] = useState<User>(null)

  const userFetchEnabled = useMemo(() => {
    //@ts-ignore
    return !AUTHORITY_PATH.GUEST.includes(pathname)
  }, [pathname])

  /// fetch success handler ///
  const successHandler = useCallback(async (user: User) => {
    setUser(user)
    removeStorageItem(STORAGE_TYPE.SESSION, STORAGE_KEY.LOGIN.SUCCESS_FALLBACK)
    setStorageItem(STORAGE_TYPE.SESSION, STORAGE_KEY.USER, btoa(JSON.stringify(user)))
  }, [])

  /// fetch failure handler ///
  const failHandler = useCallback(() => {
    if (pathname === PATH.SIGN) return
    else {
      setUser(null)
      removeStorageItem(STORAGE_TYPE.SESSION, STORAGE_KEY.USER)
    }
  }, [pathname])

  /**
   * 캐싱된 유저 데이터가 있어도, 변조의 위험이 있으므로 항상 새로 로드시 갱신함
   */
  const { isLoading } = useMyQuery(
    ['getUser'],
    () => getUserProfileApi(),
    { enabled: userFetchEnabled },
    successHandler,
    failHandler
  )

  const userRequiredAction = useCallback(
    async (cb?: () => any | Promise<any>, pathname: string = location.pathname): Promise<any> => {
      if (isLoading) return
      else if (user) {
        return await cb?.()
      } else if (window.confirm('로그인이 필요합니다.\n로그인 페이지로 이동하시겠습니까?')) {
        setStorageItem(STORAGE_TYPE.SESSION, STORAGE_KEY.LOGIN.SUCCESS_FALLBACK, pathname)
        location.href = PATH.LOGIN
      }
    },
    [user, isLoading]
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

  /**
   * 캐싱된 유저 데이터 싱크
   */
  useLayoutEffect(() => {
    const cachedUser = getStorageItem(STORAGE_TYPE.SESSION, STORAGE_KEY.USER)
    const user = JSON.parse(atob(cachedUser || btoa('{}'))) as User
    if (!user.id || !user.nickname || !user.birth || !user.gender) return
    else {
      setUser(user)
    }
  }, [])

  return (
    <userContext.Provider value={{ user, setUser, userRequiredAction, manualLogout }}>
      {children}
    </userContext.Provider>
  )
}
