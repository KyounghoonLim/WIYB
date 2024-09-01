'use client'

import { useCallback, useContext, useLayoutEffect, useState } from 'react'
import Button_Primary from '../Button_Primary'
import BookmarkIcon from 'icons/icon_bookmark.svg'
import clsx from 'clsx'
import { equipmentContext } from 'providers/equipment/EquipmentProvider'
import { userContext } from 'providers/UserProvider'
import { bookmarkEquipmentApi } from 'services/equipmentApi'

export default function Button_Equipment_Bookmark() {
  const { userRequiredAction } = useContext(userContext)
  const { equipment } = useContext(equipmentContext)
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false)

  const clickHandler = useCallback(() => {
    if (!equipment) return
    else {
      userRequiredAction(async () => {
        await bookmarkEquipmentApi(equipment.id, isBookmarked)
        setIsBookmarked(!isBookmarked)
      })
    }
  }, [equipment, isBookmarked, userRequiredAction])

  useLayoutEffect(() => {
    if (!equipment) return
    else {
      setIsBookmarked(equipment.isBookmarked)
    }
  }, [equipment])

  return (
    <Button_Primary
      icon={() =>
        BookmarkIcon({ className: clsx(isBookmarked ? 'fill-[#FFD600]' : 'fill-[#C8C8C8]') })
      }
      onClick={clickHandler}
      disabled={!Boolean(equipment)}
      className="w-20 h-14 rounded-xl bg-white hover:bg-[#F5F5F5] disabled:bg-neutral-200"
    />
  )
}
