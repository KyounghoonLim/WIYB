'use client'

import { ListItemProps } from 'types/components/list/list.interface'
import { Equipment } from 'types/equipment.types'
import { PATH } from 'constants/path.constant'
import React, { useMemo } from 'react'
import MyLink from 'components/link/MyLink'
import Thumbnail_Primary from 'components/thumbnail/Thumbnail_Primary'
import StarIcon from 'icons/icon_star.svg'
import clsx from 'clsx'
import { numberAddComma } from 'utils/numberUtils'

export default function ListItem_SearchResult_Equipment({
  item: equip,
  index,
  isLast,
}: ListItemProps<Equipment>) {
  const detailPageUrl = useMemo(
    () =>
      equip?.id
        ? PATH.EQUIPMENT_DETAIL.replace('[id]', equip?.id).replace('[type]', equip?.type)
        : '#',
    [equip]
  )

  return (
    <MyLink href={detailPageUrl} className={clsx('list-item h-20')}>
      <Thumbnail_Primary src={equip?.imageUrls?.[0]} width={56} />
      <div className="w-full flex flex-col gap-1 auto-size">
        {equip ? (
          <>
            <h3 className="max-w-[500px] typograph-12 text-text-label-100 truncate">
              {equip?.brand}
            </h3>
            <h3 className="max-w-[500px] typograph-16 font-bold text-black truncate">
              {equip?.name}
            </h3>
          </>
        ) : (
          <>
            <div className="h-[14px] skeleton" />
            <div className="h-[14px] skeleton" />
          </>
        )}
      </div>
      {equip && (
        <div className="w-[120px] flex flex-col items-end typograph-14 text-black">
          <span className="flex-row-center gap-1">
            <StarIcon />
            {4.5}
          </span>
          <span className="flex-row-center text-nowrap">
            <h3 className="font-bold inline-block">{numberAddComma(equip.reviewCount, 9999)}</h3>
            개의 리뷰
          </span>
        </div>
      )}
    </MyLink>
  )
}
