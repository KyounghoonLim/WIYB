'use client'

import { loginApi } from 'services/authApi'
import Button from '../Button_Primary'
import NaverIcon from 'icons/oauth/icon_naver.svg'
import { AUTH_PROVIDER } from 'constants/auth.constant'
import { getStorageItem } from 'utils/storageUtils'
import { STORAGE_KEY, STORAGE_TYPE } from 'constants/storage.constant'

export default function NaverLoginButton() {
  return (
    <Button
      icon={NaverIcon}
      onClick={() =>
        loginApi(
          AUTH_PROVIDER.NAVER,
          getStorageItem(STORAGE_TYPE.SESSION, STORAGE_KEY.LOGIN.SUCCESS_FALLBACK)
        )
      }
      className="button-login font-normal"
      text="네이버로 <strong>WIYB</strong> 이용하기"
    />
  )
}
