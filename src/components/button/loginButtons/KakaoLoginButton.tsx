'use client'

import { loginApi } from 'services/authApi'
import Button from '../Button_Primary'
import KakaoIcon from 'icons/oauth/icon_kakao.svg'
import { AUTH_PROVIDER } from 'constants/auth.constant'
import { getStorageItem } from 'utils/storageUtils'
import { STORAGE_KEY, STORAGE_TYPE } from 'constants/storage.constant'

export default function KakaoLoginButton() {
  return (
    <Button
      icon={KakaoIcon}
      onClick={() =>
        loginApi(
          AUTH_PROVIDER.KAKAO,
          getStorageItem(STORAGE_TYPE.SESSION, STORAGE_KEY.LOGIN.SUCCESS_FALLBACK)
        )
      }
      className="button-login font-normal"
      text="카카오로 <strong>WIYB</strong> 이용하기"
    />
  )
}
