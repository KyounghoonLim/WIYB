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
    </main>
  )
}
