'use client'

import { equipmentContext } from 'providers/equipment/EquipmentProvider'
import Button_Primary from '../Button_Primary'
import ShareIcon from 'icons/icon_share.svg'
import { useContext } from 'react'

export default function Button_Equipment_Share() {
  const { equipment } = useContext(equipmentContext)
  return (
    <Button_Primary
      icon={() => ShareIcon({})}
      disabled={!Boolean(equipment)}
      className="w-20 h-14 rounded-xl bg-white  hover:bg-[#F5F5F5] disabled:bg-neutral-200"
    />
  )
}
