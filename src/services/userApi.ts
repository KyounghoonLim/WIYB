import { GenderType } from "../@types/gender.types";
import { SERVICE_PATH } from "../constants/path.constant";
import myAxios from "../utils/axios/myAxios";

export { setUserProfileApi, getUserProfile, editUserProfile };

function setUserProfileApi(nickname: string, gender: GenderType, birth: Date | string) {
  return myAxios.post(SERVICE_PATH.SET_USER, {
    nickname,
    gender,
    birth,
  });
}

function getUserProfile(userId?: string) {
  return myAxios.get(SERVICE_PATH.GET_USER + (userId ? `/${userId}` : ""));
}

function editUserProfile(imageUrl?: string, handy?: number, height?: number, weight?: number) {
  return myAxios.put(SERVICE_PATH.UPDATE_USER);
}
