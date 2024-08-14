'use client'

import { ListItemProps } from '@/src/@types/components/list/list.interface'
import React, { useMemo } from 'react'
import Thumbnail from '../../thumbnail/Thumbnail'
import Bedge from '../../bedge/Bedge'
import { Equipment } from '@/src/@types/equipment.types'
import { PATH } from '@/src/constants/path.constant'
import Link from 'next/link'

export default function ListItem_Equipment({
  item: equip,
  index,
  listing,
}: ListItemProps<Equipment>) {
  const detailPageUrl = useMemo(
    () =>
      equip?.id
        ? PATH.EQUIPMENT_DETAIL.replace('[id]', equip?.id).replace('[type]', equip?.type)
        : '#',
    [equip]
  )

  return (
    <Link href={detailPageUrl} className="list-item">
      {equip && listing && <span className="typograph-16 text-neutral-900">{index + 1 + '.'}</span>}
      <Thumbnail src={equip?.imageUrls?.[0]} width={40} />
      <div className="w-full flex flex-col gap-1">
        {equip ? (
          <>
            <h3 className="typograph-14 font-semibold">{equip?.name}</h3>
            <div className="flex gap-1">
              <Bedge text={equip?.brand} className="bedge-sm" />
              <Bedge text={equip?.type} className="bedge-sm" />
              <Bedge text={`리뷰 ${equip?.reviewCount}`} className="bedge-sm" />
            </div>
          </>
        ) : (
          <>
            <div className="h-[15px] my-[2px] skeleton" />
            <div className="h-[15px] my-[2px] skeleton" />
          </>
        )}
      </div>
    </Link>
  )
}
