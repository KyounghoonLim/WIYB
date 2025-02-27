import Form_Search from 'components/form/Form_Search'
import Popular_Categories from './(components)/Popular_Categories'
import SearchProvider from 'providers/search/SearchProvider'
import Popular_Equipment_Section from './(components)/Popular_Equipment_Section'
import PopularProvider from 'providers/equipment/PopularProvider'
import Search_PopularKeywords from 'components/search/Search_PopularKeywords'

export default function PopularPage({ params: { equipmentType } }) {
  return (
    <SearchProvider>
      <PopularProvider equipmentType={(equipmentType?.[0] as string)?.toUpperCase()}>
        <section className="w-full h-fit bg-white">
          <article className="CONTENT-CONTAINER justify-start w-full h-[178px] pt-12">
            <Form_Search />
            <Search_PopularKeywords />
          </article>
          <article className="CONTENT-CONTAINER flex-row justify-start items-start w-[800px] h-[65px] p-0">
            <Popular_Categories />
          </article>
        </section>
        <Popular_Equipment_Section />
      </PopularProvider>
    </SearchProvider>
  )
}
