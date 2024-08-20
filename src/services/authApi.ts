import { AuthProviderType } from '../constants/auth.constant'
import { SERVICE_PATH } from '../constants/path.constant'
import myAxios from '../utils/axios/myAxios'

export { loginApi, logoutApi, tokenRefreshApi, tokenValidation }

function loginApi(provider: AuthProviderType) {
  location.replace(process.env.NEXT_PUBLIC_API_HOST + `${SERVICE_PATH.LOGIN}/${provider}`)
}

function logoutApi() {
  return myAxios.get(SERVICE_PATH.LOGOUT)
}

function tokenRefreshApi() {
  return myAxios.patch(SERVICE_PATH.TOKEN_REFRESH)
}

function tokenValidation() {
  return myAxios.get(SERVICE_PATH.TOKEN_VALIDATION)
}
