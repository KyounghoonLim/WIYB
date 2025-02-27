'use client'

import { ListItemProps } from 'types/components/list/list.interface'
import { Equipment } from 'types/equipment.types'
import { PATH, PATH_PARAMS } from 'constants/path.constant'
import React, { useMemo } from 'react'
import MyLink from 'components/link/MyLink'
import Thumbnail_Primary from 'components/thumbnail/Thumbnail_Primary'

export default function ListItem_Equipment({
  item: equip,
  index,
  isLast,
  listing,
}: ListItemProps<Equipment>) {
  const detailPageUrl = useMemo(
    () =>
      equip?.id
        ? PATH.EQUIPMENT_DETAIL +
          PATH_PARAMS.EQUIPMENT_DETAIL.replace('[equipmentType]', equip.type).replace(
            '[equipmentId]',
            equip.id
          )
        : '#',
    [equip]
  )

  return (
    <MyLink href={detailPageUrl} className="list-item h-[70.4px]">
      {listing && (
        <span className="w-6 typograph-24 text-neutral-900 italic font-medium">
          {index + 1 + '.'}
        </span>
      )}
      <Thumbnail_Primary src={equip?.imageUrls?.[0]} width={40} />
      <div className="w-full flex flex-col gap-1">
        {equip ? (
          <>
            <h3 className="typograph-12 text-text-label-100">{equip?.brand}</h3>
            <h3 className="typograph-18 font-bold text-black">{equip?.name}</h3>
          </>
        ) : (
          <>
            <div className="h-[14px] skeleton" />
            <div className="h-[14px] skeleton" />
          </>
        )}
      </div>
    </MyLink>
  )
}
