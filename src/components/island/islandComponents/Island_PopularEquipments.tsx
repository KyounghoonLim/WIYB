'use client'

import Button from '@/src/components/button/Button'
import Island from '@/src/components/island/Island'
import ListItem_Equipment from '@/src/components/list/listItem/ListItem_Equipment'
import usePopularEquipments from '@/src/hooks/equipment/usePopularEquipments'
import React, { useLayoutEffect, useMemo, useReducer } from 'react'
import ListPrimary from '../../list/ListPrimary'

export default function Island_PopularEquipments() {
  const [flag, setFlag] = useReducer((x) => !x, false)
  const { popularEquipments } = usePopularEquipments()
  const listItems = useMemo(() => {
    return popularEquipments?.length ? popularEquipments : Array(5).fill(undefined)
  }, [popularEquipments])

  useLayoutEffect(setFlag, [])

  if (!flag) return <></>
  else
    return (
      <Island>
        <div className="w-full">
          <h3 className="typograph-16">
            지금 가장 많이 보는 장비 <strong className="font-semibold">Top 5</strong>
          </h3>
        </div>
        <ListPrimary
          items={listItems}
          Component={({ item, index }) => ListItem_Equipment({ item, index, listing: true })}
        />
        <Button text="장비 더 보러 가기" className="mt-2" />
      </Island>
    )
}
