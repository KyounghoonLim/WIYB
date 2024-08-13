'use client'

import React, { useContext } from 'react'
import { useRecoilState } from 'recoil'
import { userState } from '../../stores/userStore'
import { requestTimeContext } from '../../providers/RequestKeyProvider'
import { getUserProfileApi } from '../../services/userApi'
import { useRouter } from 'next/navigation'
import { PATH } from '@/src/constants/path.constant'
import useMySWR from '../useMySWR'

export default function useUser() {
  const { requestTime } = useContext(requestTimeContext)
  const [user, setUser] = useRecoilState(userState)

  const { replace } = useRouter()

  useMySWR(
    !user && requestTime,
    () => getUserProfileApi(),
    setUser,
    () => replace(PATH.LOGIN)
  )

  return { user, setUser }
}
