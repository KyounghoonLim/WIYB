"use client";

import Button from "../Button";
import GoogleIcon from "i/oauth/icon_google.svg";

export default function GoogleLoginButton() {
  return <Button icon={GoogleIcon} onClick={() => null} className="button-login" text="구글로 <strong>WIYB</strong> 이용하기" />;
}
