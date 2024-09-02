import Form_Search from 'components/form/Form_Search'
import Logo_Main from 'components/logo/Logo_Main'
import Search_Filters from 'components/search/Search_Filters'
import SearchProvider from 'providers/search/SearchProvider'
import List_SearchResult_Scroll from 'components/list/searchPage/List_SearchResult_Scroll'
import List_SearchResult_Pagination from 'components/list/searchPage/List_SearchResult_Pagination'

export default function SearchPage({
  searchParams: { keyword, sort, filters, page },
}: {
  searchParams: { keyword?: string; sort?: string; filters?: string; page?: number }
}) {
  return (
    <SearchProvider>
      <main className="PAGE-CONTAINER">
        <section className="w-full h-fit bg-white">
          <article className="CONTENT-CONTAINER w-full h-[174px] flex-col-center">
            <Logo_Main />
          </article>
          <article className="CONTENT-CONTAINER justify-start w-full h-[198px] bg-white">
            <Form_Search />
            <h1 className="typograph-32 font-bold my-auto">{`"${keyword}"`}</h1>
          </article>
        </section>
        <section className="w-full flex justify-center items-start gap-3 p-8">
          <Search_Filters />
          {/* <List_SearchResult_Scroll /> */}
          <List_SearchResult_Pagination />
        </section>
      </main>
    </SearchProvider>
  )
}
