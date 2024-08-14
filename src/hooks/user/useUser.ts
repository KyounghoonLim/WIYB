'use client'

import React, { useContext } from 'react'
import { useRecoilState } from 'recoil'
import { userState } from '../../stores/userStore'
import { requestTimeContext } from '../../providers/RequestKeyProvider'
import { getUserProfileApi } from '../../services/userApi'
import useMySWR from '../useMySWR'

export default function useUser() {
  const { requestTime } = useContext(requestTimeContext)
  const [user, setUser] = useRecoilState(userState)

  useMySWR(!user && requestTime, () => getUserProfileApi(), setUser)

  return { user, setUser }
}
