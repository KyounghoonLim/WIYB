'use client'

import { loginApi } from '@/src/services/authApi'
import Button from '../Button_Primary'
import KakaoIcon from 'i/oauth/icon_kakao.svg'
import { AUTH_PROVIDER } from '@/src/constants/auth.constant'

export default function KakaoLoginButton() {
  return (
    <Button
      icon={KakaoIcon}
      onClick={() => loginApi(AUTH_PROVIDER.KAKAO)}
      className="button-login font-normal"
      text="카카오로 <strong>WIYB</strong> 이용하기"
    />
  )
}
