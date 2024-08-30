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

async function getUserProfileApi(userId?: string): Promise<User> {
  try {
    const user: User = await myAxios.get(SERVICE_PATH.GET_USER + (userId ? `/${userId}` : ''))
    if (!user.id || !user.nickname || !user.gender || !user.birth) throw new Error()
    else return user
  } catch (err) {
    throw err
  }
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
