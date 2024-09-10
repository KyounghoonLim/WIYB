'use client'

import List_Primary from '@/components/list/List_Primary'
import Island from '../Island'
import ListItem_Equipment from '@/components/list/listItems/ListItem_Equipment'
import { getPopularEquipment_Top5_Api } from 'services/equipmentApi'
import useMyQuery from 'hooks/useMyQuery'
import Button_SeeMore from 'components/button/Button_SeeMore'
import { PATH } from 'constants/path.constant'

export default function Island_PopularEquipments() {
  const { data: popularEquipments, error } = useMyQuery(
    ['popularEquipments'],
    () => getPopularEquipment_Top5_Api(),
    {
      initialData: Array(5).fill(undefined),
    }
  )

  return (
    <>
      {popularEquipments && !error && (
        <Island className="w-[434px] h-[424px] py-0">
          <section className="w-full h-16 flex justify-between items-center">
            <span>
              가장 인기있는 {}
              <h3 className="typograph-16 inline-block font-bold">장비 Top 5</h3>
            </span>
            <Button_SeeMore href={PATH.EQUIPMENT_POPULAR} />
          </section>
          <section>
            <List_Primary
              items={popularEquipments.slice(0, 5)}
              Component={({ item, index, isLast }) =>
                ListItem_Equipment({ item, index, isLast, listing: true })
              }
            />
          </section>
        </Island>
      )}
    </>
  )
}
