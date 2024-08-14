import React from 'react'
import Island from 'comp/island/Island'
import Thumbnail from '@/src/components/thumbnail/Thumbnail'

export default function Island_EquipImage({ imageUrl }: { imageUrl?: string }) {
  return (
    <Island>
      <div className="w-full h-[192px] flex-row-center">
        <div className="h-full aspect-square relative">
          <Thumbnail src={imageUrl} width={192} />
        </div>
      </div>
    </Island>
  )
}
