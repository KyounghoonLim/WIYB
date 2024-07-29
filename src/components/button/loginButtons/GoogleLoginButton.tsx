"use client";

import { loginApi } from "@/src/services/authApi";
import Button from "../Button";
import GoogleIcon from "i/oauth/icon_google.svg";
import { AUTH_PROVIDER } from "@/src/constants/auth.constant";

export default function GoogleLoginButton() {
  return <Button icon={GoogleIcon} onClick={() => loginApi(AUTH_PROVIDER.GOOGLE)} className="button-login" text="구글로 <strong>WIYB</strong> 이용하기" />;
}
