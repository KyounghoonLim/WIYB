'use client'

import { ListItemProps } from 'types/components/list/list.interface'
import { Equipment } from 'types/equipment.types'
import { PATH, PATH_PARAMS } from 'constants/path.constant'
import React, { useCallback, useMemo, useRef } from 'react'
import MyLink from 'components/link/MyLink'
import Thumbnail_Primary from 'components/thumbnail/Thumbnail_Primary'
import StarIcon from 'icons/icon_star.svg'
import { numberAddComma } from 'utils/numberUtils'

export default function ListItem_SearchResult_Equipment({
  item: equip,
  index,
  isLast,
  listing,
}: ListItemProps<Equipment>) {
  const listingRef = useRef<HTMLParagraphElement>(null)

  const detailPageUrl = useMemo(
    () =>
      equip?.id
        ? PATH.EQUIPMENT_DETAIL +
          PATH_PARAMS.EQUIPMENT_DETAIL.replace('[id]', equip?.id).replace('[type]', equip?.type)
        : '#',
    [equip]
  )

  const fullSizeRef = useCallback(
    (ele: HTMLElement) => {
      if (!ele || !ele.parentElement) return
      else {
        const gap = 8 * (listing ? 3 : 2)
        const listingSize = listingRef.current?.clientWidth || 0
        const imageSize = 56
        const reviewsSize = 100
        const parentSize = ele.parentElement.clientWidth
        ele.style.width = `${parentSize - listingSize - gap - imageSize - reviewsSize}px`
      }
    },
    [listing]
  )

  return (
    <MyLink href={detailPageUrl} className="list-item h-20" title={equip?.name}>
      {listing && (
        <p
          ref={listingRef}
          className="block min-w-[34px] text-center typograph-24 text-neutral-900 italic font-medium no-auto-size"
        >
          {index + 1 + '.'}
        </p>
      )}
      <Thumbnail_Primary src={equip?.imageUrls?.[0]} width={56} />
      <div ref={fullSizeRef} className="flex flex-col gap-1 auto-size">
        {equip ? (
          <>
            <h3 className="typograph-12 text-text-label-100 truncate">{equip?.brand}</h3>
            <h3 className="typograph-16 font-bold text-black truncate">{equip?.name}</h3>
          </>
        ) : (
          <>
            <div className="h-[14px] skeleton" />
            <div className="h-[14px] skeleton" />
          </>
        )}
      </div>
      {equip && (
        <div className="w-[100px] flex flex-col items-end typograph-14 text-black no-auto-size">
          <span className="flex-row-center gap-1">
            <StarIcon />
            {equip?.score}
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
