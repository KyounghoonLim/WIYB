import { AxiosError } from 'axios'
import myAxios from '../myAxios'
import { SERVICE_PATH } from '@/src/constants/path.constant'
import { TokenRefresher } from './tokenRefresher'

const tokenRefrehser = new TokenRefresher()

export async function onError(err: AxiosError) {
  if (err.response.data['status'] !== 401) {
    throw err
  } else {
    if (err.config?.url === SERVICE_PATH.TOKEN_REFRESH) {
      throw err
    } else {
      try {
        return await tokenRefrehser.queueing(() => myAxios(err.config))
      } catch {
        throw err
      }
    }
  }
}
