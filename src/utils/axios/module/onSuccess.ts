import { AxiosResponse } from 'axios'

export function onSuccess(res: AxiosResponse): AxiosResponse['data'] {
  /// 요청 완료 핸들러 ///
  return res.data
}
