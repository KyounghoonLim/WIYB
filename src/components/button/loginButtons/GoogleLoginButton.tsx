'use client'

import { loginApi } from 'services/authApi'
import Button from '../Button_Primary'
import GoogleIcon from 'icons/oauth/icon_google.svg'
import { AUTH_PROVIDER } from 'constants/auth.constant'
import { getStorageItem } from 'utils/storageUtils'
import { STORAGE_KEY, STORAGE_TYPE } from 'constants/storage.constant'

export default function GoogleLoginButton() {
  return (
    <Button
      icon={GoogleIcon}
      onClick={() =>
        loginApi(
          AUTH_PROVIDER.GOOGLE,
          getStorageItem(STORAGE_TYPE.SESSION, STORAGE_KEY.LOGIN.SUCCESS_FALLBACK)
        )
      }
      className="button-login font-normal"
      text="구글로 <strong>WIYB</strong> 이용하기"
    />
  )
}
