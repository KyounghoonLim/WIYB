import Form_Search from 'components/form/Form_Search'
import Search_PopularItems from 'components/search/Search_PopularItems'
import CommunityProvider from 'providers/community/CommunityProvider'
import Community_Categories from './(components)/Community_Categories'
import SearchProvider from 'providers/search/SearchProvider'

export default function CommunityPage() {
  return (
    <SearchProvider>
      <CommunityProvider>
        <main className="PAGE-CONTAINER">
          <section className="w-full h-fit bg-white">
            <article className="CONTENT-CONTAINER justify-start w-full h-[178px] pt-12">
              <Form_Search />
              <Search_PopularItems />
            </article>
            <article className="CONTENT-CONTAINER flex-row justify-start items-start w-[800px] h-[65px] p-0">
              <Community_Categories />
            </article>
          </section>
          <section>1234</section>
        </main>
      </CommunityProvider>
    </SearchProvider>
  )
}
