import MyLink from 'components/link/MyLink'
import { PATH } from 'constants/path.constant'

export default function LoginFailurePage() {
  return (
    <main className="PAGE-CONTAINER">
      <div className="w-full h-screen flex-col-center gap-6">
        <p className="typograph-20 text-text-label-000">로그인에 실패했습니다.</p>
        <MyLink className="hover:text-neutral-800 p-4" href={PATH.LOGIN}>
          로그인으로 돌아가기
        </MyLink>
      </div>
    </main>
  )
}
