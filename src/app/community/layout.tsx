import Form_Search from 'components/form/Form_Search'
import Search_PopularItems from 'components/search/Search_PopularItems'
import CommunityProvider from 'providers/community/CommunityProvider'
import Community_Categories from './(components)/Community_Categories'
import SearchProvider from 'providers/search/SearchProvider'
import Community_Post_Section from './(components)/Community_Post_Section'

export default function CommunityLayout({ children }) {
  return (
    <SearchProvider>
      <CommunityProvider>
        <main className="PAGE-CONTAINER pb-12">
          <section className="w-full h-fit bg-white">
            <article className="CONTENT-CONTAINER justify-start w-full h-[178px] pt-12">
              <Form_Search />
              <Search_PopularItems />
            </article>
            <article className="CONTENT-CONTAINER flex-row justify-start items-start w-[800px] h-[65px] p-0">
              <Community_Categories />
            </article>
          </section>
          {children}
        </main>
      </CommunityProvider>
    </SearchProvider>
  )
}
