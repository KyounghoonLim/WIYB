'use client'

import { useContext, useState } from 'react'
import Button_Primary from '../Button_Primary'
import BookmarkIcon from 'icons/icon_bookmark.svg'
import clsx from 'clsx'
import { equipmentContext } from 'providers/EquipmentProvider'

export default function Button_Equipment_Bookmark() {
  const { equipment } = useContext(equipmentContext)
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false)

  return (
    <Button_Primary
      icon={() =>
        BookmarkIcon({ className: clsx(isBookmarked ? 'fill-[#FFD600]' : 'fill-neutral-300') })
      }
      onClick={() => setIsBookmarked(!isBookmarked)}
      disabled={!Boolean(equipment)}
      className="w-20 h-14 rounded-xl bg-white hover:bg-[#F0F0F0] disabled:bg-neutral-200"
    />
  )
}
