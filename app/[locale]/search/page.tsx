import Search_Container from './(components)/Search_Container'
import Link from 'next/link'
import Button from '@/src/components/button/Button'
import { PATH } from '@/src/constants/path.constant'

export default function SearchPage({
  searchParams: { search, filter, sort },
}: {
  searchParams: { search?: string; filter?: string; sort?: string }
}) {
  return (
    <main className="SEARCH-CONTAINER">
      {search ? (
        <Search_Container search={search} />
      ) : (
        <div className="w-full h-full flex-col-center gap-10">
          <h2 className="typograph-24 font-bold">잘못된 접근입니다.</h2>
          <Link href={PATH.MAIN}>
            <Button text="메인으로 돌아가기" />
          </Link>
        </div>
      )}
    </main>
  )
}
