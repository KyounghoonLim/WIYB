import Form_Search from '@/components/form/Form_Search'
import Logo_Main from '@/components/logo/Logo_Main'
import Search_PopularItems from '@/components/search/Search_PopularItems'
import Island_CommunityPosts from 'components/island/mainPage/Island_CommunityPosts'
import dynamic from 'next/dynamic'
import SearchProvider from 'providers/search/SearchProvider'

const Island_PopularEquipments = dynamic(
  () => import('components/island/mainPage/Island_PopularEquipments')
)

export default function MainPage() {
  return (
    <SearchProvider>
      <main className="PAGE-CONTAINER">
        <section className="w-full h-fit bg-white">
          <article className="CONTENT-CONTAINER w-full h-[174px] flex-col-center">
            <Logo_Main />
          </article>
          <article className="CONTENT-CONTAINER justify-start w-full h-[130px]">
            <Form_Search />
            <Search_PopularItems />
          </article>
        </section>
        <section className="w-full flex-row-center gap-3 pt-8">
          <Island_PopularEquipments />
          <Island_CommunityPosts />
        </section>
      </main>
    </SearchProvider>
  )
}
