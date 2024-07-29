"use client";

import { loginApi } from "@/src/services/authApi";
import Button from "../Button";
import NaverIcon from "i/oauth/icon_naver.svg";
import { AUTH_PROVIDER } from "@/src/constants/auth.constant";
import { healthApi } from "@/src/services/healthApi";

export default function NaverLoginButton() {
  return (
    <Button
      icon={NaverIcon}
      onClick={healthApi}
      // onClick={() => loginApi(AUTH_PROVIDER.NAVER)}
      className="button-login"
      text="네이버로 <strong>WIYB</strong> 이용하기"
    />
  );
}
