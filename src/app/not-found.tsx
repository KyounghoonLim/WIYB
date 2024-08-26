import MyLink from 'components/link/MyLink'
import { PATH } from 'constants/path.constant'

export default function NotFoundPage() {
  return (
    <main className="PAGE-CONTAINER">
      <div className="w-full h-screen flex-col-center gap-6">
        <p className="typograph-20 text-text-label-000">존재하지 않는 페이지입니다.</p>
        <MyLink className="hover:text-neutral-800 p-4" href={PATH.MAIN}>
          메인으로 돌아가기
        </MyLink>
      </div>
    </main>
  )
}
