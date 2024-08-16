import Button from '@/src/components/button/Button'
import MyLink from '@/src/components/link/MyLink'
import { PATH } from '@/src/constants/path.constant'
import Search_Container from './(components)/Search_Container'

export default function SearchPage({
  searchParams: { keyword, sort, engine, filters },
}: {
  searchParams: { keyword?: string; sort?: string; engine?: string; filters?: string }
}) {
  return (
    <main className="SEARCH-CONTAINER">
      <Search_Container {...{ keyword, sort, engine, filters }} />
      {/* {search ? (
      ) : (
        <div className="w-full h-full flex-col-center gap-10">
          <h2 className="typograph-24 font-bold">잘못된 접근입니다.</h2>
          <MyLink href={PATH.MAIN}>
            <Button text="메인으로 돌아가기" />
          </MyLink>
        </div>
      )} */}
    </main>
  )
}
