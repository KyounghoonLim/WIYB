import { GenderType } from "../@types/gender.types";
import myAxios from "../utils/axios/myAxios";

export { setUserProfileApi };

function setUserProfileApi(nickname: string, gender: GenderType, birth: Date | string) {
  return myAxios.post("/user", {
    nickname,
    gender,
    birth,
  });
}
