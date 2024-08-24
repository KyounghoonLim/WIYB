'use client'

import Button_Primary from '../Button_Primary'
import ReviewIcon from 'icons/icon_review.svg'
import { useContext } from 'react'
import { equipmentContext } from 'providers/EquipmentProvider'
import clsx from 'clsx'

export default function Button_Equipment_Review({ className }: { className?: string }) {
  const { equipment } = useContext(equipmentContext)
  return (
    <Button_Primary
      icon={() => ReviewIcon({ className: 'fill-white' })}
      text="평가 점수/리뷰 작성하기"
      disabled={!Boolean(equipment)}
      className={clsx('w-full rounded-xl', className)}
    />
  )
}
