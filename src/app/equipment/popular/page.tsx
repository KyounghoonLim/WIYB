import Form_Search from 'components/form/Form_Search'
import Search_PopularItems from 'components/search/Search_PopularItems'
import PopluarProvider from 'providers/equipment/PopluarProvider'
import Popluar_Categories from './(components)/Popluar_Categories'
import SearchProvider from 'providers/search/SearchProvider'
import Popular_Equipment_Section from './(components)/Popular_Equipment_Section'

export default function PopularPage() {
  return (
    <SearchProvider>
      <PopluarProvider>
        <main className="PAGE-CONTAINER">
          <section className="w-full h-fit bg-white">
            <article className="CONTENT-CONTAINER justify-start w-full h-[178px] pt-12">
              <Form_Search />
              <Search_PopularItems />
            </article>
            <article className="CONTENT-CONTAINER flex-row-start w-[800px] h-[65px] p-0">
              <Popluar_Categories />
            </article>
          </section>
          <section className="w-full flex justify-center items-start gap-3 p-8">
            <Popular_Equipment_Section />
          </section>
        </main>
      </PopluarProvider>
    </SearchProvider>
  )
}
