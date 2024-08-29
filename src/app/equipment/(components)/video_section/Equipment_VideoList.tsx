'use client'

import Island_Equipment_Video from 'components/island/equipmentPage/Island_Equipment_Video'
import { equipmentContext } from 'providers/EquipmentProvider'
import { useContext } from 'react'

export default function Equipment_VideoList() {
  const { equipment } = useContext(equipmentContext)
  return (
    <div className="w-full flex-row-start gap-3 mb-8 overflow-auto hide-scrollbar">
      {equipment.youtubeResults.map((video, idx) => (
        <Island_Equipment_Video key={idx} video={video} />
      ))}
    </div>
  )
}
