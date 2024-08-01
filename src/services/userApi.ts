import { GenderType } from "../@types/gender.types";
import myAxios from "../utils/axios/myAxios";

export { setUserProfileApi, getUserProfile, editUserProfile };

function setUserProfileApi(nickname: string, gender: GenderType, birth: Date | string) {
  return myAxios.post("/user", {
    nickname,
    gender,
    birth,
  });
}

function getUserProfile(userId?: string) {
  return myAxios.get("/user/profile" + (userId ? `/${userId}` : ""));
}

function editUserProfile(imageUrl?: string, handy?: number, height?: number, weight?: number) {
  return myAxios.put("/user/profile");
}
