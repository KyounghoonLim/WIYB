'use client'

import React, { useContext } from 'react'
import { requestTimeContext } from '../../providers/RequestKeyProvider'
import { getUserProfileApi } from '../../services/userApi'
import { userContext } from '@/src/providers/UserProvider'
import { setCookie } from '@/src/utils/cookieUtils'
import { COOKIE_KEYS } from '@/src/constants/cookie.constant'
import { queryContext } from '@/src/providers/QueryProvider'
import { User } from '@/src/@types/user.interface'
import useMyQuery_Suspense from '../useMyQuery_Suspense'

export default function useUser() {
  const { requestTime } = useContext(requestTimeContext)
  const { defaultErrorHandler } = useContext(queryContext)
  const { user: _user, setUser } = useContext(userContext)

  const { data: user, isPending } = useMyQuery_Suspense<User>(
    [requestTime],
    () => getUserProfileApi(),
    {
      enabled: !Boolean(_user),
    },
    setUser,
    (error) => {
      setCookie(COOKIE_KEYS.REMOVE_SESSION, 'true')
      return defaultErrorHandler(error)
    }
  )

  return { user: _user || user, setUser, isPending }
}
