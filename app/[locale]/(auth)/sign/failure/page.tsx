import MyLink from '@/src/components/link/MyLink'
import { PATH } from '@/src/constants/path.constant'

export default function LoginFailurePage() {
  return (
    <div className="CONTENT-CONTAINER flex-col-center gap-10">
      <h1 className="typograph-24 font-bold">로그인에 실패했습니다.</h1>
      <MyLink href={PATH.LOGIN} className="typograph-14 text-@-text-comment underline">
        로그인 페이지로 돌아가기
      </MyLink>
    </div>
  )
}
