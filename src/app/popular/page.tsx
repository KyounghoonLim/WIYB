import Form_Search from 'components/form/Form_Search'
import Search_PopularItems from 'components/search/Search_PopularItems'
import { EQUIPMENT_TYPE } from 'constants/equipment.constant'
import PopluarProvider from 'providers/PopluarProvider'
import Popluar_Categories from './(components)/Popluar_Categories'

export default function PopularPage() {
  return (
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
        <section className="w-full flex justify-center items-start gap-3 p-8">popular</section>
      </main>
    </PopluarProvider>
  )
}
