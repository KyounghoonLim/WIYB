"use client";

import Button from "../Button";
import NaverIcon from "i/oauth/icon_naver.svg";

export default function NaverLoginButton() {
  return <Button icon={NaverIcon} onClick={() => null} className="button-login" text="네이버로 <strong>WIYB</strong> 이용하기" />;
}
