import { tokenRefreshApi } from "@/src/services/authApi";
import { AxiosError } from "axios";
import myAxios from "../myAxios";
import { SERVICE_PATH } from "@/src/constants/path.constant";

export async function onError(err: AxiosError) {
  if (err.response.data["status"] === 401) {
    if (err.config?.url === SERVICE_PATH.TOKEN_REFRESH) {
      throw err;
    } else {
      try {
        await tokenRefreshApi();
        return myAxios(err.config!);
      } catch {
        throw err;
      }
    }
  }
}
