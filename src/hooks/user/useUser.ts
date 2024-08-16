'use client'

import React, { useContext } from 'react'
import { requestTimeContext } from '../../providers/RequestKeyProvider'
import { getUserProfileApi } from '../../services/userApi'
import useMySWR from '../useMySWR'
import { userContext } from '@/src/providers/UserProvider'

export default function useUser() {
  const { requestTime } = useContext(requestTimeContext)
  const { user, setUser } = useContext(userContext)

  useMySWR(!user && requestTime, () => getUserProfileApi(), setUser, console.log)

  return { user, setUser }
}
