import { SERVICE_PATH } from 'constants/path.constant'
import myAxios from 'utils/axios/myAxios'

export { uploadImageApi }

function uploadImageApi(formData: FormData): Promise<string> {
  return myAxios
    .post(SERVICE_PATH.UPLOAD_IMAGE, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((res) => {
      console.log(res)
      return res[0]['url']
    })
}
