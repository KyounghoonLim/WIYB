'use client'

import { equipmentContext } from 'providers/equipment/EquipmentProvider'
import Button_Primary from '../Button_Primary'
import ShareIcon from 'icons/icon_share.svg'
import { useCallback, useContext } from 'react'

export default function Button_Equipment_Share() {
  const { equipment } = useContext(equipmentContext)

  const clickHandler = useCallback(() => {
    if (!navigator.canShare({ url: location.href })) {
      window.alert('웹 공유하기 기능을 제공하지 않는 브라우저입니다.')
    } else {
      try {
        navigator?.share({
          url: location.href,
        })
      } catch (err) {
        console.error(err)
        window.alert('공유하기가 실패했습니다.')
      }
    }
  }, [])

  return (
    <Button_Primary
      icon={() => ShareIcon({})}
      disabled={!Boolean(equipment)}
      className="w-20 h-14 rounded-xl bg-white  hover:bg-[#F5F5F5] disabled:bg-neutral-200"
      onClick={clickHandler}
    />
  )
}
