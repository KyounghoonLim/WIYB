import { AuthProviderType } from "../constants/auth.constant";
import myAxios from "../utils/axios/myAxios";
// import { openPopup } from "../utils/axios/popupUtils";

export { loginApi, logoutApi, tokenRefreshApi };

function loginApi(provider: AuthProviderType) {
  location.replace(process.env.NEXT_PUBLIC_API_HOST + `/oauth2/authorization/${provider}`);
}

function logoutApi() {
  return myAxios.get("/logout");
}

function tokenRefreshApi() {
  return myAxios.patch("/auth/token");
}
