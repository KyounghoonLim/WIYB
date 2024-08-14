import { EquipmentDetail } from '@/src/@types/equipment.types'
import Thumbnail from '@/src/components/thumbnail/Thumbnail'
import React from 'react'

export default function Review_InfoSection({ equip }: { equip: EquipmentDetail }) {
  return (
    <section className="w-full h-[88px] flex-row-start gap-[10px] px-4 shrink-0">
      <Thumbnail src={equip?.imageUrls[0]} width={56} />
      <div className="w-full flex flex-col gap-2">
        {equip ? (
          <>
            <h1 className="typograph-20 font-bold">{equip?.name}</h1>
            <span className="flex-row-start typograph-12 text-@-text-label gap-1">
              <p>#{equip?.brand}</p>
              <p>#{equip?.type}</p>
            </span>
          </>
        ) : (
          <>
            <div className="w-full h-4 skeleton" />
            <div className="w-half h-4 skeleton" />
          </>
        )}
      </div>
    </section>
  )
}
