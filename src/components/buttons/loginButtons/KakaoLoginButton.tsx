"use client";

import Button from "../Button";
import KakaoIcon from "i/oauth/icon_kakao.svg";

export default function KakaoLoginButton() {
  return <Button icon={KakaoIcon} onClick={() => null} className="button-login" text="카카오로 <strong>WIYB</strong> 이용하기" />;
}
