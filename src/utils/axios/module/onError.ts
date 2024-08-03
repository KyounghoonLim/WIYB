import { tokenRefreshApi } from "@/src/services/authApi";
import { AxiosError } from "axios";
import myAxios from "../myAxios";
import { SERVICE_PATH } from "@/src/constants/path.constant";

export async function onError(err: AxiosError) {
  console.log(err);
  if (err.response.data["status"] === 401) {
    console.log("err", err.config?.url, err.config.url === SERVICE_PATH.TOKEN_REFRESH);
    if (err.config?.url === SERVICE_PATH.TOKEN_REFRESH) {
      console.warn("뭐냐?");
      throw err;
    } else {
      try {
        await tokenRefreshApi();
        return myAxios(err.config!);
      } catch {
        console.warn("여기 안걸림??");
        throw err;
      }
    }
  }
}
