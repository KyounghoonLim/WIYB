import { PATH } from "@/src/constants/path.constant";
import Link from "next/link";

export default function LoginFailurePage() {
  return (
    <div className="CONTENT-CONTAINER flex-col-center gap-10">
      <h1 className="typograph-24 font-bold">로그인에 실패했습니다.</h1>
      <Link href={PATH.LOGIN} className="typograph-14 text-@-text-comment underline">
        로그인 페이지로 돌아가기
      </Link>
    </div>
  );
}
