import { EquipmentDetail } from '@/src/@types/equipment.types'
import Island from '@/src/components/island/Island'
import React from 'react'

export default function Island_EquipSpec({ equip }: { equip: EquipmentDetail }) {
  return (
    <Island>
      <div className="flex flex-col gap-6">
        <h3 className="typograph-16 font-bold">스펙 옵션</h3>
        <div className="flex flex-col typograph-15 gap-2">
          {equip ? (
            <>
              <span className="flex gap-[6px] flex-nowrap text-nowrap">
                로프트각
                <p className="font-semibold truncate">{equip?.detail?.headLoftDegree}</p>
              </span>
              <span className="flex gap-[6px] flex-nowrap text-nowrap">
                색상
                <p className="font-semibold truncate">{equip?.detail?.color}</p>
              </span>
              <span className="flex gap-[6px] flex-nowrap text-nowrap">
                체적
                <p className="font-semibold truncate">{equip?.detail?.driverVolume}</p>
              </span>
              <span className="flex gap-[6px] flex-nowrap text-nowrap">
                출시연도
                <p className="font-semibold truncate">{equip?.releasedYear}</p>
              </span>
            </>
          ) : (
            <>
              <div className="h-[15px] skeleton" />
              <div className="h-[15px] skeleton w-half" />
              <div className="h-[15px] skeleton" />
              <div className="h-[15px] skeleton w-half" />
              <div className="h-[15px] skeleton" />
              <div className="h-[15px] skeleton w-half" />
            </>
          )}
        </div>
      </div>
    </Island>
  )
}
