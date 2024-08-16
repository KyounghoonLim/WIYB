'use client'

import Button from '@/src/components/button/Button'
import Island from '@/src/components/island/Island'
import ListItem_Equipment from '@/src/components/list/listItem/ListItem_Equipment'
import React from 'react'
import ListPrimary from '../../list/ListPrimary'
import { getPopularEquipmentApi } from '@/src/services/equipmentApi'
import useMyQuery from '@/src/hooks/useMyQuery'

export default function Island_PopularEquipments() {
  const { data: popularEquipments } = useMyQuery(['popularEquipments'], getPopularEquipmentApi, {
    initialData: Array(5).fill(undefined),
  })

  return (
    <>
      {popularEquipments && (
        <Island>
          <div className="w-full">
            <h3 className="typograph-16">
              지금 가장 많이 보는 장비 <strong className="font-semibold">Top 5</strong>
            </h3>
          </div>
          <ListPrimary
            items={popularEquipments}
            Component={({ item, index }) => ListItem_Equipment({ item, index, listing: true })}
          />
          <Button text="장비 더 보러 가기" className="mt-2" />
        </Island>
      )}
    </>
  )
}
