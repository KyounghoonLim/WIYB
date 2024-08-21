'use client'

import { loginApi } from 'services/authApi'
import Button from '../Button_Primary'
import NaverIcon from 'icons/oauth/icon_naver.svg'
import { AUTH_PROVIDER } from 'constants/auth.constant'

export default function NaverLoginButton() {
  return (
    <Button
      icon={NaverIcon}
      onClick={() => loginApi(AUTH_PROVIDER.NAVER)}
      className="button-login font-normal"
      text="네이버로 <strong>WIYB</strong> 이용하기"
    />
  )
}
