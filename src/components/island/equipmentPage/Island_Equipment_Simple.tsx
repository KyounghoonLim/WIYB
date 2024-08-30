'use client'

import { equipmentContext } from 'providers/EquipmentProvider'
import { useContext } from 'react'
import Island from '../Island'
import Thumbnail_Primary from 'components/thumbnail/Thumbnail_Primary'
import StarIcon from 'icons/icon_star.svg'
import { numberAddComma } from 'utils/numberUtils'
import clsx from 'clsx'

export default function Island_Equipment_Simple() {
  const { equipment } = useContext(equipmentContext)
  return (
    <Island className="w-[596px] h-[192px] px-0 py-4 flex-row-start rounded-xl">
      <Thumbnail_Primary
        src={equipment?.imageUrls[0]}
        width={160}
        className={clsx(!Boolean(equipment?.imageUrls[0]) && 'ml-4')}
      />
      <div className="w-full h-[142px] flex flex-col justify-between px-4">
        <div className="w-full flex flex-col gap-1 typograph-14 text-text-label-100">
          {equipment ? (
            <>
              <p>{equipment.brand}</p>
              <div className="w-[388px]">
                <h1
                  className="typograph-24 font-bold text-black truncate-line"
                  title={equipment.name}
                >
                  {equipment.name}
                </h1>
              </div>
              <p>{equipment.type}</p>
            </>
          ) : (
            <>
              <div className="h-4 skeleton" />
              <div className="h-4 my-1 skeleton" />
              <div className="h-4 skeleton" />
            </>
          )}
        </div>
        <div className="w-full flex flex-col gap-2 typograph-16 text-black">
          {equipment ? (
            <>
              <span className="w-full flex-row-start gap-1 font-bold">
                <StarIcon />
                {equipment.score || 0}
              </span>
              <span className="w-full flex-row-start text-nowrap text-text-label-100">
                <h3 className="font-bold inline-block text-black">
                  {numberAddComma(equipment?.reviewCount, 9999)}
                </h3>
                개의 리뷰
              </span>
            </>
          ) : (
            <>
              <div className="w-half h-4 skeleton" />
              <div className="w-half h-4 skeleton" />
            </>
          )}
        </div>
      </div>
    </Island>
  )
}
