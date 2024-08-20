import { GenderType } from 'types/gender.types'
import { User } from 'types/user.interface'
import { SERVICE_PATH } from 'constants/path.constant'
import myAxios from 'utils/axios/myAxios'

export { setUserProfileApi, getUserProfileApi, editUserProfileApi }

function setUserProfileApi(nickname: string, gender: GenderType, birth: Date | string) {
  return myAxios.post(SERVICE_PATH.SET_USER, {
    nickname,
    gender,
    birth,
  })
}

function getUserProfileApi(userId?: string): Promise<User> {
  return myAxios.get(SERVICE_PATH.GET_USER + (userId ? `/${userId}` : ''))
}

function editUserProfileApi(
  imageUrl?: string,
  nickname?: string,
  handy?: number,
  height?: number,
  weight?: number
): Promise<User> {
  return myAxios.put(SERVICE_PATH.UPDATE_USER, {
    imageUrl,
    nickname,
    handy,
    height,
    weight,
  })
}
