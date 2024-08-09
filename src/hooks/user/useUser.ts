'use client'

import React, { useContext, useLayoutEffect } from 'react'
import { useRecoilState } from 'recoil'
import { userState } from '../../stores/userStore'
import { requestTimeContext } from '../../providers/RequestKeyProvider'
import { getUserProfileApi } from '../../services/userApi'
import { useRouter } from 'next/navigation'
import { PATH } from '@/src/constants/path.constant'
import useSWRImmutable from 'swr/immutable'

export default function useUser() {
  const { requestTime } = useContext(requestTimeContext)
  const [user, setUser] = useRecoilState(userState)

  const { replace } = useRouter()

  const { data, error } = useSWRImmutable(
    !user && requestTime,
    () => {
      return getUserProfileApi()
    },
    {
      shouldRetryOnError: false,
    }
  )

  useLayoutEffect(() => {
    if (error) {
      console.log('에러발생!')
      replace(PATH.LOGIN)
    } else if (!data) return
    else setUser(data)
  }, [data, error, replace, setUser])

  return { user, setUser, error }
}
