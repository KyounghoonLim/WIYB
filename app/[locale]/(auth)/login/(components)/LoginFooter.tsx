import Portal from "@/src/components/portal/Portal";
import Link from "next/link";
import React from "react";

export default function LoginFooter() {
  return (
    <Portal target="footer">
      <div className="w-full text-center typograph-11 text-@-text-subtitle">
        소셜 로그인을 진행 하시면
        <br />
        <Link className="underline" href={""}>
          이용약관
        </Link>
        과{" "}
        <Link className="underline" href={""}>
          개인정보 처리방침
        </Link>
        에 동의한 것으로 간주됩니다.
      </div>
    </Portal>
  );
}
